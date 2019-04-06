import test from 'ava'

import keepFuncProps from '../src/main.js'

import { getTrue, getIdentity } from './helpers/main.js'

test('should be a noop if input is not a function', t => {
  const returnValue = keepFuncProps(true)
  t.true(returnValue)
})

test('should allow functors not returning a function', t => {
  const functor = keepFuncProps(getTrue)
  const returnValue = functor(getTrue)
  t.true(returnValue)
})

test('should allow functors not taking a function as argument', t => {
  const functor = keepFuncProps(getIdentity)
  const returnValue = functor(true)
  t.true(typeof returnValue === 'function')
})
