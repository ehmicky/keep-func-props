// Dummy functors and functions used in tests
export const identityFunctor = function (func) {
  return function newFunc(...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    return func.call(this, ...args)
  }
}

export const identityFunc = function (value) {
  return value
}
