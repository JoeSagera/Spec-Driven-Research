---
title: SDR Agents Reference
description: Reference for SDR support agents and their bounded outputs.
license: MIT
metadata:
  author: JoeSagera
---

# SDR Agents Reference

The 8 specialized research agents in the Spec-Driven Research (SDR) framework. Each agent has a distinct role, produces structured outputs, and saves findings to project-scoped Engram keys.

Canonical decision vocabulary for all agent outputs is `GO | ADJUST | NO-GO`. Legacy phrases such as “proceed,” “pivot,” or “caution” must be mapped into that vocabulary before phase results are returned.

Agent artifacts must use `sdr/{project}/agents/{agent}/{artifact}`.

> **Usage:** The SDR Orchestrator delegates to these agents automatically during the `design` and `tasks` phases. You do not invoke them directly — but understanding what each produces helps you interpret results and ask better questions.

---

## Agent Overview

| # | Agent | Core Question | When to Use |
|---|-------|-------------|-------------|
| 1 | [Market Intelligence](#1-market-intelligence-agent) | "How big is the opportunity?" | Any new market, pricing, or segment decision |
| 2 | [Competitive Analysis](#2-competitive-analysis-agent) | "Who else is there and where is the white space?" | Before positioning, feature prioritization, or launch |
| 3 | [Data Science](#3-data-science-agent) | "What does the data actually say?" | When you have datasets, need experiments, or want causality |
| 4 | [Technical Viability](#4-technical-viability-agent) | "Can we build and scale this?" | Before committing to a stack, architecture, or integration |
| 5 | [Go-to-Market](#5-go-to-market-agent) | "How do we launch and acquire customers?" | When product is nearing readiness or re-launching |
| 6 | [Growth & Analytics](#6-growth--analytics-agent) | "How do we measure and optimize growth?" | Post-launch, or when defining metrics before building |
| 7 | [Financial Projections](#7-financial-projections-agent) | "Do the numbers work?" | Before fundraising, budgeting, or pricing changes |
| 8 | [Validation](#8-validation-agent) | "Is the whole plan coherent?" | After all other agents have run; final gate before execution |

---

## 1. Market Intelligence Agent

### Role
Senior market research analyst specializing in TAM/SAM/SOM sizing, industry trends, macro factors, and entry timing.

### When to Use
- Entering a new market or segment
- Evaluating market timing (too early / too late)
- Building investor pitch deck market slides
- Assessing regulatory or macro risks

### Inputs
- Target industry or segment description
- Geography scope
- Known competitors (optional)
- Pricing assumptions (for bottom-up sizing)

### Outputs

| Section | Content |
|---------|---------|
| Executive Summary | Market attractiveness + confidence level |
| Market Size | TAM / SAM / SOM with methodology and confidence |
| Trend Analysis | Emerging, declining, and disruptive trends |
| Macro Factors | PESTLE scan with risk levels |
| Timing & Window | Recommended entry timing with justification |
| Data Gaps | Assumptions needing validation |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Market sizing | `market-intelligence/tam-sam-som` | `discovery` |
| Trends | `market-intelligence/trends` | `discovery` |
| Macro risks | `market-intelligence/macro-risks` | `discovery` |
| Timing | `market-intelligence/timing` | `decision` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| TAM | > $500M | Minimum for venture-scale |
| SOM (Year 3) | > $10M | Achievable revenue target |
| Trend alignment | 3+ high-impact trends | Momentum validation |
| Macro risk | No critical risks | Avoid show-stoppers |
| Timing | Now or 6-12 months | Actionable window |

**Verdict rule:** 4/5 met → **GO** | 3/5 met → **ADJUST** | <3 → **NO-GO**

---

## 2. Competitive Analysis Agent

### Role
Strategic product intelligence specialist. Maps competitors, constructs feature matrices, identifies positioning gaps, and recommends differentiation.

### When to Use
- Before defining positioning or messaging
- When competitors launch new features
- During feature prioritization debates
- When entering a crowded category

### Inputs
- Product description and target segment
- Known competitor list (or agent discovers them)
- Your current or planned capabilities
- Pricing model (if known)

### Outputs

| Section | Content |
|---------|---------|
| Landscape Overview | Direct/indirect competitors, market concentration |
| Feature Matrix | 5-8 competitors × 10-20 capabilities |
| Gap Analysis | Feature, segment, and pricing whitespace |
| Positioning Recommendation | Recommended angle + segments to avoid/prioritize |
| Moat Assessment | Current score (1-10) + path to stronger defensibility |
| Risk Factors | Incumbent response threats, fast-follower risk |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Landscape | `competitive-analysis/landscape` | `discovery` |
| Feature matrix | `competitive-analysis/feature-matrix` | `discovery` |
| Gaps | `competitive-analysis/gaps` | `discovery` |
| Positioning | `competitive-analysis/positioning` | `decision` |
| Moat | `competitive-analysis/moat` | `decision` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| Differentiation clarity | 3+ clear gaps vs. top 2 | Must be distinguishable |
| Beachhead viability | Segment with <3 strong competitors | Room to establish |
| Moat potential | Score ≥ 5/10 with path to 7+ | Long-term viability |
| Incumbent response risk | Not "outspend" from dominant player | Survival probability |
| Pricing fit | Within ±30% of market median | Avoids extreme positioning |

**Verdict rule:** 4/5 met → **GO** | 3/5 → **ADJUST** | <3 → **NO-GO**

---

## 3. Data Science Agent

### Role
Senior quantitative researcher. Validates datasets, designs experiments, tests hypotheses, and builds predictive models with uncertainty quantification.

### When to Use
- You have a dataset and need rigorous analysis
- Running A/B tests or quasi-experiments
- Need causal inference (not just correlation)
- Building predictive models for conversion, churn, etc.

### Inputs
- Dataset description (source, size, features, target variable)
- Business question to answer
- Known biases or data quality issues (if any)
- Success criteria (e.g., "predict conversion with AUC > 0.75")

### Outputs

| Section | Content |
|---------|---------|
| Question & Hypothesis | H₀ and H₁ with success criteria |
| Dataset Validation | Completeness, bias, leakage, temporal coverage |
| Methodology | Analysis type, model, validation approach |
| Results | Findings with significance, effect sizes, confidence intervals |
| Model Summary | Metrics vs. benchmarks, calibration, interpretability |
| Limitations | Data gaps, model limits, generalizability concerns |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Datasets | `data-science/datasets` | `discovery` |
| Hypotheses | `data-science/hypotheses` | `discovery` |
| Models | `data-science/models` | `discovery` |
| Causal inference | `data-science/causal-inference` | `discovery` |
| Uncertainty | `data-science/uncertainty` | `discovery` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| Data quality | No high-severity issues | Garbage in, garbage out |
| Statistical significance | p < 0.05 or BF > 3 | Evidence-based claims |
| Effect size | Practically meaningful | Statistical ≠ important |
| Model performance | Beats baseline/benchmark | Value add |
| Uncertainty bounded | CI reported and acceptable | Decision-ready |

**Verdict rule:** 4/5 met → **GO** | 3/5 → **ADJUST** | <3 → **NO-GO**

---

## 4. Technical Viability Agent

### Role
Principal engineer and systems architect. Evaluates whether the product can be built, integrated, and scaled with available resources.

### When to Use
- Choosing a technology stack
- Evaluating integration complexity (APIs, vendors)
- Assessing scalability before launch
- Security or compliance readiness reviews

### Inputs
- Product description and key features
- Expected load (users, requests, data volume)
- Team size and capabilities
- Compliance requirements (SOC2, GDPR, HIPAA, etc.)
- Preferred stack constraints (if any)

### Outputs

| Section | Content |
|---------|---------|
| Architecture Overview | Component diagram (textual), data flow |
| Stack Recommendation | Per-component recommendation with alternatives and rationale |
| Scalability Assessment | Current load, Year 1/3 projections, first bottleneck |
| Integration Complexity | Effort, risk, vendor lock-in, docs quality per dependency |
| Security & Compliance | Data sensitivity classification, gap analysis |
| Complexity & Risk | Overall risk level, PoT recommendations, team match |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Stack | `technical-viability/stack` | `decision` |
| Architecture | `technical-viability/architecture` | `decision` |
| Scalability | `technical-viability/scalability` | `discovery` |
| Integrations | `technical-viability/integrations` | `discovery` |
| Security | `technical-viability/security` | `discovery` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| Stack maturity | Production-proven | Stability |
| Scalability path | Clear path to 10× without re-architecture | Growth readiness |
| Integration risk | No critical-risk integrations | Avoid blockers |
| Security gaps | All high gaps have remediation plan | Compliance |
| Team match | Adequate or Strong | Execution feasibility |

**Verdict rule:** 4/5 met → **GO** | 3/5 → **ADJUST** | <3 → **NO-GO**

---

## 5. Go-to-Market Agent

### Role
Seasoned growth strategist and product marketer. Designs launch strategies, selects channels, plans content, and sequences market entry.

### When to Use
- Product is nearing launch or re-launch
- Entering a new geography or segment
- Evaluating channel mix and CAC projections
- Designing pricing and packaging changes

### Inputs
- Target audience (ICP) and segment
- Product readiness level (MVP, beta, GA)
- Known or preferred channels
- Competitive positioning (from Competitive Analysis agent)
- Budget constraints (if any)

### Outputs

| Section | Content |
|---------|---------|
| GTM Strategy Summary | Launch tier, primary objective, success metric |
| Channel Strategy | Per-channel CAC, payback period, scalability, priority |
| Launch Sequence | Milestones with dates, owners, dependencies, criteria |
| Content Plan | Hero / hub / hygiene content pyramid |
| Messaging Hierarchy | Value prop, pillars, proof points, differentiators |
| Partnership Opportunities | Integration or distribution partners with value/effort |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Channels | `go-to-market/channels` | `decision` |
| Launch plan | `go-to-market/launch-plan` | `decision` |
| Content | `go-to-market/content` | `decision` |
| Messaging | `go-to-market/messaging` | `decision` |
| Partnerships | `go-to-market/partnerships` | `discovery` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| Channel clarity | ≥2 validated channels with known CAC | Diversification |
| Launch readiness | All P0 dependencies met | Execution |
| Message differentiation | Clear vs. top 2 competitors | Conversion |
| Content coverage | Hero + hub defined for launch | Awareness |
| Partnership pipeline | ≥1 active discussion | Distribution |

**Verdict rule:** 4/5 met → **LAUNCH** | 3/5 → **LAUNCH WITH LIMITED SCOPE** | <3 → **DELAY LAUNCH**

---

## 6. Growth & Analytics Agent

### Role
Growth engineer and analytics architect. Designs measurement frameworks, optimizes acquisition and retention loops, and builds data infrastructure for continuous improvement.

### When to Use
- Defining metrics before building (North Star, KPI tree)
- Post-launch optimization
- SEO technical audits
- Retention and churn analysis
- Experimentation program design

### Inputs
- Business model (SaaS, marketplace, consumer, etc.)
- Current metrics (if any)
- Growth goals (e.g., "double MRR in 6 months")
- Available data sources

### Outputs

| Section | Content |
|---------|---------|
| Measurement Framework | North Star metric, input metrics, lagging indicators, vanity metrics to avoid |
| KPI Dashboard | Current estimates, 90-day and 1-year targets, owners |
| SEO Strategy | Technical health score, priority fixes, keyword strategy |
| Retention & Churn | Cohort patterns, leading indicators, churn risk signals, win-back sizing |
| Growth Loops | Viral, content, paid, product loops with strength and investment needed |
| Experimentation Backlog | Prioritized experiments with hypothesis, impact, effort, duration |
| CRM & Automation | Lifecycle stages, automated touchpoints, personalization variables |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Metrics | `growth-analytics/metrics` | `decision` |
| SEO | `growth-analytics/seo` | `discovery` |
| Retention | `growth-analytics/retention` | `discovery` |
| Loops | `growth-analytics/loops` | `decision` |
| Experiments | `growth-analytics/experiments` | `discovery` |
| CRM | `growth-analytics/crm` | `decision` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| Metrics clarity | North Star + 3+ input metrics defined | Focus |
| SEO health | No critical technical blockers | Discoverability |
| Retention pattern | D30 retention > 15% or improving | Product-market fit signal |
| Growth loops | ≥1 loop with positive unit economics | Sustainable growth |
| Experiment pipeline | ≥3 prioritized experiments | Velocity |

**Verdict rule:** 4/5 met → **SCALE** | 3/5 → **OPTIMIZE** | <3 → **FOUNDATION BUILDING**

---

## 7. Financial Projections Agent

### Role
Financial analyst and startup CFO advisor. Models unit economics, forecasts revenue and costs, analyzes burn and runway, and evaluates funding readiness.

### When to Use
- Preparing for fundraising (seed, Series A, B)
- Evaluating pricing changes
- Assessing unit economics health
- Budget and headcount planning
- Scenario and sensitivity analysis

### Inputs
- Business model type (SaaS, marketplace, consumer, etc.)
- Current stage (pre-revenue, early revenue, scaling)
- Known unit economics (CAC, conversion rate, churn, ARPU)
- Team size and burn rate (if any)
- Cash on hand and fundraising timeline

### Outputs

| Section | Content |
|---------|---------|
| Financial Summary | Business model, stage, one-sentence viability headline |
| Unit Economics | CAC, LTV, LTV/CAC, payback, gross margin, NRR with benchmarks |
| Revenue Forecast | 24-36 month MRR/ARR table |
| Cost Structure & Burn | R&D, S&M, G&A, COGS with trends |
| Runway Analysis | Months of runway, cash-out date, funding needed |
| Scenario Analysis | Upside, base, downside with probabilities and triggers |
| Sensitivity Table | Month 24 ARR sensitivity to CAC, conversion, churn ±20% |
| Funding Readiness | Milestone gap, recommended raise size and timing |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Unit economics | `financial-projections/unit-economics` | `decision` |
| Revenue forecast | `financial-projections/revenue-forecast` | `decision` |
| Burn & runway | `financial-projections/burn-runway` | `discovery` |
| Scenarios | `financial-projections/scenarios` | `decision` |
| Funding | `financial-projections/funding` | `decision` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| LTV/CAC | > 3.0 | Unit economics viability |
| Payback period | < 12 months | Cash efficiency |
| Gross margin | > 70% (SaaS) | Scalability |
| Runway | > 12 months | Survival buffer |
| Path to milestone | Clear with base case | Fundability |

**Verdict rule:** 4/5 met → **GO** | 3/5 → **ADJUST** | <3 → **NO-GO**

---

## 8. Validation Agent

### Role
Chief strategist and red team. Performs cross-phase consistency checks, synthesizes findings from all domain agents, assesses holistic risk, and delivers a final verdict.

### When to Use
- **Always last.** After Market Intelligence, Competitive Analysis, Data Science, Technical Viability, Go-to-Market, Growth & Analytics, and Financial Projections have all run.
- Before committing significant resources to execution.
- When conflicting signals emerge from domain agents.

### Inputs
- Outputs from all other agents (retrieved from Engram)
- Project goals and constraints
- Risk appetite (aggressive / moderate / conservative)

### Outputs

| Section | Content |
|---------|---------|
| Synthesis Summary | One-paragraph narrative: what, for whom, why it wins, what could kill it |
| Cross-Phase Consistency Check | Matrix checking alignment across all agents (target segment, CAC, timeline, risk appetite) |
| Assumption Register | All key assumptions with source, confidence, impact-if-wrong, mitigation, owner |
| Risk Heat Map | Aggregated risks across domains with likelihood, impact, trend, status |
| Pre-Mortem | Failure story in past tense with root causes and early warning signals |
| Verdict & Conditions | Final verdict (GO / ADJUST / NO-GO) with conditions and triggers |
| Escalation & Review Plan | Review cadence, metrics to watch, re-evaluation triggers |

### Engram Keys

| Artifact | Topic Key | Type |
|----------|-----------|------|
| Synthesis | `validation/synthesis` | `decision` |
| Consistency | `validation/consistency` | `discovery` |
| Assumptions | `validation/assumptions` | `discovery` |
| Risks | `validation/risks` | `discovery` |
| Verdict | `validation/verdict` | `decision` |
| Pre-mortem | `validation/premortem` | `discovery` |

### Decision Criteria

| Criterion | Threshold | Why It Matters |
|-----------|-----------|--------------|
| Consistency | All critical cross-phase checks pass | Plan coherence |
| Assumption solidity | No critical-impact assumptions at low confidence | Foundation strength |
| Risk profile | No critical risks with high likelihood | Survivability |
| Pre-mortem | Failure story has plausible path + early warnings | Paranoia calibration |
| Confidence calibration | Overall confidence justified by evidence | Avoid hubris |

**Verdict rule:** 4/5 met → **GO** | 3/5 → **ADJUST** | <3 → **NO-GO**

---

## Cross-Agent Consistency Checklist

Before calling the Validation Agent, verify these agents have produced artifacts:

```
✅ market-intelligence/tam-sam-som
✅ competitive-analysis/landscape
✅ competitive-analysis/feature-matrix
✅ data-science/datasets        (if applicable)
✅ technical-viability/stack
✅ technical-viability/scalability
✅ go-to-market/channels
✅ go-to-market/launch-plan
✅ growth-analytics/metrics
✅ growth-analytics/retention
✅ financial-projections/unit-economics
✅ financial-projections/revenue-forecast
```

Missing any of these? The Validation Agent will flag the gap and recommend which agent to re-run.

---

## How to Query Agent Outputs

```bash
# All artifacts for a specific agent
mem_search(query: "market-intelligence", project: "ai-contract-review")

# Specific artifact
mem_search(query: "market-intelligence/tam-sam-som")

# Full content of an artifact
mem_get_observation(id: {observation_id})
```

---

## Integration with SDD (Implementation)

SDR produces **research artifacts**. SDD produces **implementation plans**.

When research is complete and you want to build:

```
SDR Pipeline                           SDD Pipeline
──────────                             ──────────
init → explore → proposal → spec → design → tasks → verify → source-of-truth
                                                               │
                                                               └─ (handoff) → sdd-propose
                                                                                    │
                                                                                    └── sdd-orchestrator
```

The SDR `source-of-truth` artifact becomes pre-loaded context for `sdd-propose`. You don't lose any research context.

---

## File Reference

| File | Purpose |
|------|---------|
| `skills/SDR-QUICKSTART.md` | How to run SDR for the first time |
| `skills/SDR-AGENTS-README.md` | This file — agent capabilities and outputs |
| `skills/sdr-orchestrator/SKILL.md` | Orchestrator protocol and meta-commands |
| `skills/agents/market-intelligence.md` | Full agent skill definition |
| `skills/agents/competitive-analysis.md` | Full agent skill definition |
| `skills/agents/data-science.md` | Full agent skill definition |
| `skills/agents/technical-viability.md` | Full agent skill definition |
| `skills/agents/go-to-market.md` | Full agent skill definition |
| `skills/agents/growth-analytics.md` | Full agent skill definition |
| `skills/agents/financial-projections.md` | Full agent skill definition |
| `skills/agents/validation-agent.md` | Full agent skill definition |
