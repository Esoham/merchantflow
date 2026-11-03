# MerchantFlow

**Merchant operations intelligence for Shopify.** A product-management portfolio app that prioritizes fulfillment exceptions and shows why an order needs attention.

## Project status

- [x] Product discovery hypothesis and MVP scope documented
- [x] Deterministic exception-scoring engine and automated tests committed
- [x] Standalone prototype: https://esoham.github.io/projects/merchantflow/
- [ ] Official Shopify React Router scaffold created locally
- [ ] Development store and app credentials linked
- [ ] Live Shopify order/inventory integration
- [ ] Embedded app usability tests and deployment

**Important:** The standalone prototype uses synthetic data. This repository is a starter implementation and documentation, *not yet a connected Shopify app*.

## Setup (Shopify integration)

Install Node.js and Git, then use Shopify's official CLI to scaffold the authenticated application. Do **not** copy a hand-written authentication layer.

```bash
git clone https://github.com/Esoham/merchantflow.git
cd merchantflow
npm init @shopify/app@latest
# Select React Router and generate into a temporary folder if the CLI asks.
# Move or merge the official generated app files into this repo; preserve docs/ and src/.
npm install
shopify app dev
```

Alternatively scaffold in a new directory using `shopify app init` first and then copy the resulting official template files into this repository. During setup select your developer organization and development store. The official CLI generates OAuth/session configuration, embedded navigation, and Shopify app configuration. Never commit `.env`, tokens, or client secrets.

Documentation: https://shopify.dev/docs/apps/build/scaffold-app

## Core engine

`src/risk-engine.mjs` is a pure JavaScript module with a normalized order contract. It does not need Shopify credentials.

```bash
node --test
```

The Shopify adapter will normalize GraphQL orders, fulfillments and inventory per location into the engine's inputs. Server-side routes should call `authenticate.admin(request)` from the official scaffold and query GraphQL through the authenticated admin client.

See `docs/PRD.md`, `docs/ARCHITECTURE.md`, and `docs/DISCOVERY.md`.

## Privacy and limitations

Read-only Shopify actions in MVP; never mutate real orders or inventory. Store only shop and order IDs plus issue workflow metadata. Do not ingest customer email, name, or address for exception scoring. Inventory in the v0.1 demo is simplified to one location and must be revised for multi-location stores.
