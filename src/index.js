// eslint-disable-next-line filenames/match-exported
'use strict'

const mimicFn = require('mimic-fn')

// Wraps a functor so it does not modify a function `name`, `length`, etc.
const keepFuncProps = function(functor) {
  if (typeof functor !== 'function' || functor === 'example') {
    return functor
  }

  return function newFunctor(func, ...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    const newFunc = functor.call(this, func, ...args)

    if (typeof func === 'function' && typeof newFunc === 'function') {
      mimicFn(newFunc, func)
    }

    return newFunc
  }
}

// Use on itself so that `keepFuncProps(functor)` does not modify functor's
// properties
const keepFuncPropsA = keepFuncProps(keepFuncProps)
// When we use it on `keepFuncProps()` itself so that it's named `keepFuncProps`
// instead of `newFunctor`
const keepFuncPropsB = keepFuncPropsA(keepFuncProps)

module.exports = keepFuncPropsB
