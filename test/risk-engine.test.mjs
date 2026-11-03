import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateOrder, buildExceptionQueue } from '../src/risk-engine.mjs';
const now = new Date('2026-11-03T12:00:00.000Z');
const base = { id: 'gid://shopify/Order/1', createdAt:'2026-11-02T12:00:00.000Z', fulfillmentStatus:'unfulfilled', requiredQuantity:1, availableQuantity:10 };
test('no alert for healthy new order', () => assert.equal(evaluateOrder(base,now),null));
test('stock shortage raises high risk', () => {
  const issue = evaluateOrder({...base,availableQuantity:0},now);
  assert.equal(issue.priority,'high');
  assert.equal(issue.score,60);
});
test('overdue orders are flagged', () => {
  const issue=evaluateOrder({...base,createdAt:'2026-10-30T12:00:00.000Z'},now);
  assert.equal(issue.daysOpen,4);
  assert.equal(issue.score,25);
});
test('fulfilled order never flags', () => assert.equal(evaluateOrder({...base,fulfillmentStatus:'fulfilled',availableQuantity:0},now),null));
test('untracked stock does not produce false shortage', () => assert.equal(evaluateOrder({...base,inventoryTracked:false,availableQuantity:0},now),null));
test('unknown inventory does not produce false shortage', () => assert.equal(evaluateOrder({...base,availableQuantity:null},now),null));
test('queue sorted by descending score', () => {
 const orders=[{...base,id:'new',availableQuantity:0},{...base,id:'old',createdAt:'2026-10-27T12:00:00.000Z',availableQuantity:0}];
 assert.deepEqual(buildExceptionQueue(orders,now).map(x=>x.orderId),['old','new']);
});
test('bad input raises controlled errors', () => assert.throws(()=>evaluateOrder({},now),TypeError));
