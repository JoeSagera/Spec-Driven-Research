---
name: sdr-tasks
description: >
  Create implementation-ready coding task slices for the project.
  Trigger: When the orchestrator launches you to convert SDR proposal, spec, and design into coding-ready implementation tasks.
license: MIT
metadata:
  author: JoeSagera
  version: "1.2"
---

# SDR Tasks — Coding Task Breakdown

## Purpose

You are responsible for **IMPLEMENTATION TASK BREAKDOWN**. You take the founder intake, proposal, spec, and design, then produce vertical coding slices that can feed the final SDR Source of Truth and later `sdd-propose`.

GTM, finance, pricing, SEO/content calendars, CRM flows, and launch operations are excluded from this phase unless they directly create product behavior that must be implemented.

## What You Receive

- Project name
- Artifact store mode (`engram | openspec | hybrid | none`)
- Prior artifacts: `sdr-init/{project}`, `sdr/{project}/proposal`, `sdr/{project}/spec`, `sdr/{project}/design`

## Execution and Persistence Contract

Follow `skills/_shared/sdr-phase-common.md`.

- **engram**: read required prior artifacts and save as `sdr/{project}/tasks`.
- **openspec**: write `openspec/sdr/{project}/tasks.md`.
- **hybrid**: do both, Engram primary.
- **none**: return inline only.

## What to Do

### Step 1: Analyze Inputs

Extract:

- MUST/SHOULD requirements and acceptance criteria
- architecture and tech-stack constraints
- design decisions, UI components, design tokens, and DESIGN.md handoff constraints when UI exists
- founder constraints: solo capacity, budget, timeline, risk tolerance, launch quality
- dependencies, external integrations, and risk mitigations

### Step 2: Create Vertical Coding Slices

Every task must deliver a working, testable product increment end-to-end and map back to design decisions/components where applicable.

Bad: “Build all backend APIs.”

Good: “User can create an account: schema + API + UI + validation + tests.”

For UI products, include explicit slices for component states, accessibility behavior, responsive behavior, and design debt cleanup identified in `design.md`.

### Step 3: Produce `tasks.md`

```markdown
# Implementation Task Plan: {Project Title}

## 0. Task Sizing & Vertical Slicing

| Size | Files | Scope | Max per plan |
|------|-------|-------|--------------|
| XS | 1 | Single function/config | Unlimited |
| S | 1-2 | One component or endpoint | Unlimited |
| M | 3-5 | One feature slice | ≤10 |
| L | 5-8 | Multi-component feature | ≤3 |
| XL | 8+ | Too large — split first | 0 |

## 1. Implementation Slices

| Task ID | Vertical Slice | Size | Dependencies | Mapped Requirements | Design Decisions / Components | Acceptance Criteria | Test Strategy | SDD Handoff Notes |
|---------|----------------|------|--------------|---------------------|-------------------------------|--------------------|---------------|-------------------|
| T-01 | {End-to-end user outcome} | S/M | {none/T-xx} | {REQ-xx} | {DEC-xx / component / token} | {Given/When/Then summary} | {unit/integration/e2e/a11y} | {modules likely affected} |

## 2. Dependency Order

```text
T-01 -> T-02 -> T-03
```

## 3. Acceptance Criteria Map

Each task maps to at least one requirement and one testable acceptance criterion.

## 4. Test Strategy

- Unit tests: {scope}
- Integration tests: {scope}
- E2E/acceptance tests: {scope}
- UI/accessibility tests: {keyboard, focus-visible, forms, states, responsive checks when UI exists}
- Manual verification: {only where automation is impractical}

## 5. Excluded From Coding Source of Truth

GTM, finance, pricing, SEO/content calendars, CRM flows, and launch operations are excluded here unless they create product behavior that must be implemented.

## 6. Decision Gate: Implementation Readiness

- [ ] Every MUST requirement maps to at least one task
- [ ] Every task has acceptance criteria
- [ ] Every task has a test strategy
- [ ] UI tasks map to design decisions/components and include states, accessibility, and responsive behavior when UI exists
- [ ] No task is XL
- [ ] Critical dependencies are explicit

**Decision**: {GO | ADJUST | NO-GO}
```

### Step 4: Persist Artifact

- artifact: `tasks`
- topic_key: `sdr/{project}/tasks`
- type: `architecture`

### Step 5: Return Envelope

Return the shared result envelope with `next_recommended: verify`.

## Rules

- ALWAYS produce implementation-ready vertical slices, not GTM or finance tasks.
- ALWAYS map tasks to requirements and acceptance criteria.
- ALWAYS map UI tasks to design decisions/components/tokens from `design.md` when UI exists.
- ALWAYS include UI state, accessibility, and responsive tasks when the design includes frontend scope.
- ALWAYS include dependency order, test strategy, and SDD handoff notes.
- Decision gate is mandatory; if tasks are not coding-ready, return `ADJUST`.
- Fresh sub-agent per task: document that each later implementation task should be executed in a fresh context.
- Stop conditions: unresolved critical dependency, missing acceptance criteria, impossible test strategy.
