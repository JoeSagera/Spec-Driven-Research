# Skill Registry — Spec-Driven-Research

Minimal registry for SDR skill resolution.

| Context | Skill | Path |
|---|---|---|
| SDR orchestration | `sdr-orchestrator` | `skills/sdr-orchestrator/SKILL.md` |
| Founder intake / project bootstrap | `sdr-init` | `skills/sdr-init/SKILL.md` |
| Strategic exploration | `sdr-explore` | `skills/sdr-explore/SKILL.md` |
| Proposal synthesis | `sdr-propose` | `skills/sdr-propose/SKILL.md` |
| Product specification | `sdr-spec` | `skills/sdr-spec/SKILL.md` |
| Technical design | `sdr-design` | `skills/sdr-design/SKILL.md` |
| Coding task breakdown | `sdr-tasks` | `skills/sdr-tasks/SKILL.md` |
| SDR verification | `sdr-verify` | `skills/sdr-verify/SKILL.md` |
| Final Source of Truth | `sdr-source-of-truth` | `skills/sdr-source-of-truth/SKILL.md` |

Compact phase rules:

- `sdr-design` produces canonical `design.md`: technical architecture plus UI/UX DESIGN.md contract when UI/frontend scope exists. UI decisions must include exact values and trace to proposal/spec; vague or missing UI contract returns `ADJUST`.
- `sdr-tasks` maps slices to requirements, design decisions/components, tests, UI states, accessibility, and responsive behavior when UI exists.
- `sdr-verify` treats missing design traceability or missing UI contract for UI products as CRITICAL/ADJUST.
- `sdr-source-of-truth` carries forward architecture, design direction, tokens/components, risks, and handoff constraints to `sdd-propose`.

Shared contracts:

- `skills/_shared/sdr-phase-common.md`
- `skills/_shared/openspec-convention.md`
- `skills/_shared/design-md-template.md`
- `skills/_shared/frontend-design-foundations.md`

Canonical phase chain: `init -> explore -> proposal -> spec -> design -> tasks -> verify -> source-of-truth -> sdd-propose`.

Canonical decision vocabulary: `GO | ADJUST | NO-GO`.
