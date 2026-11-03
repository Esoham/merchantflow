# Shopify app integration implementation guide

## 1. Scaffold the official authenticated app locally

Start from a clone of this repository, but scaffold the Shopify React Router template in a **separate temporary directory**, to avoid overwriting existing files:

```bash
git clone https://github.com/Esoham/merchantflow.git
npm init @shopify/app@latest
# Name scaffold: merchantflow-shopify
# Choose: React Router app
# Run CLI authentication with your Shopify developer account
```

Copy Shopify-generated application files into the repository root while retaining `docs/`, `src/` and `test/`. If generated files overlap with files in this repo, inspect and merge them instead of replacing blindly. Commit generated sources but **never secrets or .env**.

Then inside the repository run `npm install` (if needed) and `npm run dev` / `shopify app dev` as directed by the scaffold. Select the *development* store you own.

Shopify CLI and template documentation: https://shopify.dev/docs/apps/build/scaffold-app

## 2. Declare permissions

For the first live iteration, start with `read_orders` only. Expand to `read_inventory` and `read_products` once inventory signals are implemented and documented. **Configuring a scope does not grant it**; merchants must authorize the app.

## 3. Minimal server-side query sketch

Use the official template server loader's authenticated admin client. The response uses recent orders and no customer personal information:

```ts
const {admin} = await authenticate.admin(request);
const response = await admin.graphql(`#graphql
  query MerchantFlowRecentOrders($first: Int!) {
    orders(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        cursor
        node {
          id
          createdAt
          displayFulfillmentStatus
          tags
          lineItems(first: 50) { nodes { quantity } }
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`, { variables: { first: 50 } });
if (!response.ok) throw new Response('Shopify API request failed', {status: 502});
const payload = await response.json();
if (payload.errors) throw new Response('Shopify GraphQL query failed', {status: 502});
const normalized = normalizeOrderConnection(payload.data.orders);
const issues = buildExceptionQueue(normalized);
```

**Boundaries of this example:** No pagination yet; orders with more than 50 line items are truncated. Only age-based and explicit tag-based rules are safe. Inventory remains **unknown** until a location-aware inventory implementation is completed. The app should display that limitation clearly.

## 4. Integration acceptance checklist

- Authenticated app opens in Shopify admin.
- A development store installs the app through official Shopify CLI.
- Validates granted `read_orders` scope.
- Returns 401/403 or understandable permission state when unauthorized.
- Lists at-risk orders without any customer PII.
- Does not confuse order age with promised ship date.
- Later: add cursor pagination, multi-location stock matching, persisted statuses, and webhook update handling.

## 5. Security

Never paste Shopify secrets into GitHub, ChatGPT, a screenshot, or browser code. Keep all admin access on the authenticated app server. Use synthetic data in portfolio demos unless expressly authorized to disclose merchant data.
