#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, rm, stat, writeFile, copyFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import process from "node:process";

const INSTALLER_VERSION = "1.0.0";
const MANIFEST_VERSION = 1;
const DEFAULT_TARGET = path.join(homedir(), ".config", "opencode");
const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SOURCE_MANIFEST_PATH = path.join(REPO_ROOT, "install", "manifest.json");
const TEMPLATE_ROOT = path.join(REPO_ROOT, "install", "templates", "opencode");
const AGENT_TEMPLATE_PATH = path.join(TEMPLATE_ROOT, "agents", "sdr-agents.json");
const SKILLS_ROOT = path.join(REPO_ROOT, "skills");
const OWNED_PREFIXES = ["commands/sdr-", "prompts/sdr/", "skills/sdr-", "skills/_shared/", "skills/agents/"];
const OWNED_FILES = new Set(["skills/SDR-QUICKSTART.md", "skills/SDR-AGENTS-README.md"]);

function parseArgs(argv) {
  const args = { dryRun: false, yes: false, check: false, uninstall: false, force: false, target: DEFAULT_TARGET };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--yes") args.yes = true;
    else if (arg === "--check") args.check = true;
    else if (arg === "--uninstall") args.uninstall = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--target") args.target = path.resolve(expandHome(argv[++i] ?? ""));
    else if (arg.startsWith("--target=")) args.target = path.resolve(expandHome(arg.slice("--target=".length)));
    else if (arg === "--help" || arg === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!args.yes && !args.check && !args.uninstall) args.dryRun = true;
  if ([args.check, args.uninstall].filter(Boolean).length > 1) throw new Error("Use only one operation: --check or --uninstall.");
  return args;
}

function expandHome(value) {
  if (!value) return value;
  return value === "~" ? homedir() : value.startsWith("~/") ? path.join(homedir(), value.slice(2)) : value;
}

function usage() {
  return `Usage: node scripts/install-opencode-sdr.mjs [--dry-run] [--yes] [--check] [--uninstall] [--force] [--target DIR]\n\nDefault mode is --dry-run. Use --yes to apply install/update.`;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function equalJson(a, b) {
  return stableStringify(a) === stableStringify(b);
}

async function readJson(file, fallback = undefined) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT" && fallback !== undefined) return fallback;
    throw new Error(`Invalid or unreadable JSON at ${file}: ${error.message}`);
  }
}

async function fileHash(file) {
  return sha256(await readFile(file));
}

async function exists(file) {
  try { await stat(file); return true; } catch (error) { if (error.code === "ENOENT") return false; throw error; }
}

async function walk(dir) {
  const output = [];
  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) output.push(absolute);
    }
  }
  await visit(dir);
  return output.sort();
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function isOwnedRelative(relativePath) {
  return OWNED_FILES.has(relativePath) || OWNED_PREFIXES.some((prefix) => relativePath.startsWith(prefix));
}

async function buildDesiredFiles(target) {
  const desired = [];
  const commandFiles = await walk(path.join(TEMPLATE_ROOT, "commands"));
  const promptFiles = await walk(path.join(TEMPLATE_ROOT, "prompts"));
  for (const source of [...commandFiles, ...promptFiles]) {
    const relative = toPosix(path.relative(TEMPLATE_ROOT, source));
    const bytes = await readFile(source);
    desired.push({ source, relative, absolute: path.join(target, relative), bytes, kind: relative.startsWith("commands/") ? "command" : "prompt" });
  }
  const skillFiles = await walk(SKILLS_ROOT);
  for (const source of skillFiles) {
    const relative = toPosix(path.join("skills", path.relative(SKILLS_ROOT, source)));
    if (!isOwnedRelative(relative)) continue;
    const bytes = await readFile(source);
    desired.push({ source, relative, absolute: path.join(target, relative), bytes, kind: relative.startsWith("skills/_shared/") ? "shared-skill-contract" : "skill" });
  }
  return desired.map((entry) => ({ ...entry, sha256: sha256(entry.bytes) })).sort((a, b) => a.relative.localeCompare(b.relative));
}

async function buildTemplateHashes() {
  const files = [SOURCE_MANIFEST_PATH, AGENT_TEMPLATE_PATH, ...(await walk(path.join(TEMPLATE_ROOT, "commands"))), ...(await walk(path.join(TEMPLATE_ROOT, "prompts")))];
  const hashes = {};
  for (const file of files.sort()) hashes[toPosix(path.relative(REPO_ROOT, file))] = await fileHash(file);
  return hashes;
}

async function loadAgents() {
  const agents = await readJson(AGENT_TEMPLATE_PATH);
  for (const [key, value] of Object.entries(agents)) {
    if (!key.startsWith("sdr-")) throw new Error(`Agent key must be sdr-owned: ${key}`);
    if (!value.prompt?.includes(`prompts/sdr/${key}.md`)) throw new Error(`Agent ${key} prompt must reference prompts/sdr/${key}.md`);
  }
  return agents;
}

function createEmptyReport(operation, target) {
  return { operation, target, status: "pending", creates: [], updates: [], skips: [], collisions: [], backups: [], manifest: [], checks: [], next: [] };
}

function manifestPath(target) { return path.join(target, ".sdr-manifest.json"); }
function configPath(target) { return path.join(target, "opencode.json"); }

async function loadManifest(target) {
  return readJson(manifestPath(target), null);
}

function manifestOwnsPath(manifest, relativePath) {
  return Boolean(manifest?.files?.some((file) => file.path === relativePath));
}

function manifestOwnsConfigKey(manifest, key) {
  return Boolean(manifest?.configKeys?.includes(key));
}

async function planInstall(args) {
  const report = createEmptyReport(args.dryRun ? "dry-run" : "install", args.target);
  const manifest = await loadManifest(args.target);
  const desiredFiles = await buildDesiredFiles(args.target);
  const desiredAgents = await loadAgents();
  const currentConfig = await readJson(configPath(args.target), {});
  if (currentConfig !== null && (typeof currentConfig !== "object" || Array.isArray(currentConfig))) throw new Error("opencode.json must be a JSON object.");

  for (const file of desiredFiles) {
    const currentExists = await exists(file.absolute);
    if (!currentExists) report.creates.push(file.relative);
    else {
      const currentHash = await fileHash(file.absolute);
      if (currentHash === file.sha256) report.skips.push(file.relative);
      else if (manifestOwnsPath(manifest, file.relative) || args.force) {
        report.updates.push(file.relative);
        report.backups.push(file.relative);
      } else {
        report.collisions.push(`${file.relative} exists and is not manifest-owned; rerun with --force only if it is safe to replace.`);
      }
    }
  }

  const currentAgents = currentConfig.agent ?? {};
  if (typeof currentAgents !== "object" || Array.isArray(currentAgents)) throw new Error("opencode.json field `agent` must be an object when present.");
  for (const [key, desired] of Object.entries(desiredAgents)) {
    const configKey = `agent.${key}`;
    if (!(key in currentAgents)) report.creates.push(configKey);
    else if (equalJson(currentAgents[key], desired)) report.skips.push(configKey);
    else if (manifestOwnsConfigKey(manifest, configKey) || args.force) {
      report.updates.push(configKey);
      report.backups.push("opencode.json");
    } else {
      report.collisions.push(`${configKey} exists with different content; rerun with --force only if it is SDR-owned.`);
    }
  }
  report.manifest.push(manifest ? "update .sdr-manifest.json" : "create .sdr-manifest.json");
  report.next.push(report.collisions.length ? "Resolve collisions or rerun with --force after reviewing ownership." : args.dryRun ? "Run with --yes to apply." : "Run --check to validate installation.");
  report.status = report.collisions.length ? "blocked" : "planned";
  return { report, desiredFiles, desiredAgents, currentConfig };
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

async function backupFile(target, absolute, backups, stamp) {
  if (!(await exists(absolute))) return null;
  const relative = toPosix(path.relative(target, absolute));
  const backup = path.join(target, ".sdr-backups", stamp, relative);
  await mkdir(path.dirname(backup), { recursive: true });
  await copyFile(absolute, backup);
  backups.push({ original: absolute, backup });
  return backup;
}

async function writeAtomic(file, bytes) {
  await mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(temp, bytes);
  await rename(temp, file);
}

async function applyInstall(args, plan) {
  if (plan.report.collisions.length) return plan.report;
  const stamp = timestamp();
  const backups = [];
  try {
    for (const file of plan.desiredFiles) {
      const currentExists = await exists(file.absolute);
      const currentHash = currentExists ? await fileHash(file.absolute) : null;
      if (currentHash === file.sha256) continue;
      if (currentExists) await backupFile(args.target, file.absolute, backups, stamp);
      await writeAtomic(file.absolute, file.bytes);
    }

    const configFile = configPath(args.target);
    const nextConfig = { ...plan.currentConfig, agent: { ...(plan.currentConfig.agent ?? {}) } };
    for (const [key, agent] of Object.entries(plan.desiredAgents)) nextConfig.agent[key] = agent;
    if (!equalJson(plan.currentConfig, nextConfig)) {
      await backupFile(args.target, configFile, backups, stamp);
      await writeAtomic(configFile, `${JSON.stringify(nextConfig, null, 2)}\n`);
      await readJson(configFile);
    }

    const installedFiles = [];
    for (const file of plan.desiredFiles) installedFiles.push({ path: file.relative, kind: file.kind, sha256: await fileHash(file.absolute) });
    const manifest = {
      version: INSTALLER_VERSION,
      manifestVersion: MANIFEST_VERSION,
      installedAt: new Date().toISOString(),
      sourceRepo: REPO_ROOT,
      files: installedFiles,
      configKeys: Object.keys(plan.desiredAgents).sort().map((key) => `agent.${key}`),
      templateHashes: await buildTemplateHashes()
    };
    await writeAtomic(manifestPath(args.target), `${JSON.stringify(manifest, null, 2)}\n`);
    await checkInstall(args, false);
    plan.report.status = "success";
    plan.report.backups = backups.map((entry) => toPosix(path.relative(args.target, entry.backup)));
    return plan.report;
  } catch (error) {
    for (const entry of backups.reverse()) {
      try { await mkdir(path.dirname(entry.original), { recursive: true }); await copyFile(entry.backup, entry.original); } catch { /* report below */ }
    }
    plan.report.status = "failed";
    plan.report.next.push(`Rollback attempted from .sdr-backups/${stamp}. If needed, restore files manually from that directory.`);
    plan.report.collisions.push(`Post-write failure: ${error.message}`);
    process.exitCode = 1;
    return plan.report;
  }
}

async function checkInstall(args, collectReport = true) {
  const report = createEmptyReport("check", args.target);
  const manifest = await loadManifest(args.target);
  if (!manifest) report.checks.push("FAIL missing .sdr-manifest.json");
  const desiredFiles = await buildDesiredFiles(args.target);
  const desiredAgents = await loadAgents();
  let config;
  try { config = await readJson(configPath(args.target), {}); report.checks.push("PASS opencode.json valid JSON"); }
  catch (error) { report.checks.push(`FAIL ${error.message}`); config = {}; }

  for (const file of desiredFiles) {
    if (!(await exists(file.absolute))) report.checks.push(`FAIL missing ${file.relative}`);
    else {
      const currentHash = await fileHash(file.absolute);
      if (currentHash === file.sha256) report.checks.push(`PASS ${file.relative}`);
      else report.checks.push(`FAIL hash drift ${file.relative}`);
    }
    if (manifest && !manifestOwnsPath(manifest, file.relative)) report.checks.push(`FAIL manifest missing ${file.relative}`);
  }
  for (const [key, desired] of Object.entries(desiredAgents)) {
    const current = config.agent?.[key];
    if (!current) report.checks.push(`FAIL missing agent.${key}`);
    else if (equalJson(current, desired)) report.checks.push(`PASS agent.${key}`);
    else report.checks.push(`FAIL drift agent.${key}`);
    if (manifest && !manifestOwnsConfigKey(manifest, `agent.${key}`)) report.checks.push(`FAIL manifest missing agent.${key}`);
  }
  const failed = report.checks.some((line) => line.startsWith("FAIL"));
  report.status = failed ? "failed" : "success";
  report.next.push(failed ? "Re-run install with --yes, or inspect drift before using --force." : "Installation is valid.");
  if (failed && collectReport) process.exitCode = 1;
  return report;
}

async function planUninstall(args) {
  const report = createEmptyReport("uninstall", args.target);
  const manifest = await loadManifest(args.target);
  if (!manifest) {
    report.status = "blocked";
    report.collisions.push("Missing .sdr-manifest.json; refusing uninstall because ownership is unknown.");
    report.next.push("Install first or remove SDR artifacts manually after review.");
    return { report, manifest: null };
  }
  for (const file of manifest.files ?? []) {
    const absolute = path.join(args.target, file.path);
    if (!(await exists(absolute))) report.skips.push(file.path);
    else {
      const currentHash = await fileHash(absolute);
      if (currentHash === file.sha256 || args.force) report.updates.push(`remove ${file.path}`);
      else report.collisions.push(`${file.path} changed since install; rerun --uninstall --force to remove.`);
    }
  }
  for (const key of manifest.configKeys ?? []) report.updates.push(`remove ${key}`);
  report.updates.push("remove .sdr-manifest.json");
  report.next.push(report.collisions.length ? "Review changed files or rerun uninstall with --force." : "Run --check to confirm SDR is removed if needed.");
  report.status = report.collisions.length ? "blocked" : "planned";
  return { report, manifest };
}

async function applyUninstall(args, plan) {
  if (plan.report.collisions.length || !plan.manifest) return plan.report;
  const stamp = timestamp();
  const backups = [];
  const configFile = configPath(args.target);
  try {
    const config = await readJson(configFile, {});
    const nextConfig = { ...config, agent: { ...(config.agent ?? {}) } };
    for (const key of plan.manifest.configKeys ?? []) {
      const [, agentKey] = key.split(".");
      if (agentKey) delete nextConfig.agent[agentKey];
    }
    if (!equalJson(config, nextConfig)) {
      await backupFile(args.target, configFile, backups, stamp);
      await writeAtomic(configFile, `${JSON.stringify(nextConfig, null, 2)}\n`);
    }
    for (const file of plan.manifest.files ?? []) {
      const absolute = path.join(args.target, file.path);
      if (await exists(absolute)) await rm(absolute);
    }
    await rm(manifestPath(args.target), { force: true });
    plan.report.status = "success";
    plan.report.backups = backups.map((entry) => toPosix(path.relative(args.target, entry.backup)));
    return plan.report;
  } catch (error) {
    plan.report.status = "failed";
    plan.report.collisions.push(`Uninstall failure: ${error.message}`);
    plan.report.next.push(`Restore config from .sdr-backups/${stamp} if needed.`);
    process.exitCode = 1;
    return plan.report;
  }
}

function printReport(report) {
  const lines = [];
  lines.push(`status: ${report.status}`);
  lines.push(`operation: ${report.operation}`);
  lines.push(`target: ${report.target}`);
  for (const section of ["creates", "updates", "skips", "collisions", "backups", "manifest", "checks", "next"]) {
    lines.push(`${section}:`);
    const values = report[section] ?? [];
    if (!values.length) lines.push("  - none");
    else for (const value of [...new Set(values)]) lines.push(`  - ${value}`);
  }
  console.log(lines.join("\n"));
}

async function main() {
  let args;
  try { args = parseArgs(process.argv.slice(2)); }
  catch (error) { console.error(error.message); console.error(usage()); process.exit(2); }
  if (args.help) { console.log(usage()); return; }
  if (!existsSync(SOURCE_MANIFEST_PATH)) throw new Error(`Missing installer source manifest: ${SOURCE_MANIFEST_PATH}`);
  let report;
  if (args.check) report = await checkInstall(args);
  else if (args.uninstall) {
    const plan = await planUninstall(args);
    report = args.yes ? await applyUninstall(args, plan) : plan.report;
  } else {
    const plan = await planInstall(args);
    report = args.yes ? await applyInstall(args, plan) : plan.report;
  }
  printReport(report);
  if (["blocked", "failed"].includes(report.status) && process.exitCode === undefined) process.exitCode = 1;
}

main().catch((error) => { console.error(`status: failed\nerror: ${error.message}`); process.exit(1); });
