'use strict'

const test = require('ava')

const keepFuncProps = require('../src')

const { identityFunctor, identityFunc } = require('./helpers')

// We test that the functor keeps its input function properties.
// We do it:
//  - once for the function passed as argument to the functor (`callee`),
//  - once for the functor itself (`caller`), i.e. ensures that functor does
//    not get modified after being wrapped by `keepFuncProps()` itself
const ARGS = [
  { name: 'caller', getFunctor: () => keepFuncProps, func: identityFunctor },
  {
    name: 'callee',
    getFunctor: () => keepFuncProps(identityFunctor),
    func: identityFunc,
  },
]
ARGS.forEach(({ name, getFunctor, func }) => {
  const PROPERTIES = ['name', 'length', 'prop']
  PROPERTIES.forEach(propName => {
    // eslint-disable-next-line max-nested-callbacks
    test(`[${name}] [${propName}] should not modify properties`, t => {
      const funcB = getFunctor()(func)

      t.true(func[propName] !== undefined)
      t.is(func[propName], funcB[propName])
    })
  })

  test(`[${name}] should not modify property descriptors`, t => {
    const funcB = getFunctor()(func)

    t.true(func.descriptors)
    t.deepEqual(
      Object.getOwnPropertyDescriptor(func, 'descriptors'),
      Object.getOwnPropertyDescriptor(funcB, 'descriptors'),
    )
  })

  test(`[${name}] should not modify symbol properties`, t => {
    const funcB = getFunctor()(func)

    t.true(func[Symbol.for('test')])
    t.is(func[Symbol.for('test')], funcB[Symbol.for('test')])
  })

  test(`[${name}] should not modify non-enumerable properties`, t => {
    const funcB = getFunctor()(func)

    t.true(func.nonEnum)
    t.is(func.nonEnum, funcB.nonEnum)
  })

  test(`[${name}] should not modify inherited properties`, t => {
    const funcB = getFunctor()(func)

    t.is(Object.getPrototypeOf(func), Object.getPrototypeOf(funcB))
  })
})
