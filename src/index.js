'use strict'

const mimicFn = require('mimic-fn')

// Wraps a functor so it does not modify a function `name`, `length`, etc.
const keepProps = function(functor) {
  const newFunctor = function(func, ...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    const newFunc = functor.call(this, func, ...args)
    mimicFn(newFunc, func)
    return newFunc
  }

  mimicFn(newFunctor, functor)
  return newFunctor
}

module.exports = {
  keepProps,
}
