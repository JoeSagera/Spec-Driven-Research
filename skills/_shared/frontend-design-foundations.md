---
name: sdr-frontend-design-foundations
description: Frontend design quality checks for SDR design agents producing UI/UX contracts.
license: MIT
metadata:
  author: JoeSagera
  version: "1.0"
---

# Frontend Design Foundations

Use these checks when an SDR project includes UI/frontend scope. The goal is not decoration; the goal is a coherent product interface that a coding agent can implement without generic AI-design drift.

## Foundation Checks

- **Visual hierarchy**: Define the primary user action and information priority per screen. Use size, contrast, spacing, grouping, and placement intentionally.
- **Typography**: Choose a readable type stack, explicit scale, weights, line heights, max line lengths, and microcopy tone. Do not leave typography as "use a clean font."
- **Color**: Commit to a palette with exact hex values, semantic roles, contrast targets, and state colors. Avoid random gradients, low-contrast gray text, and decorative accent overuse.
- **Spacing and layout**: Define spacing scale, responsive containers, grid/gutters, density, empty states, overflow behavior, and mobile safe-area handling.
- **Forms**: Specify labels, help text, validation timing, error copy, submit behavior, loading/disabled states, and recovery paths.
- **Interaction states**: Cover default, hover, active, focus-visible, selected, disabled, loading, success, error, empty, and skeleton states where relevant.
- **Accessibility**: Require semantic HTML, keyboard support, focus-visible styling, contrast, form announcements, alt text, zoom/content expansion, and reduced-motion support.
- **Responsive behavior**: Explain how hierarchy changes across mobile/tablet/desktop. Name breakpoints and what reflows, collapses, or becomes progressive disclosure.
- **Motion**: Use motion for feedback and continuity only. Specify durations/easing and `prefers-reduced-motion`; never approve `transition: all`.
- **Component boundaries**: Define reusable component anatomy, variants, props/slots, composition rules, and when not to create a new component.
- **Design debt cleanup**: In brownfield projects, identify inconsistent tokens/components and require cleanup tasks before layering new patterns on top.

## Anti-Generic AI Design Guidance

A professional UI design must choose a direction. Ban vague instructions such as "modern, clean, intuitive" unless they are backed by tokens, concrete layout rules, component anatomy, and product-specific rationale. If the design could apply unchanged to any SaaS dashboard, it is not specific enough for `GO`.
