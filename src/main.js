import mimicFunction from 'mimic-function'

// Wraps a functor so it does not modify a function `name`, etc.
const keepFuncProps = (functor) => {
  if (typeof functor !== 'function') {
    return functor
  }

  return function newFunctor(func, ...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    const newFunc = functor.call(this, func, ...args)

    if (typeof func === 'function' && typeof newFunc === 'function') {
      mimicFunction(newFunc, func, { ignoreNonConfigurable: true })
    }

    return newFunc
  }
}

// Use on itself so that `keepFuncProps(functor)` does not modify functor's
// properties
const keepFuncPropsA = keepFuncProps(keepFuncProps)
// Then we use it on `keepFuncProps()` itself so that it's named `keepFuncProps`
// instead of `newFunctor`
export default keepFuncPropsA(keepFuncProps)
