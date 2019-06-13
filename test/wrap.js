import test from 'ava'
import sinon from 'sinon'

import keepFuncProps from '../src/main.js'

import { identityFunctor, identityFunc } from './helpers/main.js'

test('should pass functor arguments', t => {
  const functor = sinon.spy(identityFunctor)

  const functorCopy = keepFuncProps(functor)
  functorCopy(identityFunc, 'a', 'b')

  t.true(functor.calledWith(identityFunc, 'a', 'b'))
})

test('should pass functor context', t => {
  const functor = sinon.spy(identityFunctor)

  const functorCopy = keepFuncProps(functor)
  const context = {}
  functorCopy.call(context, identityFunc)

  t.true(functor.calledOn(context))
})

test('should wrap itself', t => {
  t.is(keepFuncProps.name, 'keepFuncProps')
})
