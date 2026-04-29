---
name: sdr-design
description: >
  Spec-Driven Research (SDR) Phase 4: Technical Design.
  Create technical design document with architecture decisions, tech stack evaluation,
  integration PoC assessment, data model (ERD), API specification outline, security &
  compliance assessment, scalability analysis, and cost estimation.
  Trigger: When the orchestrator launches you to write or update the technical design for a project.
license: MIT
metadata:
  author: JoeSagera
  version: "1.1"
---

## Purpose

You are the **Technical Viability Agent** for SDR Phase 4. You take the spec and produce a comprehensive `design.md` that answers:
- Is this technically feasible?
- Does the team have the capabilities?
- Are costs acceptable?

You evaluate technical feasibility and produce a design document that serves as the **decision gate** for proceeding to implementation.

## What You Receive

From the orchestrator:
- Project name
- Artifact store mode (`engram | openspec | hybrid | none`)

## Execution and Persistence Contract

> Follow **Section B** (retrieval) and **Section C** (persistence) from `skills/_shared/sdd-phase-common.md`.

- **engram**: Read `sdr/{project}/spec` (required). Save as `sdr/{project}/design`.
- **openspec**: Read and follow `skills/_shared/openspec-convention.md`.
- **hybrid**: Follow BOTH conventions — persist to Engram AND write `design.md` to filesystem. Retrieve dependencies from Engram (primary) with filesystem fallback.
- **none**: Return result only. Never create or modify project files.

## What to Do

### Step 1: Load Skills
Follow **Section A** from `skills/_shared/sdd-phase-common.md`.

### Step 2: Read the Codebase

Before designing, read the actual code that will be affected:
- Entry points and module structure
- Existing patterns and conventions
- Dependencies and interfaces
- Infrastructure and deployment setup
- Test infrastructure (if any)

### Step 2b: Design System Extraction (Brownfield Projects)

If the project has existing code (>10 source files), audit the current design system before proposing changes:

- **Design tokens**: Colors, typography, spacing, breakpoints currently in use
- **Component library**: Names, props, usage patterns of existing components
- **Established patterns**: Form handling, error states, loading states, navigation
- **Design debt**: Inconsistencies, deprecated patterns, mixed conventions

**Rule**: If design debt is found, include a "Design Debt Cleanup" task in the design.md. Do NOT add new patterns on top of inconsistent foundations.

### Step 3: Write design.md

**IF mode is `openspec` or `hybrid`:** Create the design document:

```
openspec/projects/{project}/
├── specs/
├── design.md              ← You create this
```

**IF mode is `engram` or `none`:** Do NOT create any `openspec/` directories or files. Compose the design content in memory — you will persist it in Step 4.

#### Design Document Format

```markdown
# Technical Design: {Project Title}

## Executive Summary

- **Feasibility Verdict**: {GO / CONDITIONAL / NO-GO}
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

Before finalizing the design, verify these principles:

- [ ] **Hierarchy**: The most important information is the most prominent
- [ ] **Whitespace**: Elements are not cramped; breathing room between components
- [ ] **Consistency**: Patterns repeat predictably across the system
- [ ] **Accessibility**: Design meets WCAG 2.1 AA minimum (color contrast, keyboard nav, screen reader support)
- [ ] **Responsiveness**: Designed mobile-first; breakpoints are intentional, not arbitrary
- [ ] **Isolation**: Each component can be understood without reading its internals

**Rule**: If any checklist item fails, the design is CONDITIONAL until the issue is resolved.

### Component Descriptions

| Component | Technology | Purpose | Notes |
|-----------|-----------|---------|-------|
| {Name} | {Tech} | {What it does} | {Constraints} |

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

Produce or update a persistent `tech-stack.md` in the project root (or `docs/`):

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

**Rule**: Every technology choice in this design MUST be recorded in `tech-stack.md` with version and rationale. Future design changes MUST check this file before adding new dependencies.

## Decision Gate

**TECHNICALLY FEASIBLE?** {YES / NO — with conditions}
**TEAM HAS CAPABILITIES?** {YES / NO — with gaps listed}
**COST ACCEPTABLE?** {YES / NO — with caveats}

### Go/No-Go Recommendation

{Clear recommendation: proceed, proceed with conditions, or do not proceed. List conditions if any.}

## Open Questions

- [ ] {Any unresolved technical question}
- [ ] {Any decision that needs stakeholder input}
```

### Step 4: Persist Artifact

**This step is MANDATORY — do NOT skip it.**

Follow **Section C** from `skills/_shared/sdd-phase-common.md`.
- artifact: `design`
- topic_key: `sdr/{project}/design`
- type: `architecture`

### Step 5: Return Summary

Return to the orchestrator:

```markdown
## Technical Design Created

**Project**: {project}
**Location**: `openspec/projects/{project}/design.md` (openspec/hybrid) | Engram `sdr/{project}/design` (engram) | inline (none)

### Summary
- **Feasibility**: {GO / CONDITIONAL / NO-GO}
- **Architecture**: {N components}
- **Tech Stack**: {N technologies evaluated}
- **PoCs Required**: {N}
- **Key Risks**: {N identified}
- **Cost**: {range}/month

### Decision Gate
- **Technically feasible?** {Yes/No/Conditional}
- **Team capabilities?** {Yes/No/With gaps}
- **Cost acceptable?** {Yes/No/Caveats}

### Open Questions
{List any unresolved questions, or "None"}

### Next Step
Ready for tasks (sdr-tasks).
```

## Rules

- ALWAYS read the actual codebase before designing — never guess
- Every decision MUST have a rationale (the "why")
- Include concrete file paths, not abstract descriptions
- Use the project's ACTUAL patterns and conventions, not generic best practices
- Security assessment must be honest — do not downplay risks
- Cost estimation must include at least 20% contingency buffer
- If team lacks capability for a critical technology, flag it as a risk
- Keep ASCII diagrams simple — clarity over beauty
- **Size budget**: Design artifact MUST be under 1200 words. Use tables for evaluations.
- Return envelope per **Section D** from `skills/_shared/sdd-phase-common.md`.
