import test from 'ava'
import sinon from 'sinon'

import { keepFuncProps } from '../src/main.js'

import { identityFunctor, identityFunc } from './helpers/main.js'

test('should not modify functor arguments', t => {
  const functor = sinon.spy(identityFunctor)

  const functorA = keepFuncProps(functor)
  functorA(identityFunc, 'a', 'b')

  t.true(functor.calledWith(identityFunc, 'a', 'b'))
})

test('should not modify functor context', t => {
  const functor = sinon.spy(identityFunctor)

  const functorA = keepFuncProps(functor)
  const context = {}
  functorA.call(context, identityFunc)

  t.true(functor.calledOn(context))
})

test('should wrap itself', t => {
  t.is(keepFuncProps.name, 'keepFuncProps')
})
