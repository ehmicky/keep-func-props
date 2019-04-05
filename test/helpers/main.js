// Dummy functors and functions used in tests
export const identityFunctor = function(func) {
  return function newFunc(...args) {
    // eslint-disable-next-line fp/no-this, no-invalid-this
    return func.call(this, ...args)
  }
}

export const identityFunc = function(value) {
  return value
}

export const getTrue = function() {
  return true
}

export const getIdentity = function() {
  return identityFunc
}

// We add function static properties to test them
const addFuncProps = function(func) {
  // eslint-disable-next-line fp/no-mutating-assign
  Object.assign(func, {
    prop: true,
    [Symbol.for('test')]: true,
  })

  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperties(func, {
    descriptors: {
      get() {
        return true
      },
      configurable: false,
    },
    nonEnum: { value: true, enumerable: false },
  })
}

addFuncProps(identityFunctor)
addFuncProps(identityFunc)
