import test from 'ava'
import testEach from 'test-each'

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

testEach(
  ARGS,
  ['name', 'length', 'prop'],
  ({ title }, { getFunctor, func }, propName) => {
    test(`should not modify properties | ${title}`, t => {
      const funcB = getFunctor()(func)

      t.true(func[propName] !== undefined)
      t.is(func[propName], funcB[propName])
    })
  },
)

testEach(ARGS, ({ title }, { getFunctor, func }) => {
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
