# Spec-Driven Research (SDR)

Spec-Driven Research (SDR) is a founder-first pre-development workflow for validating and planning a digital startup, app, or web product before writing production code.

It is inspired by Gentle-AI SDD, but it operates one step earlier: SDR turns founder intent, constraints, market evidence, product requirements, technical feasibility, and implementation slices into a coding-ready **Source of Truth** that can be handed to SDD.

SDR is **not** a generic business-plan generator. Business, market, financial, and go-to-market research only matter here when they improve the product decision and make the eventual build clearer, safer, and more realistic for a solo founder / One Man Startup.

## Who this is for

SDR is designed for founders who need to answer:

- Is this product worth building?
- What should the first build actually include?
- What risks must be resolved before development?
- Can this be executed by one founder using AI-assisted workflows?
- What should SDD receive so implementation starts from evidence instead of vibes?

The workflow starts with **founder interview / intake** because every later research phase must be grounded in the founder's real constraints: goals, timeline, budget, technical ability, target users, risk tolerance, and definition of success.

## Canonical phase chain

```text
init -> explore -> proposal -> spec -> design -> tasks -> verify -> source-of-truth -> sdd-propose
```

| Phase | Purpose | Canonical artifact |
|---|---|---|
| `init` | Capture founder intake, constraints, project framing, and persistence setup. | `sdr-init/{project}` |
| `explore` | Research the product category, market shape, competitors, signals, and uncertainty. | `sdr/{project}/explore` |
| `proposal` | Synthesize product direction, scope, risks, and founder fit. | `sdr/{project}/proposal` |
| `spec` | Convert the validated direction into product requirements and acceptance criteria. | `sdr/{project}/spec` |
| `design` | Define the technical/research design, feasibility concerns, and implementation approach. | `sdr/{project}/design` |
| `tasks` | Break the build into coding-ready implementation slices. | `sdr/{project}/tasks` |
| `verify` | Cross-check consistency, traceability, assumptions, and readiness. | `sdr/{project}/verify-report` |
| `source-of-truth` | Consolidate verified SDR artifacts into the final handoff package. | `sdr/{project}/source-of-truth` |
| `sdd-propose` | Start the SDD pipeline using the SDR Source of Truth as preloaded context. | SDD proposal context |

Each phase is gated by the canonical decision vocabulary: `GO | ADJUST | NO-GO`.

## Final deliverable: coding-ready Source of Truth

The SDR `source-of-truth` artifact is the final pre-development contract. It should contain enough validated context for SDD to produce an implementation proposal without re-discovering the business/product fundamentals.

It consolidates:

- founder intent and constraints
- validated product direction
- requirements and acceptance criteria
- technical design implications
- known risks and open assumptions
- implementation-ready task slices
- verification results and handoff notes

The only valid implementation handoff is:

```text
SDR source-of-truth -> sdd-propose
```

SDR does not jump directly to `sdd-apply`.

## Artifact storage modes

SDR supports multiple persistence modes, depending on whether the work should live in memory, files, or both.

| Mode | Saves to | Best for |
|---|---|---|
| `engram` | Engram memory using deterministic topic keys. | Fast solo research and ephemeral projects. |
| `openspec` | Files under `openspec/sdr/{project}/`. | Reviewable filesystem artifacts and audit trails. |
| `hybrid` | Both Engram and `openspec/sdr/{project}/`. | Production research where memory and tracked files both matter. |
| `none` | Inline output only. | One-off exploration with no persistence. |

The canonical filesystem layout for `openspec` and `hybrid` modes is:

```text
openspec/sdr/{project}/
├── init.md
├── explore.md
├── proposal.md
├── spec.md
├── design.md
├── tasks.md
├── verify-report.md
└── source-of-truth.md
```

Local runtime or private assistant state may live outside tracked artifacts; for example, `.gga` is local/ignored when present and should not be treated as the SDR artifact store.

## Repository structure

```text
.
├── skills/
│   ├── SDR-QUICKSTART.md              # End-user quickstart
│   ├── SDR-AGENTS-README.md           # Specialized research agent reference
│   ├── sdr-orchestrator/SKILL.md      # SDR coordinator protocol
│   ├── sdr-init/SKILL.md              # Founder intake and bootstrap phase
│   ├── sdr-explore/SKILL.md           # Strategic investigation phase
│   ├── sdr-propose/SKILL.md           # Proposal synthesis phase
│   ├── sdr-spec/SKILL.md              # Product specification phase
│   ├── sdr-design/SKILL.md            # Technical design phase
│   ├── sdr-tasks/SKILL.md             # Coding task breakdown phase
│   ├── sdr-verify/SKILL.md            # Verification phase
│   ├── sdr-source-of-truth/SKILL.md   # Final SDR handoff phase
│   ├── agents/                        # Bounded specialist research agents
│   └── _shared/                       # Shared phase and storage contracts
├── research/synthesis/
│   └── sdr-methodology.md             # Curated methodology decisions
├── .atl/
│   └── skill-registry.md              # Minimal skill resolution registry
└── AGENTS.md                          # Repository-level agent instructions
```

## Quickstart

Start here:

- [SDR Quickstart Guide](./skills/SDR-QUICKSTART.md)
- [SDR Agents Reference](./skills/SDR-AGENTS-README.md)
- [SDR Methodology Synthesis](./research/synthesis/sdr-methodology.md)
- [Skill Registry](./.atl/skill-registry.md)

Core commands documented by the quickstart:

```text
/sdr-new <project-name>
/sdr-continue [project-name]
/sdr-ff <project-name>
```

## Current status

This repository currently contains the stabilized SDR documentation and skill definitions for the canonical architecture:

```text
init -> explore -> proposal -> spec -> design -> tasks -> verify -> source-of-truth -> sdd-propose
```

The framework is documentation/skill-driven. It is ready for review and iterative use as an SDR workflow definition, but it should be treated as an evolving pre-development methodology rather than a packaged application runtime.
