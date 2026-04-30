---
title: OpenCode SDR Installation
description: Install, validate, update, and uninstall Spec-Driven Research commands and agents for OpenCode.
---

# OpenCode SDR Installation

This repository ships a dependency-free Node installer for the OpenCode SDR integration.

## Install safely

Preview first. The default mode is dry-run and does not modify files:

```bash
node scripts/install-opencode-sdr.mjs
```

Apply the planned install:

```bash
node scripts/install-opencode-sdr.mjs --yes
```

Validate the installed state:

```bash
node scripts/install-opencode-sdr.mjs --check
```

## What gets installed

- OpenCode commands: `/sdr-new`, `/sdr-continue`, `/sdr-ff`
- Prompt redirectors under `prompts/sdr/`
- SDR skills/shared contracts under `skills/`
- SDR agent entries merged into `opencode.json`
- Ownership manifest at `.sdr-manifest.json`

The installer never replaces `opencode.json` wholesale. It parses JSON and only adds, updates, or removes SDR-owned `agent.sdr-*` entries. Existing SDD agents, MCP servers, permissions, providers, plugins, and user settings are preserved.

## Target override

By default, the target is `~/.config/opencode`. For fixture validation or alternate OpenCode configs:

```bash
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture --yes
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture --check
```

## Update and drift behavior

Re-run the installer after pulling repository changes:

```bash
node scripts/install-opencode-sdr.mjs --yes
```

If installed files still match the manifest, the run is effectively a no-op. If template hashes changed, only SDR-owned artifacts are updated. Unknown collisions stop the install unless you explicitly use `--force` after reviewing ownership.

## Force semantics

Use `--force` only when you have confirmed the target collision is SDR-owned and safe to replace:

```bash
node scripts/install-opencode-sdr.mjs --yes --force
```

Force does not grant permission to rewrite unrelated OpenCode configuration. It only allows replacement of declared SDR paths and `agent.sdr-*` entries.

## Backups and rollback

Before replacing existing SDR-owned files or changing `opencode.json`, the installer writes timestamped backups under:

```text
~/.config/opencode/.sdr-backups/{yyyyMMdd-HHmmss}/
```

If post-write validation fails, the installer attempts to restore from the latest backup and prints exact rollback guidance.

Manual rollback:

1. Copy the backed-up `opencode.json` from `.sdr-backups/{timestamp}/opencode.json` over the current target config.
2. Remove files listed in `.sdr-manifest.json` if they still exist.
3. Run `node scripts/install-opencode-sdr.mjs --check` to confirm the integration is no longer valid/active.

## Uninstall

Uninstall uses the manifest to remove only SDR-owned files and SDR-owned agent keys:

```bash
node scripts/install-opencode-sdr.mjs --uninstall --yes
```

If a manifest-owned file changed since install, uninstall stops. Review the file, then remove it with:

```bash
node scripts/install-opencode-sdr.mjs --uninstall --yes --force
```

## Manual fixture checks

This repository has no test runner. Use structural/manual validation:

```bash
node --check scripts/install-opencode-sdr.mjs
rm -rf /tmp/opencode-sdr-fixture
mkdir -p /tmp/opencode-sdr-fixture
printf '{"agent":{"sdd-existing":{"description":"keep me"}},"mcp":{"demo":{}},"permission":{"bash":"ask"}}\n' > /tmp/opencode-sdr-fixture/opencode.json
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture --yes
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture --check
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture --yes
node scripts/install-opencode-sdr.mjs --target /tmp/opencode-sdr-fixture --uninstall --yes
```

Expected result: dry-run makes no writes, install succeeds, check passes, rerun skips matching artifacts, uninstall removes SDR-owned artifacts while preserving unrelated config.
