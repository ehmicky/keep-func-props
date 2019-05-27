import test from 'ava'

import keepFuncProps from '../src/main.js'

import { identityFunctor, identityFunc } from './helpers/main.js'

// We test that the functor keeps its input function properties.
// We do it:
//  - once for the function passed as argument to the functor (`callee`),
//  - once for the functor itself (`caller`), i.e. ensures that functor does
//    not get modified after being wrapped by `keepFuncProps()` itself
const ARGS = [
  { title: 'caller', getFunctor: () => keepFuncProps, func: identityFunctor },
  {
    title: 'callee',
    getFunctor: () => keepFuncProps(identityFunctor),
    func: identityFunc,
  },
]
const PROPERTIES = ['name', 'length', 'prop']

ARGS.forEach(({ title, getFunctor, func }) => {
  PROPERTIES.forEach(propName => {
    // eslint-disable-next-line max-nested-callbacks
    test(`should not modify properties | ${title} ${propName}`, t => {
      const funcB = getFunctor()(func)

      t.true(func[propName] !== undefined)
      t.is(func[propName], funcB[propName])
    })
  })
})

ARGS.forEach(({ title, getFunctor, func }) => {
  test(`should not modify property descriptors | ${title}`, t => {
    const funcB = getFunctor()(func)

    t.true(func.descriptors)
    t.deepEqual(
      Object.getOwnPropertyDescriptor(func, 'descriptors'),
      Object.getOwnPropertyDescriptor(funcB, 'descriptors'),
    )
  })

  test(`should not modify symbol properties | ${title}`, t => {
    const funcB = getFunctor()(func)

    t.true(func[Symbol.for('test')])
    t.is(func[Symbol.for('test')], funcB[Symbol.for('test')])
  })

  test(`should not modify non-enumerable properties | ${title}`, t => {
    const funcB = getFunctor()(func)

    t.true(func.nonEnum)
    t.is(func.nonEnum, funcB.nonEnum)
  })

  test(`should not modify inherited properties | ${title}`, t => {
    const funcB = getFunctor()(func)

    t.is(Object.getPrototypeOf(func), Object.getPrototypeOf(funcB))
  })
})
