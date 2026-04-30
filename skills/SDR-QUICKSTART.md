# SDR Quickstart Guide

Get from idea to validated research in minutes with the Spec-Driven Research (SDR) framework.

---

## What is SDR?

SDR is a structured pipeline for running multi-agent research. Instead of one generic chat, you delegate to specialized agents — Market Intelligence, Competitive Analysis, Technical Viability, and more — each producing standardized outputs that feed into the next phase.

Think of it as CI/CD for founder research: **init → explore → proposal → spec → design → tasks → verify → source-of-truth → sdd-propose**, with a decision gate after every phase.

---

## Your First Run (60 seconds)

### 1. Initialize your research project

```
/sdr-new {project-name}
```

Example:
```
/sdr-new ai-contract-review
```

What happens:
- The orchestrator starts a session
- Launches **sdr-init** for founder intake and constraints
- Then launches **sdr-explore** to investigate the product category and market shape
- Then launches **sdr-propose** to define the build direction
- Stops and asks you: **GO**, **ADJUST**, or **NO-GO**?

### 2. Choose execution mode

On first run, the orchestrator asks:

> **Automatic** — runs phases back-to-back, stops only on issues  
> **Interactive** — pauses after each phase for your approval

Choose **Interactive** for new domains. Choose **Automatic** for fast-forwarding known territory.

### 3. Resume later

```
/sdr-continue ai-contract-review
```

The orchestrator reads `sdr/ai-contract-review/state` from Engram and picks up exactly where you left off.

### 4. Fast-forward the entire pipeline

```
/sdr-ff ai-contract-review
```

Runs the full SDR chain sequentially. Stops automatically if any phase returns `ADJUST` or `NO-GO`.

---

## The 3 Meta-Commands

| Command | Purpose | Stops For | Best For |
|---------|---------|-----------|----------|
| `/sdr-new <name>` | Start fresh; runs init + explore + proposal | Interactive mode asks GO/ADJUST/NO-GO | New ideas, unknown domains |
| `/sdr-continue [name]` | Resume from last completed phase | Nothing; seamless continuation | Multi-session research |
| `/sdr-ff <name>` | Run full pipeline: init → explore → proposal → spec → design → tasks → verify → source-of-truth | ADJUST, NO-GO, errors | Well-understood domains, CI-like runs |

> **Pro tip:** You can switch from Interactive to Automatic mid-project, but the orchestrator will ask you to confirm.

---

## What Happens in Each Phase

```
init ──→ explore ──→ proposal ──→ spec ──→ design ──→ tasks ──→ verify ──→ source-of-truth ──→ sdd-propose
```

| Phase | What the agent does | What you get | Typical Duration |
|-------|---------------------|--------------|------------------|
| **init** | Captures founder idea, constraints, success definition | Founder intake + project charter | 1 min |
| **explore** | Scans product category, market shape, competitors, user signals | Research landscape + gap analysis | 1-2 min |
| **proposal** | Defines product direction, scope, risks, founder fit | Product proposal with risk assessment | 1-2 min |
| **spec** | Writes structured requirements and success criteria | Spec sheet with acceptance criteria | 1-2 min |
| **design** | Produces technical architecture and, for UI products, a professional UI/UX DESIGN.md contract | Technical `design.md` with architecture, stack, risks, and UI handoff when applicable | 1-2 min |
| **tasks** | Breaks product requirements into implementation-ready vertical slices | Coding task list with dependencies and tests | 1 min |
| **verify** | Cross-checks consistency, validates assumptions | Verification report + final verdict | 1-2 min |
| **source-of-truth** | Consolidates verified SDR artifacts for SDD | Coding-ready Source of Truth | 1 min |

Each phase saves artifacts to Engram. Nothing is lost.

---

## Expected Outputs & Where to Find Them

### Engram Topic Keys (deterministic)

Init is saved as `sdr-init/{project}`. Later SDR phase artifacts are saved under `sdr/{project-name}/{phase}`:

| Phase | Topic Key | Example |
|-------|-----------|---------|
| explore | `sdr/{project}/explore` | `sdr/ai-contract-review/explore` |
| init | `sdr-init/{project}` | `sdr-init/ai-contract-review` |
| proposal | `sdr/{project}/proposal` | `sdr/ai-contract-review/proposal` |
| spec | `sdr/{project}/spec` | `sdr/ai-contract-review/spec` |
| design | `sdr/{project}/design` | `sdr/ai-contract-review/design` |
| tasks | `sdr/{project}/tasks` | `sdr/ai-contract-review/tasks` |
| verify report | `sdr/{project}/verify-report` | `sdr/ai-contract-review/verify-report` |
| source of truth | `sdr/{project}/source-of-truth` | `sdr/ai-contract-review/source-of-truth` |
| state | `sdr/{project}/state` | `sdr/ai-contract-review/state` |
| config | `sdr/{project}/config` | `sdr/ai-contract-review/config` |

### How to retrieve your research

```bash
# Find the state artifact
mem_search(query: "sdr/ai-contract-review/state")

# Get full content
mem_get_observation(id: {state_id})

# List all artifacts for a project
mem_search(query: "sdr/ai-contract-review")
```

### Artifact Store Modes

| Mode | Saves To | Best For |
|------|----------|----------|
| `engram` (default) | Engram memory only | Quick research, ephemeral projects |
| `openspec` | Files in `openspec/sdr/{project}/` | Team review, audit trail |
| `hybrid` | Both Engram + filesystem | Production research, compliance |
| `none` | Inline only, no persistence | One-off questions |

---

## Decision Gates Explained Simply

After every phase, the orchestrator evaluates the agent's output and presents one of three verdicts:

### GO — Proceed to next phase

The research is solid. The orchestrator:
- Updates `sdr/{project}/state` with `last_decision: GO`
- Launches the next phase automatically (Automatic mode)
- Or asks you to confirm (Interactive mode)

### ADJUST — Refine before continuing

Something is missing or unclear. The orchestrator:
- Updates state with `last_decision: ADJUST`
- Tells you **what** is missing (e.g., "validate user cohort definitions")
- Re-launches the target phase with feedback injected
- You can also provide your own feedback

### NO-GO — Archive the project

The research shows this should not proceed. The orchestrator:
- Updates state with `last_decision: NO-GO`
- Saves a **closure artifact** to `sdr/{project}/closure`
- Captures learnings so you don't lose the work
- Notifies you with the reason

> **A NO-GO is not a failure.** It is a successful research outcome that prevents you from building the wrong thing.

---

## Example: Complete Research Cycle for a Startup Idea

### Scenario

You want to build **AI-powered contract review for mid-market legal teams**.

### Step-by-step

**1. Start the project**
```
/sdr-new ai-contract-review
```

**2. Explore phase completes**
> Key findings: Legal tech TAM ~$4B, AI adoption in legal is early (innovators stage), mid-market underserved vs. enterprise.  
> Decision gate: **GO**

**3. Proposal phase completes**
> Product direction defined: mid-market legal teams need fast contract-risk triage; beachhead scope focuses on clause extraction, risk summaries, and review workflow fit.  
> Decision gate: **GO**

**4. Spec phase completes**
> Coding-ready requirements: upload contracts, extract clauses, classify risk, show reviewer action states, and expose measurable acceptance criteria for accuracy, latency, and auditability.  
> Decision gate: **GO**

**5. Design phase completes**
> Technical design: conceptual services for ingestion, extraction, risk scoring, reviewer workflow, storage, and observability; UI contract defines review states, accessibility, and visual hierarchy if the product has a frontend; required PoC validates LLM clause extraction accuracy.
> Decision gate: **GO**

**6. Tasks phase completes**
> Coding task breakdown: implementation-ready vertical slices with dependencies and test expectations, scoped only to product behavior that must be built.  
> Decision gate: **GO**

**7. Verify phase completes**
> `verify-report` cross-check: proposal, spec, design, and tasks are coherent; all MUST requirements trace to design decisions and implementation tasks.  
> Decision gate: **GO**

**8. Source-of-truth phase completes**
> Final `source-of-truth` consolidates verified SDR artifacts into a coding-ready package for `sdd-propose`.  
> Decision gate: **GO** → Research complete.

### What you now have

Search Engram:
```
sdr/ai-contract-review/explore   → Domain landscape
sdr/ai-contract-review/proposal  → Product direction & scope
sdr/ai-contract-review/spec      → Requirements & acceptance criteria
sdr/ai-contract-review/design    → Technical architecture + UI/UX DESIGN.md contract when applicable
sdr/ai-contract-review/tasks           → Coding task breakdown with dependencies
sdr/ai-contract-review/verify-report   → Consistency check & final verdict
sdr/ai-contract-review/source-of-truth → Coding-ready handoff package for SDD
sdr/ai-contract-review/state           → Full project state & decisions
```

### Handoff to implementation

When you're ready to build:
```
Convert this research into an SDD change?
```

The orchestrator hands the SDR `source-of-truth` artifact to the SDD pipeline as pre-loaded context for `sdd-propose`. SDR never jumps directly to `sdd-apply`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "No research context found" | Start with `/sdr-new {project}` so the orchestrator runs `sdr-init` first, or use `/sdr-continue {project}` only for projects with existing state |
| Research stopped mid-phase | Use `/sdr-continue {project}` — state is preserved |
| Want to change scope mid-flight | Reply `ADJUST` with your new constraint |
| Lost after compaction | `/sdr-continue` reads state from Engram automatically |
| Need to see what was decided | `mem_search(query: "sdr/{project}/state")` |

---

## Next Steps

- Read **[SDR-AGENTS-README.md](./SDR-AGENTS-README.md)** to understand the 8 specialized agents
- Read `skills/sdr-orchestrator/SKILL.md` for the full orchestrator protocol
- Read `skills/sdr-explore/SKILL.md` through `skills/sdr-verify/SKILL.md` for per-phase details
