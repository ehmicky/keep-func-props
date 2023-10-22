import test from 'ava'
import keepFuncProps from 'keep-func-props'
import { spy } from 'sinon'

// Dummy functors and functions used in tests
const identityFunctor = (func) =>
  function newFunc(...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    return func.call(this, ...args)
  }

const identityFunc = (value) => value

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

test('should pass functor arguments', (t) => {
  const functor = spy(identityFunctor)

  const functorCopy = keepFuncProps(functor)
  functorCopy(identityFunc, 'a', 'b')

  t.true(functor.calledWith(identityFunc, 'a', 'b'))
})

test('should pass functor context', (t) => {
  const functor = spy(identityFunctor)

  const functorCopy = keepFuncProps(functor)
  const context = {}
  functorCopy.call(context, identityFunc)

  t.true(functor.calledOn(context))
})

test('should wrap itself', (t) => {
  t.is(keepFuncProps.name, 'keepFuncProps')
})

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
