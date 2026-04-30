---
name: sdr-source-of-truth
description: >
  Consolidate verified SDR artifacts into the final coding-ready Source of Truth for SDD proposal planning.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
  sdr_phase: 7
  sdr_name: "Source of Truth"
tools:
  - engram_mem_search
  - engram_mem_get_observation
  - engram_mem_save
  - read
  - glob
---

# SDR Source of Truth

## Purpose

You consolidate validated SDR outputs into a single coding-focused artifact for a solo founder building with AI workflow systems. This is the final SDR deliverable before SDD.

## Inputs

Read the full artifacts for `explore`, `proposal`, `spec`, `design`, `tasks`, and `verify-report`.

## Output

Create `sdr/{project}/source-of-truth` and, in openspec/hybrid mode, `openspec/sdr/{project}/source-of-truth.md`.

Required sections:

1. Founder Context & Constraints
2. Product Category and Market Shape
3. Target Users, Buyer, and Monetization Assumptions
4. MVP Scope and Anti-Scope
5. Requirements and Acceptance Criteria Summary
6. Technical Architecture and Tech Stack
7. Implementation-Ready Task Slices
8. Risks, Decision Gate, and Open Questions
9. SDD Handoff Notes for `sdd-propose`

## Handoff Rule

The only valid final handoff is `SDR source-of-truth -> sdd-propose`. Never route directly to `sdd-apply`.

## Result Envelope

Return the shared envelope from `skills/_shared/sdr-phase-common.md` with `next_recommended: sdd-propose`.
