# MerchantFlow — Product Requirements Document

**Version:** 0.2 (independent product)  
**Status:** Prototype published; verification and validation in progress  
**Owner:** Product portfolio project

## Problem and opportunity

Small commerce and warehouse operations teams may struggle to spot fulfillment delays and stock shortages across scattered operational records. MerchantFlow tests the hypothesis that a single, explainable exception queue improves the speed and accuracy of triage.

**Target user:** Small operations coordinator or owner-operator managing fulfillment issues. Personas are hypotheses; no completed merchant interviews are claimed.

## Product vision
Give operators one place to identify the most urgent order exceptions, understand why each was flagged, and track the action taken.

## MVP boundaries
- No Shopify account, OAuth, paid APIs, or third-party dependencies required.
- Fictional order data and deterministic risk rules.
- Prioritized exception list, search, status filtering, review/resolve workflow.
- Browser-local state persistence in v0.1; shared persistence is a future milestone.
- No automatic inventory or fulfillment changes.
- No customer personal information.

## User stories and acceptance criteria

| ID | Story | Acceptance |
|---|---|---|
| MF-01 | As an operator, I can see urgent exceptions first | Descending severity; stable tie ordering |
| MF-02 | I can understand why an order is flagged | Every alert displays reason and suggested next step |
| MF-03 | I can locate a particular exception | Search and status filters work together |
| MF-04 | I can track work in progress | Status can change to Open, Reviewing or Resolved |
| MF-05 | I can return to unfinished work | Status persists on refresh in the same browser |
| MF-06 | I can restart the demonstration | Reset clears local changes after confirmation |
| MF-07 | I can use the app without a mouse | Keyboard access and visible focus |
| MF-08 | I can trust the demo's scope | Synthetic-data and local-persistence limitations are explicit |

## Risk policy — provisional, not validated

- Available inventory below required quantity: +60.
- Unfulfilled for 3–4 full days: +25; 5+ days: +45.
- Manual attention: +20.
- High >=60, Medium >=25, otherwise Low.
- Fulfilled orders excluded. Unknown inventory must not be treated as zero.

These weights must be calibrated through real user feedback. The v0.1 browser demo simplifies inventory to a single available quantity.

## Nonfunctional requirements
- Accessible labels and focus states.
- Clear empty states, error handling and responsive layout.
- No secrets or customer personal data in the public demo.
- Automated tests for risk scoring, edge cases and ordering.
- Browser QA evidence recorded separately from committed test code.

## Product metrics
**Primary:** Median time for an observed participant to correctly identify the highest-priority actionable issue. Hypothesis target: under 60 seconds.

**Supporting:** Task success rate, alert explanation comprehension, false-positive feedback, resolution workflow completion.

No performance outcomes are claimed until measured.

## Release plan
- **v0.1:** Public synthetic-data prototype and independent rules engine — committed.
- **v0.2:** Execute CI and detailed browser QA; fix observed defects; improve accessibility and clarity.
- **v0.3:** Add shared backend persistence and audit history if validated as needed.
- **v1.0:** Conduct at least five structured usability tests, ship one evidence-based improvement, and publish a documented case study.

## Dependencies and exclusions
The core product is independent. A legacy optional Shopify adapter may remain as a technical experiment but is not part of the required roadmap. No integrations are necessary to evaluate the product.

## Open questions
1. Do operators find the queue useful without live order data?
2. Which risk signals are most trusted?
3. Do users understand the difference between an alert and a confirmed shortage?
4. Does shared ownership meaningfully improve resolution?

See [Product strategy](PRODUCT_STRATEGY.md), [Release plan](RELEASE_PLAN.md), [QA report](QA_REPORT.md), and [Usability protocol](USABILITY_TEST.md).
