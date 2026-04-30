---
name: sdr-openspec-convention
description: Filesystem persistence convention for SDR openspec and hybrid modes.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
---

# SDR OpenSpec Convention

Use `openspec/sdr/{project}/` as the single canonical filesystem root for SDR artifacts.

Do not write SDR phase artifacts to `openspec/research/`, `openspec/projects/`, or `sdr/projects/`.

Required tracked phase files when running in `openspec` or `hybrid` mode:

- `init.md`
- `explore.md`
- `proposal.md`
- `spec.md`
- `design.md`
- `tasks.md`
- `verify-report.md`
- `source-of-truth.md`

Raw external research dumps and local experiments remain ignored under `research/`; durable SDR methodology belongs in tracked skills, shared contracts, or README documentation.

`design.md` is mandatory. It contains technical architecture and, when the product has UI/frontend scope, may embed the professional UI/UX `DESIGN.md` contract. Use an optional `ui-design.md` only when the store/user explicitly asks to split the UI design contract or the UI system is large enough to warrant a separate artifact; the canonical `design.md` must still reference it and preserve traceability.
