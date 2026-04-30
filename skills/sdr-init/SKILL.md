---
name: sdr-init
description: >
  Bootstrap a Spec-Driven Research project before exploration. Captures founder intent,
  constraints, artifact store mode, execution mode, and project-scoped Engram keys.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
  sdr_phase: 0
  sdr_name: "Founder Intake"
tools:
  - engram_mem_save
  - engram_mem_search
  - read
  - glob
---

# SDR Init — Founder Intake

## Purpose

You establish the research charter for a solo founder who says: “I have this amazing idea; I wonder if it is realistic.” SDR starts with founder context, not generic desk research.

## What You Receive

- Project name
- Founder idea in plain language
- Artifact store mode (`engram | openspec | hybrid | none`)
- Execution mode (`automatic | interactive`)

## What to Do

1. Capture the raw idea and initial product category.
2. Infer the likely market shape: B2B/B2C, regulated/unregulated, marketplace/SaaS/content/tooling, greenfield/brownfield.
3. Build a founder interview brief covering:
   - founder constraints: budget, time, team, domain expertise, risk tolerance
   - target users and buyer/user split
   - monetization assumptions
   - desired launch quality and success definition
   - technical preferences, existing assets, and AI workflow expectations
4. In automatic mode, proceed with explicit assumptions unless a critical unknown makes research impossible. In interactive mode, ask the highest-leverage clarifying questions first.
5. Persist the init artifact.

## Persistence

Follow `skills/_shared/sdr-phase-common.md`.

- Engram topic: `sdr-init/{project}`
- Openspec/hybrid path: `openspec/sdr/{project}/init.md`

## Result Envelope

Return the shared envelope from `skills/_shared/sdr-phase-common.md`.

`next_recommended` MUST be `explore` when the founder brief is sufficient.

## Rules

- Do not conduct full market research in init.
- Do not block automatic mode unless the idea lacks a product category, target user, or problem statement.
- Use project-scoped agent keys only: `sdr/{project}/agents/{agent}/{artifact}`.
