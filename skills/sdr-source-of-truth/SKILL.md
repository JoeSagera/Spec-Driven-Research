---
name: sdr-source-of-truth
description: "Trigger: SDR PRD, source-of-truth, final handoff. Consolidate verified SDR evidence into one coding-ready PRD for SDD."
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
  sdr_phase: 7
  sdr_name: "PRD"
tools:
  - engram_mem_search
  - engram_mem_get_observation
  - engram_mem_save
  - read
  - glob
---

# SDR PRD Handoff

## Purpose

You consolidate validated SDR evidence into exactly one development-ready **PRD** for a solo founder building with AI workflow systems. This is the final SDR deliverable before SDD.

Follow `skills/_shared/sdr-phase-common.md`, especially **Section B1 — Token-Efficient PRD Contract**. Intermediate artifacts are internal evidence, not separate final documents.

## Inputs

Read the full artifacts for `explore`, `proposal`, `spec`, `design`, `tasks`, and `verify-report`. Never rely on search previews, summaries, or memory.

Before writing the PRD, confirm the verify report decision is **GO**. If verification is missing or not GO, return `blocked` and name the phase that must be revisited.

## Output

Create the final visible artifact named exactly `PRD`.

Persist it at the compatibility key `sdr/{project}/source-of-truth` and, in openspec/hybrid mode, `openspec/sdr/{project}/source-of-truth.md`. The internal path/key may keep `source-of-truth`; the user-facing title and handoff name must be `PRD`.

Start the artifact with:

```markdown
# PRD
```

Required sections:

1. Founder Context & Constraints
2. Product Category and Market Shape
3. Target Users, Buyer, and Monetization Assumptions
4. MVP Scope and Anti-Scope
5. Requirements and Acceptance Criteria Summary
6. Technical Architecture and Tech Stack
7. Design Direction, Tokens, Components, and Handoff Constraints (when UI exists)
8. Implementation-Ready Task Slices
9. Risks, Decision Gate, and Open Questions
10. SDD Handoff Notes for `sdd-propose`

Each section must reference the relevant stable IDs from Section B1 (`ASM-*`, `REQ-*`, `DEC-*`, `RSK-*`, `TASK-*`) instead of duplicating long prior-artifact prose. Preserve the final assumptions, requirements, decisions, risks, and task slices with enough detail for a developer or SDD proposal agent to proceed.

For UI/frontend products, the PRD must carry forward the exact design direction, semantic tokens, component/states inventory, accessibility constraints, responsive behavior, known design debt, and implementation guardrails from `design.md`. Do not reduce the UI contract to "make it modern" — preserve exact values and traceability.

## Duplicate-Document Guard

Do not present proposal, spec, design, tasks, or verify report as separate final deliverables. They are supporting evidence only. If a response would expose multiple final documents, rewrite it into one `PRD` with concise references to the internal evidence keys.

## Handoff Rule

The only valid final handoff is `SDR PRD (stored at source-of-truth key) -> sdd-propose`. Never route directly to `sdd-apply`.

## Result Envelope

Return the shared envelope from `skills/_shared/sdr-phase-common.md` with `next_recommended: sdd-propose`.

Set artifacts to the internal key/path written, but describe the visible artifact as `PRD`.
