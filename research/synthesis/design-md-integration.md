---
title: DESIGN.md Integration Synthesis
description: Curated research synthesis for adding professional UI/UX DESIGN.md contracts to SDR.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
---

# DESIGN.md Integration Synthesis

## Sources Synthesized

- `awesome-design-md` examples and Stitch-style design-md patterns.
- Frontend design skill research focused on avoiding generic AI-generated UI.
- Vercel-style web interface verification concerns for accessibility, motion, forms, responsive behavior, and semantic HTML.

## Key Finding

`DESIGN.md` works best as a Markdown-native design-system contract for agents: analogous to `AGENTS.md` for code behavior, but focused on visual intent, interaction behavior, accessibility, tokens, and implementation handoff. It should not replace Figma; it should make the UI decisions explicit enough that implementation agents stop inventing styles.

## Integration Decision

SDR Phase 4 (`sdr-design`) should continue producing technical architecture, but when the product has UI/frontend scope it must also embed a professional `UI/UX DESIGN.md Contract` in `design.md`. That contract must include exact values and evocative language, trace UI decisions to proposal goals/spec requirements, and provide implementation handoff rules for downstream tasks and verification.

## Gate Impact

- If UI matters and the DESIGN.md contract is missing or vague, the design phase returns `ADJUST`.
- Tasks must map implementation slices to design decisions/components and include UI states/accessibility work.
- Verification treats missing UI traceability or a missing UI contract as CRITICAL for UI products.
