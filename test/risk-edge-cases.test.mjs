import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateOrder, buildExceptionQueue } from '../src/risk-engine.mjs';

const now = new Date('2026-11-03T12:00:00Z');
const order = {
  id: 'ORD-1', createdAt: '2026-11-02T12:00:00Z',
  fulfillmentStatus: 'unfulfilled', requiredQuantity: 2,
  availableQuantity: 10, inventoryTracked: true, manualAttention: false
};

test('partial fulfillment remains eligible for risk checks', () => {
  const issue = evaluateOrder({...order, fulfillmentStatus:'partial', availableQuantity:1},now);
  assert.equal(issue.priority,'high');
});
test('manual attention alone is a low priority exception', () => {
  const issue = evaluateOrder({...order,manualAttention:true},now);
  assert.equal(issue.score,20);
  assert.equal(issue.priority,'low');
});
test('exactly three full days is overdue', () => {
  const issue = evaluateOrder({...order,createdAt:'2026-10-31T12:00:00Z'},now);
  assert.equal(issue.daysOpen,3);
  assert.equal(issue.score,25);
});
test('two days and 23 hours is not yet overdue', () => {
  assert.equal(evaluateOrder({...order,createdAt:'2026-10-31T12:00:01Z'},now),null);
});
test('risk reasons combine when multiple signals apply', () => {
  const issue = evaluateOrder({...order,createdAt:'2026-10-28T12:00:00Z',availableQuantity:0,manualAttention:true},now);
  assert.equal(issue.score,125);
  assert.equal(issue.reasons.length,3);
});
test('empty queue stays empty', () => assert.deepEqual(buildExceptionQueue([],now),[]));
test('invalid date rejected', () => assert.throws(()=>evaluateOrder({...order,createdAt:'not a date'},now),TypeError));
test('unknown inventory is not a shortage', () => assert.equal(evaluateOrder({...order,availableQuantity:null},now),null));
