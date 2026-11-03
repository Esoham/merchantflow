# MerchantFlow Product Requirements Document

**Version:** 0.1 / planned Shopify MVP  
**Problem:** Shopify merchants need to quickly identify and act on delayed, unfulfilled or stock-constrained orders.

## Goals and non-goals
**Goal:** Explainable exception queue within an authenticated, embedded Shopify app, reducing time to detect and triage risky orders.

**Non-goals:** Automatically cancel or fulfill orders, adjust inventory, send customer communications, process payments, or ingest customer PII.

## P0 requirements
- Shopify app installation through the official React Router scaffold and OAuth/session handling.
- Server-side authenticated GraphQL Admin API reads with least-privilege scopes.
- Normalize recent order status, age and location-aware inventory into risk engine inputs.
- Prioritized issue queue with deterministic reason and recommended action.
- Persist issue statuses per shop/order in application database.
- Clear empty, loading and permission-error states.

## P1 requirements
- Filtering, full-text search over issue descriptions, and time-to-triage telemetry.
- Rule configuration and test harness.

## Initial scoring policy (hypotheses)
- Inventory insufficient relative to required amount: +60.
- Unfulfilled for 3–4 full days: +25; 5+ full days: +45.
- Explicit manual attention flag: +20.
- Score >=60: high; >=25: medium; otherwise low.
- Exclude fulfilled orders. Missing or untracked inventory is **unknown**, not zero.

## Acceptance criteria
1. No customer name, email or address is needed to compute scores.
2. Fulfilled orders do not appear in exception queue.
3. Shortages and overdue orders are flagged with explicit reasons.
4. Queue sorted descending by score; ties are deterministic.
5. Marked issue statuses persist across page reloads in production DB.
6. Revoked scopes show access errors instead of invented risk scores.
7. App is usable by keyboard and screen reader.
8. Demo data and real Shopify data are unmistakably labeled.

## Metrics
Primary: median seconds to identify first actionable exception in observed usability tests (hypothesized target <60 seconds). Supporting: test task success, recommendation comprehension, issue resolution time, percent of false alarms.

## Constraints
Real orders may be protected customer data. Validate Shopify protected-data rules. Default order access is typically restricted to recent history. Support multiple fulfillment locations and inventory availability semantics before claiming stock coverage.

## Release plan
1. Existing synthetic prototype and independent risk-engine unit tests.
2. Shopify CLI React Router scaffold + dev-store installation.
3. GraphQL adapter, SQLite for local sessions/status; Postgres for production.
4. Integration and accessibility tests, then deploy.
