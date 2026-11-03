# MerchantFlow — Product strategy v1

## Vision
Make daily fulfillment exception management understandable and actionable for small commerce operations teams.

## Positioning
For small operations teams that manually inspect orders and stock, MerchantFlow is an explainable exception queue that prioritizes orders needing investigation. Unlike a generic reporting dashboard, it pairs every flag with a reason, next action and review status.

## Product principles
1. Show evidence for every alert.
2. Prefer fewer trustworthy flags over more speculative ones.
3. Keep merchant data minimal and local in demo mode.
4. Make the next action obvious.
5. Measure tasks completed, not vanity metrics.

## Personas (unvalidated hypotheses)
- Owner/operator: wants to quickly identify the one issue that can hurt customer trust.
- Operations coordinator: needs to prioritize issues across picking, shipping and replenishment.

## Opportunity tree
Outcome: lower time-to-identify an actionable exception.
- Opportunity: orders can become overdue without being noticed.
  - Solution: age-based exception queue.
- Opportunity: available stock may not cover outstanding demand.
  - Solution: location-aware shortage signals (future).
- Opportunity: team members duplicate work on the same issue.
  - Solution: shared assignment and issue history (future).

## Prioritization decisions
**Now:** explainable risk rules, searchable queue, review statuses, testable normalization.
**Next:** reliable inventory data, shared persistence, bulk triage, instrumentation.
**Later:** notifications, configurable thresholds, AI assistance if users demonstrate need.

## North-star proxy and guardrails
Primary: median seconds to correctly identify the highest-priority actionable exception in usability tests.
Guardrails: false-positive rate, comprehension of alert reason, keyboard accessibility, time spent per issue.
These are proposed metrics. No actual measured results yet.

## Product trade-offs
- Rules rather than AI: interpretable, testable and no external dependency.
- Simulated data rather than a Shopify API: independent demos and no credentials.
- Browser-local persistence for prototype: fast iteration, but no team collaboration.
- Inventory quantity simplified for prototype: must not be presented as accurate multi-location inventory.

## Decision record
2026-11-03: Decoupled product from Shopify. Reason: product ownership and portfolio evidence do not require third-party APIs. Retain optional future adapter but do not make it an MVP dependency.
