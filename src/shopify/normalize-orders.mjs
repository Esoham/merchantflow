/**
 * Pure Shopify GraphQL response adapter (MVP: age/manual attention).
 * Live inventory shortage detection is DISABLED until a location-aware
 * inventory adapter is implemented. Unknown stock must never equal zero.
 *
 * GraphQL response fields:
 * orders.edges[].node.{id,createdAt,displayFulfillmentStatus,tags,
 *   lineItems.nodes[].quantity}
 */
const fulfilled = new Set(['FULFILLED']);
export function normalizeShopifyOrder(node) {
  if (!node || typeof node.id !== 'string' || !node.createdAt) {
    throw new TypeError('Invalid Shopify order node');
  }
  const fulfillmentStatus = fulfilled.has(node.displayFulfillmentStatus)
    ? 'fulfilled'
    : node.displayFulfillmentStatus === 'PARTIALLY_FULFILLED'
      ? 'partial'
      : 'unfulfilled';
  const items = node.lineItems?.nodes || [];
  const requiredQuantity = items.reduce((sum, item) => sum + (
    Number.isSafeInteger(item.quantity) && item.quantity >= 0 ? item.quantity : 0
  ), 0);
  return {
    id: node.id,
    createdAt: node.createdAt,
    fulfillmentStatus,
    requiredQuantity,
    availableQuantity: null,
    inventoryTracked: false,
    manualAttention: Array.isArray(node.tags) && node.tags.includes('merchantflow:attention')
  };
}

export function normalizeOrderConnection(connection) {
  if (!connection || !Array.isArray(connection.edges)) throw new TypeError('Expected orders connection');
  return connection.edges.map(({ node }) => normalizeShopifyOrder(node));
}
