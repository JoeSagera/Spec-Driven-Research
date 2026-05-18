---
name: sdr-phase-common
description: Shared SDR phase contracts, persistence conventions, and result envelopes.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
---

# SDR Phase Common Contract

## Section A — Skill Resolution

Phase agents normally receive pre-injected rules from `sdr-orchestrator`. If a phase agent must resolve rules itself, use this order:

1. `.atl/skill-registry.md`
2. `skills/_shared/sdr-phase-common.md`
3. Local `skills/sdr-<phase>/SKILL.md`

Report the path used in `skill_resolution` as `injected`, `fallback-registry`, `fallback-path`, or `none`.

## Section B — Retrieval

Use the artifact store mode injected by the orchestrator.

- `engram`: retrieve full observations with `mem_get_observation`; never rely on search previews.
- `openspec`: read phase files under `openspec/sdr/{project}/`.
- `hybrid`: read Engram first, then filesystem fallback under `openspec/sdr/{project}/`.
- `none`: use only injected context and return inline.

Canonical phase chain:

`init -> explore -> proposal -> spec -> design -> tasks -> verify -> source-of-truth (final visible artifact: PRD) -> sdd-propose`

## Section B1 — Token-Efficient PRD Contract

SDR phases produce compressed internal evidence. The only user-facing final handoff document is exactly **PRD**. Keep `source-of-truth` in internal paths/topic keys only when needed for compatibility.

### Question Classification

`QuestionClassification = founder-only | AI-safe | mixed | validation-checkpoint`

Classify every founder-facing prompt before asking it:

| Classification | Ask founder by default? | Rule |
|---|---:|---|
| `founder-only` | Yes | Business context, constraints, taste, goals, or facts only the founder can know. |
| `AI-safe` | No | Technical or workflow choice the agent can recommend with tradeoffs and an override point. |
| `mixed` | Only missing founder part | Split business context from technical execution; ask only what cannot be inferred. |
| `validation-checkpoint` | Yes | Explicit approval for high-impact assumptions, scope, risk, or final PRD handoff. |

Founder-question budget: ask the minimum viable set needed to avoid fabricating founder context. Prefer AI recommendations for `AI-safe` items and batch founder questions when possible.

### Stable IDs

Use stable IDs instead of repeating full prior content:

| Prefix | Meaning |
|---|---|
| `ASM-*` | Assumption or founder context |
| `REQ-*` | Requirement or acceptance criterion |
| `DEC-*` | Decision, recommendation, or rejected alternative |
| `RSK-*` | Risk, mitigation, or open concern |
| `TASK-*` | Implementation task or work slice |

IDs are append-only within a project. If an item changes, keep the ID and report it in `changed_ids`; create a new ID only for a materially new item.

### Compressed Evidence Envelope

Each phase artifact SHOULD include this compact evidence block:

```yaml
evidence:
  new_ids: []              # IDs introduced by this phase
  changed_ids: []          # Existing IDs materially changed
  carried_forward_ids: []  # Prior IDs still relevant; no restatement needed
  open_questions: []       # Founder-only or validation-checkpoint items still unresolved
  token_budget_status: ok | watch | exceeded
```

Evidence rules:
- Summarize deltas and ID references; do not restate complete prior artifacts.
- AI-safe decisions must include one recommendation, at least one tradeoff, and one founder override point.
- The PRD must reference the final assumptions, requirements, decisions, risks, and tasks by stable ID.

## Section C — Persistence

Canonical Engram topic keys:

| Artifact | Topic Key |
|---|---|
| init | `sdr-init/{project}` |
| explore | `sdr/{project}/explore` |
| proposal | `sdr/{project}/proposal` |
| spec | `sdr/{project}/spec` |
| design | `sdr/{project}/design` |
| UI design contract (optional split) | `sdr/{project}/ui-design` |
| tasks | `sdr/{project}/tasks` |
| verify report | `sdr/{project}/verify-report` |
| PRD (internal source-of-truth key) | `sdr/{project}/source-of-truth` |
| agent artifact | `sdr/{project}/agents/{agent}/{artifact}` |

Filesystem mirror for `openspec` and `hybrid` mode:

```text
openspec/sdr/{project}/
├── init.md
├── explore.md
├── proposal.md
├── spec.md
├── design.md              # technical architecture; may embed UI/UX DESIGN.md contract
├── ui-design.md           # optional split only when useful for large UI systems
├── tasks.md
├── verify-report.md
└── source-of-truth.md      # final visible artifact title: PRD
```

Tech-stack persistence:

- `engram`: save as part of `sdr/{project}/design` or as `sdr/{project}/tech-stack`.
- `openspec`/`hybrid`: write `openspec/sdr/{project}/tech-stack.md` only when a file-backed store is active.

Design persistence:

- Canonical `design` remains `sdr/{project}/design` / `openspec/sdr/{project}/design.md`.
- `design.md` may include both technical architecture and a UI/UX DESIGN.md contract when the product has frontend/UI scope.
- Use optional `ui-design` / `ui-design.md` only when the contract is split by store/user preference or the UI system is large enough to justify a separate file. Do not break canonical `design` traceability.

## Section D — Result Envelope

Every SDR phase returns this exact envelope:

```markdown
**Status**: success | partial | blocked
**Executive Summary**: {1-3 decision-ready sentences}
**Artifacts**: {Engram keys and/or filesystem paths written}
**Decision Gate**: GO | ADJUST | NO-GO
**Risks**: {risks discovered, or None}
**Next Recommended**: {next canonical phase or none}
**Skill Resolution**: injected | fallback-registry | fallback-path | none
**Detailed Report**: {optional if persisted elsewhere}
```

Decision vocabulary is always `GO | ADJUST | NO-GO`. Use `ADJUST` for conditional/iterate/more-data cases.

## Section E — SDR Boundary

SDR produces one coding-ready **PRD** for a solo founder using AI workflow systems. Intermediate phase artifacts are internal evidence, not separate final deliverables. SDR does not replace SDD implementation. The final handoff is always:

`SDR PRD (source-of-truth key) -> sdd-propose`

Never hand off directly to `sdd-apply`.
