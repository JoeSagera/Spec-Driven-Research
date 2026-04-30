---
name: sdr-design-md-template
description: Shared DESIGN.md template for UI/UX design-system contracts in SDR design artifacts.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
---

# DESIGN.md Contract Template

`DESIGN.md` is the semantic UI source of truth for AI agents. It is not a Figma replacement and does not try to encode every pixel of a mockup. Its job is to make visual intent, interaction rules, accessibility expectations, and implementation handoff constraints explicit enough that coding agents can produce consistent UI without inventing a generic look.

Use exact values **and** descriptive language: hex colors, type sizes, spacing units, radii, shadows, durations, breakpoints, and semantic roles must be paired with the mood, hierarchy, and rationale behind them.

## UI/UX Design System Contract Template

```markdown
# DESIGN.md: {Product Name}

## Product Design Intent

- Product promise: {what the interface must make users feel/do}
- Primary users and context: {who, device, environment, urgency}
- Design success criteria: {measurable UX quality bars}
- Traceability: {proposal goals / spec requirements this design supports}

## Visual Theme & Atmosphere

Describe the aesthetic direction in plain language. Avoid generic terms alone: pair them with concrete choices.

- Atmosphere: {e.g., calm clinical precision, high-trust financial control}
- Brand posture: {premium / pragmatic / playful / technical / editorial}
- Anti-generic constraint: {what this product must NOT look like}

## Visual Hierarchy

- Primary focus per screen: {what gets visual weight first}
- Hierarchy tools: {scale, contrast, whitespace, grouping, density}
- Content priority rules: {what can collapse, defer, or move on small screens}

## Color Palette & Semantic Roles

| Role | Token | Hex | Usage | Contrast Requirement |
|------|-------|-----|-------|----------------------|
| Background | `--color-bg` | `#...` | {where used} | {AA/AAA target} |
| Surface | `--color-surface` | `#...` | {cards/panels} | {target} |
| Text Primary | `--color-text` | `#...` | {body/headings} | {target} |
| Accent | `--color-accent` | `#...` | {CTA/focus/brand} | {target} |
| Success | `--color-success` | `#...` | {positive state} | {target} |
| Warning | `--color-warning` | `#...` | {caution state} | {target} |
| Danger | `--color-danger` | `#...` | {destructive/error} | {target} |

## Typography Rules

- Font families: {primary, fallback stack}
- Type scale: {h1/h2/h3/body/small with px/rem, line-height, weight}
- Reading rules: {max line length, capitalization, numeric alignment}
- Tone of microcopy: {direct, warm, technical, reassuring}

## Spacing, Layout & Responsive Grid

- Spacing scale: {e.g., 4/8/12/16/24/32/48/64px}
- Container widths: {mobile/tablet/desktop max widths}
- Grid: {columns/gutters/breakpoints}
- Safe areas and overflow: {mobile safe-area handling, long-content rules}

## Component Styling & Anatomy

For each core component, define anatomy, geometry, states, and constraints.

### {Component Name}

- Anatomy: {slots/parts}
- Shape: {radius, borders, density}
- Default styling: {colors, spacing, typography}
- Variants: {primary/secondary/destructive/etc.}
- Responsiveness: {mobile/desktop behavior}
- Traceability: {REQ/goal IDs supported}

## Depth & Elevation

- Surface hierarchy: {page background, panels, cards, overlays, modals}
- Shadow system: {none/subtle/strong, exact values, color tint, use cases}
- Border and divider strategy: {when to separate with lines vs. whitespace}
- Layering rules: {z-index/layer order, sticky regions, drawers, dialogs}
- Restraint rule: elevation must communicate hierarchy or interaction, never decoration alone.

## Forms & Validation

- Label placement and required/optional indicators
- Help text, inline validation, summary validation
- Error language: {specific, actionable, non-blaming}
- Keyboard order and submit behavior
- Loading, disabled, dirty, saved, and retry states

## Interaction States

Define visible states for interactive components: default, hover, active, focus-visible, selected, disabled, loading, empty, error, success, skeleton, offline/retry where relevant.

## Motion & Reduced Motion

- Motion purpose: {feedback, continuity, hierarchy — never decoration only}
- Durations/easing: {e.g., 120ms ease-out, 180ms ease-in-out}
- Reduced motion: respect `prefers-reduced-motion`; provide non-motion alternatives
- Rule: never use `transition: all`

## Accessibility Gate

- Semantic HTML and landmark expectations
- Keyboard navigation and focus-visible requirements
- ARIA usage only when native semantics are insufficient
- Color contrast targets
- Alt text rules
- Forms, error announcement, and screen-reader feedback
- Internationalization, content expansion, and zoom behavior

## Design Tokens

```css
:root {
  --color-bg: #...;
  --color-surface: #...;
  --color-text: #...;
  --space-1: 4px;
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.08);
  --motion-fast: 120ms;
}
```

## Do / Don't Guardrails

| Do | Don't | Why |
|----|-------|-----|
| {specific rule} | {specific anti-pattern} | {rationale} |

## Agent Prompt Guide / Implementation Handoff

- Use these tokens and components before inventing new styles.
- Preserve traceability from UI elements to requirements.
- If a screen/component lacks states, accessibility behavior, or responsive rules, stop and return `ADJUST` rather than guessing.
- Handoff constraints: {framework, component library, files/modules if brownfield}
```
