import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeShopifyOrder, normalizeOrderConnection } from '../src/shopify/normalize-orders.mjs';
import { buildExceptionQueue } from '../src/risk-engine.mjs';

const sample = {
 id: 'gid://shopify/Order/123', createdAt:'2026-10-30T12:00:00.000Z',
 displayFulfillmentStatus:'UNFULFILLED', tags:['merchantflow:attention'],
 lineItems:{nodes:[{quantity:2},{quantity:1}]}
};
test('normalizes Shopify fields, intentionally without inferred inventory', () => {
 const order=normalizeShopifyOrder(sample);
 assert.equal(order.requiredQuantity,3);
 assert.equal(order.availableQuantity,null);
 assert.equal(order.inventoryTracked,false);
 assert.equal(order.manualAttention,true);
});
test('end-to-end normalized order gets explainable delay and manual flag',()=>{
 const items=normalizeOrderConnection({edges:[{node:sample}]});
 const queue=buildExceptionQueue(items,new Date('2026-11-03T12:00:00Z'));
 assert.equal(queue.length,1);
 assert.equal(queue[0].score,45);
 assert.equal(queue[0].reasons.length,2);
});
test('fulfillment completion suppresses alert',()=>{
 const normalized=normalizeShopifyOrder({...sample,displayFulfillmentStatus:'FULFILLED'});
 assert.equal(buildExceptionQueue([normalized],new Date('2026-11-03T12:00:00Z')).length,0);
});
test('invalid connection rejected',()=> assert.throws(()=>normalizeOrderConnection({})));
