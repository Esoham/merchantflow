# MVP architecture

```text
Shopify Admin (embedded MerchantFlow UI / App Bridge)
  -> React Router loader/action (Shopify-authenticated backend)
  -> Shopify GraphQL Admin API (read_orders, inventory scopes as needed)
  -> Normalize order + fulfillment + location inventory data
  -> Pure risk engine: src/risk-engine.mjs
  -> Exception queue rendered in app
  -> Prisma session/issue status database (shop ID + order ID + status)
```

## Trust boundaries
- Shopify access tokens exist **server-side only** in the session store.
- Never put OAuth secrets, tokens, environment variables or merchant PII into repository or browser.
- Verify shop session through official `authenticate.admin(request)`.
- Input is the authenticated shop, not a user-provided shop URL.
- Start with read-only Shopify API scopes; app's internal issue-status writes do not mutate Shopify orders.
- Uninstall/delete webhooks and retention need implementation before production distribution.

## Data shapes
```ts
type NormalizedOrder = {
  id: string;
  createdAt: string; // ISO8601
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partial';
  requiredQuantity: number;
  availableQuantity: number | null; // null = unknown
  inventoryTracked: boolean;
  manualAttention: boolean;
}
type IssueStatus = 'open' | 'reviewing' | 'resolved';
```

## Integration sequence
1. Use Shopify CLI's **official** React Router template (do not manually improvise OAuth).
2. Run `shopify app dev` and install on a selected dev store.
3. Query current granted access scopes and show an error if permissions are missing.
4. Implement paginated order reads and inventory joins by fulfillment location.
5. Use an adapter that never assumes unavailable inventory equals zero.
6. Store status keyed by shop + Shopify order ID.
7. Add unit, integration, accessibility and browser tests.

## Architecture decisions
- Rules before AI: debuggability and trust.
- Server side Shopify Admin API: secrets stay out of browser.
- Synthetic fixture mode separately labeled: app remains demonstrable without actual merchant data.
- GitHub Pages hosts standalone concept demo only. Authenticated Shopify app requires a server deployment.
