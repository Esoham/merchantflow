# MerchantFlow

**An independent operations intelligence product** for small fulfillment teams. MerchantFlow detects fulfillment risks, explains their causes, and supports a review-and-resolution workflow.

**Quick assessment for recruiters:** [Try the browser prototype](https://esoham.github.io/projects/merchantflow/) to review a fictional fulfillment queue, then inspect the [PRD](docs/PRD.md), [core code](src/), and [automated tests](test/). This demonstrates a problem-to-prototype workflow spanning product thinking, operations, implementation, and QA. **No real customer validation or production outcomes are claimed.**

[**Open the live interactive prototype**](https://esoham.github.io/projects/merchantflow/) · [Product strategy](docs/PRODUCT_STRATEGY.md) · [Roadmap](docs/RELEASE_PLAN.md) · [QA report](docs/QA_REPORT.md)

## Why this product exists

Small operations teams may have to inspect order age, stock and fulfillment status separately to spot problems. MerchantFlow tests the hypothesis that an explainable, prioritized exception queue makes triage faster and more reliable.

This is an **independent portfolio project**. It does **not** require Shopify, external APIs, OAuth credentials, or paid services.

## What works today

- Interactive public demo with eight **synthetic** orders.
- Rule-based flags for shortages, overdue fulfillment, and manual attention.
- Priority ordering, human-readable explanations, and recommended next steps.
- Search, status filters, and review/resolution changes.
- Browser-local persistence and reset.
- Standalone risk engine and automated unit tests.
- Product requirements, strategy, roadmap, discovery and QA artifacts.

## Quick start

Requires Node.js 20+ only. No dependencies or tokens are required to run the core tests.

```bash
git clone https://github.com/Esoham/merchantflow.git
cd merchantflow
npm test
```

To try the user interface, open the [live prototype](https://esoham.github.io/projects/merchantflow/). Its current browser implementation lives in the [portfolio repository](https://github.com/Esoham/Esoham.github.io/tree/main/projects/merchantflow); this repository holds the product engine, tests and PM documentation.

## Current release status

| Workstream | Status |
| --- | --- |
| Problem hypothesis and product strategy | Documented, not customer-validated |
| Browser prototype | Published; basic interaction confirmed by owner |
| Risk-engine tests | Committed; passing CI not yet verified |
| Detailed browser QA | Pending |
| Usability sessions with other users | Pending |
| Shared multi-user backend | Future |
| Evidence-based product iteration | Pending |

## Product management artifacts

- [PRD](docs/PRD.md)
- [Product strategy and trade-offs](docs/PRODUCT_STRATEGY.md)
- [Delivery plan and prioritized backlog](docs/RELEASE_PLAN.md)
- [Usability test script](docs/USABILITY_TEST.md)
- [QA evidence log](docs/QA_REPORT.md)
- [Architecture](docs/ARCHITECTURE.md)

## Scope and limitations

The demo uses fictional data and saves workflow status in the local browser only; it is **not** a production multi-user system. The risk weights are hypotheses. The prototype's simplified inventory model does not account for multiple warehouse locations. No customer interviews, adoption figures or productivity improvements are claimed.

An optional Shopify adapter remains in `src/shopify/` as a technical experiment; it is **not** required for the product roadmap.

## Next milestone: v0.2

Verify automated test runs, complete search/filter/persistence/accessibility QA, document defects, and improve the interface based on observed issues. Then conduct structured usability sessions and publish a product case study with actual evidence.
