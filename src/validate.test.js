import test from 'ava'
import keepFuncProps from 'keep-func-props'

import { identityFunc } from './helpers/main.test.js'

test('should be a noop if input is not a function', (t) => {
  const returnValue = keepFuncProps(true)

  t.true(returnValue)
})

test('should allow functors not returning a function', (t) => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getTrue = () => true
  const functor = keepFuncProps(getTrue)
  const returnValue = functor(identityFunc)

  t.true(returnValue)
})

test('should allow functors not taking a function as argument', (t) => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getTrue = () => true
  const functor = keepFuncProps(getTrue)
  const returnValue = functor()

  t.true(returnValue)
})
