import mimicFn from 'mimic-fn'

// Wraps a functor so it does not modify a function `name`, etc.
const keepFuncProps = function(functor) {
  if (typeof functor !== 'function') {
    return functor
  }

  return function newFunctor(func, ...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    const newFunc = functor.call(this, func, ...args)

    if (typeof func === 'function' && typeof newFunc === 'function') {
      mimicFn(newFunc, func, { ignoreNonConfigurable: true })
    }

    return newFunc
  }
}

// Use on itself so that `keepFuncProps(functor)` does not modify functor's
// properties
const keepFuncPropsA = keepFuncProps(keepFuncProps)
// Then we use it on `keepFuncProps()` itself so that it's named `keepFuncProps`
// instead of `newFunctor`
const keepFuncPropsB = keepFuncPropsA(keepFuncProps)

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = keepFuncPropsB
