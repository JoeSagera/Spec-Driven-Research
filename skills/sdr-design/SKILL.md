---
name: sdr-design
description: >
  Spec-Driven Research (SDR) Phase 4: Technical Design.
  Create a professional design.md with technical architecture decisions and, when
  the product has UI/frontend scope, a UI/UX DESIGN.md contract for visual system,
  interaction, accessibility, and implementation handoff.
  Trigger: When the orchestrator launches you to write or update the technical design for a project.
license: MIT
metadata:
  author: JoeSagera
  version: "1.2"
---

## Purpose

You are the **SDR Technical Design Agent** for Phase 4. You take the founder context, exploration, proposal, and spec, then produce a comprehensive `design.md` that answers:
- Is this technically feasible in greenfield or brownfield mode?
- Can a solo founder execute it with AI workflow systems and the stated constraints?
- Are costs acceptable?
- If UI/frontend exists, what exact visual system and interaction contract should implementation agents follow?

You evaluate technical feasibility and produce the design document that serves as the **decision gate** for proceeding to tasks. When UI matters, you own the UI/UX `DESIGN.md` contract as part of `design.md`.

## What You Receive

From the orchestrator:
- Project name
- Artifact store mode (`engram | openspec | hybrid | none`)

## Execution and Persistence Contract

> Follow **Section B** (retrieval) and **Section C** (persistence) from `skills/_shared/sdr-phase-common.md`.

- **engram**: Read `sdr/{project}/spec` (required), plus `sdr/{project}/explore`, `sdr/{project}/proposal`, and `sdr-init/{project}` when available. Save as `sdr/{project}/design`.
- **openspec**: Read and follow `skills/_shared/openspec-convention.md`.
- **hybrid**: Follow BOTH conventions — persist to Engram AND write `design.md` to filesystem. Retrieve dependencies from Engram (primary) with filesystem fallback.
- **none**: Return result only. Never create or modify project files.

Shared references to apply when UI/frontend scope exists:

- `skills/_shared/design-md-template.md`
- `skills/_shared/frontend-design-foundations.md`

## What to Do

### Step 1: Load Skills
Follow **Section A** from `skills/_shared/sdr-phase-common.md`.

### Step 2: Determine Greenfield or Brownfield Mode

Before designing, determine whether this is:

- **Greenfield**: no existing product codebase. Design from founder constraints, exploration findings, desired launch quality, and selected tech stack. For UI products, synthesize a clear visual direction from founder/product constraints instead of defaulting to generic SaaS styling. Use conceptual modules/services and do not invent fake file paths.
- **Brownfield**: existing product codebase. Read the actual code that will be affected and cite concrete existing file paths:
- Entry points and module structure
- Existing patterns and conventions
- Dependencies and interfaces
- Infrastructure and deployment setup
- Test infrastructure (if any)

Do not require an existing codebase for greenfield projects.

### Step 2b: UI Scope and Design System Extraction

Determine whether UI/frontend experience affects the product outcome. UI matters if the spec includes screens, workflows, forms, dashboards, onboarding, mobile/web frontend, design-system work, or user-facing interaction states.

If UI does **not** matter, state that explicitly and omit the UI/UX contract.

If UI matters:

- Read `skills/_shared/design-md-template.md` and `skills/_shared/frontend-design-foundations.md`.
- Add a dedicated `UI/UX DESIGN.md Contract` section inside `design.md`.
- Trace UI choices to spec requirements and proposal goals.
- Use exact values (hex, sizes, spacing, radii, shadows, breakpoints, durations) **and** descriptive language.
- If the UI/UX contract is missing, vague, or could apply unchanged to any generic app, the decision is `ADJUST`.

### Step 2c: Design System Extraction (Brownfield Projects)

If the project has existing code (>10 source files), audit the current design system before proposing changes:

- **Design tokens**: Colors, typography, spacing, breakpoints currently in use
- **Component library**: Names, props, usage patterns of existing components
- **Established patterns**: Form handling, error states, loading states, navigation
- **Design debt**: Inconsistencies, deprecated patterns, mixed conventions

**Rule**: If design debt is found, include a "Design Debt Cleanup" task in the design.md. Do NOT add new patterns on top of inconsistent foundations.

### Step 3: Write design.md

**IF mode is `openspec` or `hybrid`:** Create the design document:

```
openspec/sdr/{project}/
├── design.md              ← You create this
├── tech-stack.md          ← Create only in openspec/hybrid mode when stack is material
```

**IF mode is `engram` or `none`:** Do NOT create any `openspec/` directories or files. Compose the design content in memory — you will persist it in Step 4.

**Tech Stack Rule**: In Engram mode, persist tech-stack decisions inside `sdr/{project}/design` or `sdr/{project}/tech-stack`. Only write `tech-stack.md` in openspec/hybrid mode.

#### Design Document Format

```markdown
# Technical Design: {Project Title}

## Executive Summary

- **Feasibility Verdict**: {GO / ADJUST / NO-GO}
- **Risk Level**: {LOW / MEDIUM / HIGH}
- **Estimated Timeline**: {N weeks/months}
- **Estimated Cost**: {rough order of magnitude}
- **Key Assumptions**: {top 3 assumptions}

## Architecture Document

### System Overview

{High-level description of the technical architecture. How does this map to the spec's approach?}

### Component Diagram

Use Mermaid for architecture diagrams (preferred) or ASCII for simple ones:

```mermaid
graph TD
    Client --> API
    API --> Services
    API --> Cache
    Services --> Store
```

### Design Taste Checklist

Before finalizing a UI/frontend design, verify these principles. For backend-only, API-only, data-pipeline, CLI, infrastructure, or otherwise non-UI projects, mark this checklist **N/A — no UI/frontend scope** and do not block the design on visual criteria:

- [ ] **Hierarchy**: The most important information is the most prominent
- [ ] **Whitespace**: Elements are not cramped; breathing room between components
- [ ] **Consistency**: Patterns repeat predictably across the system
- [ ] **Accessibility**: Design meets WCAG 2.1 AA minimum (color contrast, keyboard nav, screen reader support)
- [ ] **Responsiveness**: Designed mobile-first; breakpoints are intentional, not arbitrary
- [ ] **Isolation**: Each component can be understood without reading its internals

**Rule**: If UI/frontend scope exists and any checklist item fails, the design is ADJUST until the issue is resolved. If no UI/frontend scope exists, N/A is acceptable.

### Component Descriptions

| Component | Technology | Purpose | Notes |
|-----------|-----------|---------|-------|
| {Name} | {Tech} | {What it does} | {Constraints} |

## UI/UX DESIGN.md Contract

{Include this section when UI/frontend scope exists. If no UI exists, state "Not applicable — no user-facing UI/frontend scope in current spec."}

### Product Design Intent

- Product promise: {what users should feel/do}
- Primary users and context: {from init/explore/proposal/spec}
- Traceability: {proposal goals and REQ IDs supported}

### Visual Theme & Atmosphere

{Specific aesthetic direction with descriptive language and rationale. For greenfield, synthesize from founder/product constraints. For brownfield, align to existing tokens/components unless design debt requires cleanup.}

### Visual Hierarchy

- Primary focus per core screen/workflow
- Information priority and density rules
- Mobile hierarchy changes

### Color Palette & Semantic Roles

| Role | Token | Hex | Usage | Requirement Trace |
|------|-------|-----|-------|-------------------|
| Background | `--color-bg` | `#...` | {usage} | {REQ/goal} |
| Surface | `--color-surface` | `#...` | {usage} | {REQ/goal} |
| Text | `--color-text` | `#...` | {usage} | {REQ/goal} |
| Accent | `--color-accent` | `#...` | {usage} | {REQ/goal} |
| Success/Warning/Danger | `--color-*` | `#...` | {states} | {REQ/goal} |

### Typography Rules

{Font stack, type scale, line heights, weights, max line lengths, and microcopy tone.}

### Spacing, Layout & Responsive Grid

{Spacing scale, containers, grid, breakpoints, safe areas, overflow behavior.}

### Component Styling & Anatomy

| Component | Anatomy | Variants/States | Tokens | Requirement Trace |
|-----------|---------|-----------------|--------|-------------------|
| {Component} | {slots/parts} | {default/hover/focus/etc.} | {tokens} | {REQ/goal} |

### Depth & Elevation

{Surface hierarchy, shadows, borders/dividers, overlay layering, sticky regions, dialogs, and z-index rules. Elevation must communicate hierarchy or interaction, never decoration alone.}

### Forms & Validation

{Labels, help text, validation timing, error copy, submit/loading/disabled/retry behavior.}

### Interaction States

{Default, hover, active, focus-visible, selected, disabled, loading, empty, error, success, skeleton/offline where relevant.}

### Motion & Reduced Motion

{Purpose, durations/easing, `prefers-reduced-motion`, and rule forbidding `transition: all`.}

### Accessibility Gate

{Semantic HTML, labels, ARIA only when needed, keyboard navigation, focus-visible, contrast, alt text, content zoom/overflow, i18n, form announcements.}

### Design Tokens

```css
:root {
  --color-bg: #...;
  --space-1: 4px;
  --radius-md: 8px;
  --motion-fast: 120ms;
}
```

### Do / Don't Guardrails

| Do | Don't | Why |
|----|-------|-----|
| {specific rule} | {specific anti-pattern} | {rationale} |

### Agent Prompt Guide / Implementation Handoff

{Implementation constraints, component reuse rules, files/modules for brownfield, and stop condition: if UI states/accessibility/responsive rules are missing, return ADJUST rather than guessing.}

## Tech Stack Evaluation

### Recommended Stack

| Layer | Choice | Rationale | Maturity |
|-------|--------|-----------|----------|
| Frontend | {Tech} | {Why} | {Level} |
| Backend | {Tech} | {Why} | {Level} |
| Database | {Tech} | {Why} | {Level} |
| Cache | {Tech} | {Why} | {Level} |
| Queue | {Tech} | {Why} | {Level} |
| Infra | {Tech} | {Why} | {Level} |

### Alternatives Considered

| Alternative | Why Rejected | Risk |
|-------------|--------------|------|
| {Tech} | {Reason} | {Risk} |

### Team Capability Assessment

| Technology | Team Experience | Gap? | Mitigation |
|------------|---------------|------|------------|
| {Tech} | {None/Basic/Intermediate/Advanced} | {Yes/No} | {Training/Hiring/Consultant} |

## Integration PoC Assessment

### High-Risk Integrations

| Integration | Complexity | Risk | PoC Required? | PoC Scope |
|-------------|-----------|------|---------------|-----------|
| {System/API} | {Low/Med/High} | {Risk} | {Yes/No} | {What to validate} |

### PoC Recommendations

1. **{Integration Name}**: {What to prove in the PoC, success criteria, estimated effort}

## Data Model (ERD)

```
{Entity Relationship Diagram in ASCII or reference to external tool}

EntityA ||--o{ EntityB : has_many
EntityA {
  id PK
  name string
  created_at timestamp
}
EntityB {
  id PK
  entity_a_id FK
  value string
}
```

## API Specification Outline

### Endpoints

| Method | Path | Purpose | Auth | Rate Limit |
|--------|------|---------|------|------------|
| GET | /api/v1/resource | List | Token | 100/min |
| POST | /api/v1/resource | Create | Token | 20/min |

### Key Contracts

```typescript
// Example type/interface
interface Resource {
  id: string;
  name: string;
  // ...
}
```

## Security & Compliance Assessment

### Threat Model

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|------------|
| {Threat} | {Low/Med/High} | {Low/Med/High} | {Strategy} |

### Compliance Requirements

| Regulation | Applies? | Gap | Action |
|------------|----------|-----|--------|
| GDPR | {Yes/No} | {None/Partial/Major} | {Action} |
| SOC2 | {Yes/No} | {None/Partial/Major} | {Action} |

### Data Classification

| Data Type | Sensitivity | Storage | Encryption |
|-----------|-------------|---------|------------|
| PII | High | Encrypted at rest | AES-256 |
| Logs | Medium | Standard | TLS in transit |

## Scalability Analysis

### Current Load Estimates

| Metric | Estimate | Peak |
|--------|----------|------|
| Daily Active Users | {N} | {Peak N} |
| Requests/sec | {N} | {Peak N} |
| Data Volume | {N GB/month} | {Peak} |

### Scaling Strategy

| Bottleneck | Strategy | Effort |
|------------|----------|--------|
| {DB reads} | {Read replicas} | {Low} |
| {API latency} | {CDN + caching} | {Medium} |

### Limits

- **Hard limit**: {What breaks first}
- **Cost inflection point**: {When costs spike non-linearly}

## Cost Estimation

### Infrastructure (Monthly)

| Service | Tier | Cost |
|---------|------|------|
| Compute | {Spec} | ${N} |
| Database | {Spec} | ${N} |
| Storage | {Spec} | ${N} |
| Bandwidth | {Est} | ${N} |
| **Total Infra** | | **${N}** |

### Team (Monthly)

| Role | FTE | Cost |
|------|-----|------|
| {Role} | {N} | ${N} |
| **Total Team** | | **${N}** |

### Third-Party Services

| Service | Plan | Cost |
|---------|------|------|
| {Service} | {Plan} | ${N} |

### Total Estimated Cost

- **Month 1-3 (Build)**: ${N}
- **Month 4+ (Run)**: ${N}/month

## Risk Register

| Risk | Probability | Impact | Owner | Mitigation |
|------|------------|--------|-------|------------|
| {Risk} | {Low/Med/High} | {Low/Med/High} | {Role} | {Strategy} |

## Migration / Rollout Plan

{If this requires phased rollout, feature flags, or data migration, describe the plan.}

## Tech Stack Artifact

Persist tech-stack decisions according to the active artifact store mode:

- **engram**: Save the tech stack as an Engram artifact only, using `sdr/{project}/tech-stack` or embedding it in `sdr/{project}/design`.
- **openspec/hybrid**: Write the tech stack only to `openspec/sdr/{project}/tech-stack.md`.
- **none**: Return the tech stack inline only; do not persist it.

```markdown
# Tech Stack: {Project Name}

| Layer | Choice | Version | Rationale | Decision Date |
|-------|--------|---------|-----------|---------------|
| Frontend | {Tech} | {Version} | {Why} | {YYYY-MM-DD} |
| Backend | {Tech} | {Version} | {Why} | {YYYY-MM-DD} |
| Database | {Tech} | {Version} | {Why} | {YYYY-MM-DD} |
| Cache | {Tech} | {Version} | {Why} | {YYYY-MM-DD} |
| Infra | {Tech} | {Version} | {Why} | {YYYY-MM-DD} |
```

**Rule**: Every technology choice in this design MUST be recorded in the active mode's tech-stack artifact with version and rationale. Future design changes MUST check that artifact before adding new dependencies.

## Decision Gate

**TECHNICALLY FEASIBLE?** {GO / ADJUST / NO-GO — with rationale}
**TEAM HAS CAPABILITIES?** {GO / ADJUST / NO-GO — with gaps listed}
**COST ACCEPTABLE?** {GO / ADJUST / NO-GO — with caveats}
**UI/UX CONTRACT READY?** {GO / ADJUST / NO-GO / N/A — ADJUST if UI matters and DESIGN.md contract is vague/missing}

### Decision Recommendation

{Clear recommendation using GO, ADJUST, or NO-GO. List required adjustments if verdict is ADJUST.}

## Open Questions

- [ ] {Any unresolved technical question}
- [ ] {Any decision that needs stakeholder input}
```

### Step 4: Persist Artifact

**This step is MANDATORY — do NOT skip it.**

Follow **Section C** from `skills/_shared/sdr-phase-common.md`.
- artifact: `design`
- topic_key: `sdr/{project}/design`
- type: `architecture`

### Step 5: Return Summary

Return to the orchestrator:

```markdown
## Technical Design Created

**Project**: {project}
**Location**: `openspec/sdr/{project}/design.md` (openspec/hybrid) | Engram `sdr/{project}/design` (engram) | inline (none)

### Summary
- **Feasibility**: {GO / ADJUST / NO-GO}
- **Architecture**: {N components}
- **UI/UX Contract**: {present / not applicable / missing}
- **Tech Stack**: {N technologies evaluated}
- **PoCs Required**: {N}
- **Key Risks**: {N identified}
- **Cost**: {range}/month

### Decision Gate
- **Technically feasible?** {GO / ADJUST / NO-GO}
- **Team capabilities?** {GO / ADJUST / NO-GO}
- **Cost acceptable?** {GO / ADJUST / NO-GO}

### Open Questions
{List any unresolved questions, or "None"}

### Next Step
Ready for tasks (sdr-tasks).
```

## Rules

- Brownfield only: ALWAYS read the actual codebase before designing — never guess
- Every decision MUST have a rationale (the "why")
- Every UI decision MUST trace to a spec requirement or proposal goal when UI/frontend scope exists.
- Brownfield only: include concrete existing file paths, not abstract descriptions
- Brownfield only: use the project's ACTUAL patterns and conventions, not generic best practices
- Brownfield UI only: extract existing tokens/components and identify design debt before adding new UI patterns.
- Greenfield only: use conceptual modules/services and do not fabricate file paths.
- Greenfield UI only: synthesize visual direction from founder/product constraints; do not default to generic AI SaaS styling.
- Security assessment must be honest — do not downplay risks
- Cost estimation must include at least 20% contingency buffer
- If team lacks capability for a critical technology, flag it as a risk
- If UI matters and the UI/UX DESIGN.md contract is missing, vague, lacks exact values, or lacks traceability, return `ADJUST`.
- Keep ASCII diagrams simple — clarity over beauty
- **Size budget**: Design artifact SHOULD stay under 1800 words. Use tables for evaluations; split optional `ui-design.md` only when the active store/user warrants it.
- Return envelope per **Section D** from `skills/_shared/sdr-phase-common.md`.
