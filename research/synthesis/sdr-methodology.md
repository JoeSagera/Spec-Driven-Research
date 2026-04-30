---
title: SDR Methodology Synthesis
description: Curated tracked synthesis of external research patterns used by SDR.
license: MIT
metadata:
  author: JoeSagera
---

# SDR Methodology Synthesis

This repository intentionally keeps raw research dumps out of Git. The auditable artifact is this curated synthesis: the external patterns SDR adopts, why they matter, and how they shape the framework.

## Key Pattern Decisions

- **Founder-first intake before research**: SDR begins with founder constraints and product category framing so research answers the right question: “Is this realistic for one founder using AI workflows?”
- **Phase-gated research workflow**: Each phase produces a persisted artifact and a `GO | ADJUST | NO-GO` decision before the next phase proceeds.
- **Coding-ready Source of Truth**: SDR does not end in a business plan. It consolidates research into requirements, architecture, risks, and implementation slices that can feed `sdd-propose`.
- **Tracked synthesis over raw bulk data**: Raw external data can remain ignored; the repository tracks human-reviewable methodology and decisions.
- **Project-scoped memory keys**: Engram keys include `{project}` to avoid cross-project pollution, including delegated agent artifacts.

## Methodology Boundary

GTM, finance, and launch planning are useful research inputs, but SDR’s final deliverable is a buildable product plan for professional app/web/startup execution. Non-coding material must support product decisions or be explicitly excluded from the final coding Source of Truth.
