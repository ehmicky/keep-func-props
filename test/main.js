import test from 'ava'
import keepFuncProps from 'keep-func-props'

import { identityFunctor, identityFunc } from './helpers/main.js'

test('should copy properties', (t) => {
  const func = identityFunc.bind()
  // eslint-disable-next-line fp/no-mutation
  func.prop = true

  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(func)

  t.is(funcCopy.prop, func.prop)
})

test('should copy properties of functor itself', (t) => {
  const functor = identityFunctor.bind()
  // eslint-disable-next-line fp/no-mutation
  functor.prop = true
  const functorCopy = keepFuncProps(functor)

  t.is(functorCopy.prop, functor.prop)
})

test('should copy name', (t) => {
  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(identityFunc)

  t.is(funcCopy.name, identityFunc.name)
})

test('should not copy `length`', (t) => {
  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(identityFunc)

  t.not(funcCopy.length, identityFunc.length)
})

test('should copy property descriptors', (t) => {
  const func = identityFunc.bind()
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(func, 'prop', {
    get: identityFunc,
    configurable: false,
  })

  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(func)

  t.deepEqual(
    Object.getOwnPropertyDescriptor(funcCopy, 'prop'),
    Object.getOwnPropertyDescriptor(func, 'prop'),
  )
})

test('should copy symbol properties', (t) => {
  const func = identityFunc.bind()
  const symbol = Symbol('test')
  // eslint-disable-next-line fp/no-mutation
  func[symbol] = true

  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(func)

  t.is(funcCopy[symbol], func[symbol])
})

test('should copy non-enumerable properties', (t) => {
  const func = identityFunc.bind()
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(func, 'nonEnum', { value: true, enumerable: false })

  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(func)

  t.is(funcCopy.nonEnum, func.nonEnum)
})

test('should copy inherited properties', (t) => {
  // eslint-disable-next-line fp/no-class, unicorn/no-static-only-class
  class Parent {
    // eslint-disable-next-line no-empty-function
    static inheritedFunc() {}
  }
  // eslint-disable-next-line fp/no-class
  class Child extends Parent {}

  const functor = keepFuncProps(identityFunctor)
  const ChildCopy = functor(Child)

  t.is(ChildCopy.inheritedFunc, Child.inheritedFunc)
})

test('should wrap `toString()`', (t) => {
  const functor = keepFuncProps(identityFunctor)
  const funcCopy = functor(identityFunc)

  t.is(
    funcCopy.toString(),
    `/* Wrapped with newFunc() */\n${identityFunc.toString()}`,
  )
})
