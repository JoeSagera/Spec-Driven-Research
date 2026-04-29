# SDR Quickstart Guide

Get from idea to validated research in minutes with the Spec-Driven Research (SDR) framework.

---

## What is SDR?

SDR is a structured pipeline for running multi-agent research. Instead of one generic chat, you delegate to specialized agents — Market Intelligence, Competitive Analysis, Technical Viability, and more — each producing standardized outputs that feed into the next phase.

Think of it as CI/CD for research: **explore → propose → spec → design → tasks → verify**, with a decision gate after every phase.

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
- Launches **sdr-explore** to investigate the domain
- Then launches **sdr-propose** to define scope and research questions
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

Runs all six phases sequentially. Stops automatically if any phase returns `ADJUST` or `NO-GO`.

---

## The 3 Meta-Commands

| Command | Purpose | Stops For | Best For |
|---------|---------|-----------|----------|
| `/sdr-new <name>` | Start fresh; runs explore + propose | Interactive mode asks GO/ADJUST/NO-GO | New ideas, unknown domains |
| `/sdr-continue [name]` | Resume from last completed phase | Nothing; seamless continuation | Multi-session research |
| `/sdr-ff <name>` | Run full pipeline: explore → verify | ADJUST, NO-GO, errors | Well-understood domains, CI-like runs |

> **Pro tip:** You can switch from Interactive to Automatic mid-project, but the orchestrator will ask you to confirm.

---

## What Happens in Each Phase

```
explore ──→ propose ──→ spec ──→ design ──→ tasks ──→ verify
   ↑           ↑          ↑         ↑         ↑          ↑
   │           │          │         │         │          │
   └───────────┴──────────┴─────────┴─────────┴──── NO-GO → archive
```

| Phase | What the agent does | What you get | Typical Duration |
|-------|---------------------|--------------|------------------|
| **explore** | Scans domain, identifies knowledge gaps, maps stakeholders | Research landscape + gap analysis | 1-2 min |
| **propose** | Defines research questions, scope, approach, risks | Research proposal with risk assessment | 1-2 min |
| **spec** | Writes structured requirements and success criteria | Spec sheet with acceptance criteria | 1-2 min |
| **design** | Designs methodology, agent selection, data sources | Research design document | 1-2 min |
| **tasks** | Breaks work into checkable tasks with owners | Task list with dependencies | 1 min |
| **verify** | Cross-checks consistency, validates assumptions | Verification report + final verdict | 1-2 min |

Each phase saves artifacts to Engram. Nothing is lost.

---

## Expected Outputs & Where to Find Them

### Engram Topic Keys (deterministic)

Every artifact is saved under `sdr/{project-name}/{phase}`:

| Phase | Topic Key | Example |
|-------|-----------|---------|
| explore | `sdr/{project}/explore` | `sdr/ai-contract-review/explore` |
| propose | `sdr/{project}/propose` | `sdr/ai-contract-review/propose` |
| spec | `sdr/{project}/spec` | `sdr/ai-contract-review/spec` |
| design | `sdr/{project}/design` | `sdr/ai-contract-review/design` |
| tasks | `sdr/{project}/tasks` | `sdr/ai-contract-review/tasks` |
| verify | `sdr/{project}/verify` | `sdr/ai-contract-review/verify` |
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
| `openspec` | Files in `openspec/research/{project}/` | Team review, audit trail |
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

**3. Propose phase completes**
> Research questions defined: (1) Market size for mid-market segment, (2) Competitive gap analysis, (3) Technical feasibility of clause extraction, (4) GTM through legal tech consultants.  
> Decision gate: **GO**

**4. Spec phase completes**
> Requirements: TAM/SAM/SOM with confidence intervals, feature matrix vs. 5 competitors, PoT for LLM clause extraction, 90-day GTM plan, 24-month financial model.  
> Decision gate: **GO**

**5. Design phase completes**
> Agent allocation: Market Intelligence (TAM), Competitive Analysis (feature matrix), Technical Viability (LLM PoT), Go-to-Market (channel strategy), Financial Projections (unit economics).  
> Decision gate: **GO**

**6. Tasks phase completes**
> 23 tasks across 5 agents with dependencies mapped.  
> Decision gate: **GO**

**7. Verify phase completes**
> Cross-check: Market Intelligence TAM ($500M) aligns with Financial SOM ($12M Year 3). Competitive gap confirmed by Technical Viability assessment.  
> Decision gate: **GO** → Research complete.

### What you now have

Search Engram:
```
sdr/ai-contract-review/explore   → Domain landscape
sdr/ai-contract-review/propose   → Research questions & scope
sdr/ai-contract-review/spec      → Requirements & acceptance criteria
sdr/ai-contract-review/design    → Methodology & agent selection
sdr/ai-contract-review/tasks   → Task breakdown with dependencies
sdr/ai-contract-review/verify    → Consistency check & final verdict
sdr/ai-contract-review/state     → Full project state & decisions
```

### Handoff to implementation

When you're ready to build:
```
Convert this research into an SDD change?
```

The orchestrator hands the SDR `spec` artifact to the SDD pipeline as pre-loaded context for `sdd-propose`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "No research context found" | Run `/sdr-init {project}` before `/sdr-new` |
| Research stopped mid-phase | Use `/sdr-continue {project}` — state is preserved |
| Want to change scope mid-flight | Reply `ADJUST` with your new constraint |
| Lost after compaction | `/sdr-continue` reads state from Engram automatically |
| Need to see what was decided | `mem_search(query: "sdr/{project}/state")` |

---

## Next Steps

- Read **[SDR-AGENTS-README.md](./SDR-AGENTS-README.md)** to understand the 8 specialized agents
- Read `skills/sdr-orchestrator/SKILL.md` for the full orchestrator protocol
- Read `skills/sdr-explore/SKILL.md` through `skills/sdr-verify/SKILL.md` for per-phase details
