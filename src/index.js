// eslint-disable-next-line filenames/match-exported
'use strict'

const mimicFn = require('mimic-fn')

// Wraps a functor so it does not modify a function `name`, `length`, etc.
const keepProps = function(functor) {
  if (typeof functor !== 'function') {
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

// Use on itself so that `keepProps(functor)` does not modify functor's
// properties
const keepPropsA = keepProps(keepProps)

module.exports = keepPropsA
