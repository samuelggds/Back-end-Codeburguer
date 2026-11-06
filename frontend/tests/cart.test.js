import test from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeCart, cartReducer, calculateCartTotals, MAX_QUANTITY } from '../src/features/home/lib/cart.js'
import { formatMoney } from '../src/features/home/lib/money.js'

const products = [
  { id: 'burger', priceCents: 3590 }, { id: 'waffles', priceCents: 2090 },
  { id: 'pancakes', priceCents: 1590 }, { id: 'toast', priceCents: 1290 },
]

test('invalid or injected saved entries cannot enter the cart', () => {
  for (const value of [null, [], 'burger', 1]) assert.deepEqual(sanitizeCart(value), {})
  assert.deepEqual(sanitizeCart({ burger: 2, waffles: '3', pancakes: -1, toast: 100, unknown: 7 }), { burger: 2 })
  assert.deepEqual(sanitizeCart(Object.create({ burger: 99 })), {})
})

test('quantities cannot exceed the limit or become negative', () => {
  const full = { burger: MAX_QUANTITY }
  assert.equal(cartReducer(full, { type: 'add', productId: 'burger' }), full)
  assert.deepEqual(cartReducer({ burger: 1 }, { type: 'remove', productId: 'burger' }), {})
  assert.deepEqual(cartReducer({}, { type: 'remove', productId: 'burger' }), {})
  assert.deepEqual(cartReducer({}, { type: 'add', productId: '__proto__' }), {})
})

test('money stays in integer cents across repeated additions and removals', () => {
  let cart = {}
  for (const { id } of products) cart = cartReducer(cart, { type: 'add', productId: id })
  assert.deepEqual(calculateCartTotals(cart, products), { count: 4, totalCents: 8560 })
  cart = cartReducer(cart, { type: 'remove', productId: 'burger' })
  cart = cartReducer(cart, { type: 'add', productId: 'waffles' })
  assert.deepEqual(calculateCartTotals(cart, products), { count: 4, totalCents: 7060 })
  assert.equal(formatMoney(7060, { compact: true }), 'R$70,60')
})
