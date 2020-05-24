import test from 'ava'

import keepFuncProps from '../src/main.js'

import { identityFunc } from './helpers/main.js'

test('should be a noop if input is not a function', (t) => {
  const returnValue = keepFuncProps(true)

  t.true(returnValue)
})

test('should allow functors not returning a function', (t) => {
  const getTrue = () => true
  const functor = keepFuncProps(getTrue)
  const returnValue = functor(identityFunc)

  t.true(returnValue)
})

test('should allow functors not taking a function as argument', (t) => {
  const getTrue = () => true
  const functor = keepFuncProps(getTrue)
  const returnValue = functor()

  t.true(returnValue)
})
