# MerchantFlow — independent prototype architecture

**Product owner:** Esoham Abalo  
**Status:** Browser prototype published; architecture verification and QA in progress.

## Current system (implemented prototype)

```text
Synthetic order fixtures
  -> Browser-based deterministic exception scoring
  -> Prioritized exception queue and reasons
  -> Search and status filtering
  -> Review / resolve workflow
  -> localStorage for same-browser workflow state
```

**Live prototype:** https://esoham.github.io/projects/merchantflow/  
**Browser source:** https://github.com/Esoham/Esoham.github.io/tree/main/projects/merchantflow

A standalone rules engine lives at `src/risk-engine.mjs` in this repository with unit tests in `test/`. The current browser implementation also contains scoring logic; connecting the browser to the same tested module is a **planned consistency improvement**, not yet a completed integration.

## Data contract

```ts
type NormalizedOrder = {
  id: string;
  createdAt: string;
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partial';
  requiredQuantity: number;
  availableQuantity: number | null; // null = unknown
  inventoryTracked?: boolean;
  manualAttention?: boolean;
};
type IssueStatus = 'open' | 'reviewing' | 'resolved';
```

## Key decisions and trade-offs

- **Independent product:** no external credentials, OAuth, or paid APIs required.
- **Explainable rules:** operators can see why an exception was raised.
- **Synthetic data:** enables public demos without exposing customer information.
- **Browser-local state:** low-cost prototype, but not suitable for multi-user collaboration.
- **Simplified stock model:** does not model multi-location inventory and must not be described as production inventory accuracy.

## Trust boundaries

No customer personal data or API secrets are required. Browser state belongs to the current browser profile and should not be treated as secure shared storage. The prototype is not a production order-management system.

## Planned evolution (not implemented)

1. Align browser scoring with the tested risk engine.
2. Add structured browser QA, keyboard accessibility and error-state tests.
3. Evaluate whether shared ownership is necessary through user research.
4. If justified, add an authenticated backend, shared database, audit trail and permissions.

An optional legacy Shopify integration sketch exists separately in `docs/SHOPIFY-INTEGRATION.md`. It is **out of scope** for the independent product and does not describe the current architecture.
