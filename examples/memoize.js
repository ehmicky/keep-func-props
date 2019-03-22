// Fake `memoize()` function wrapper, for example purposes.
'use strict'

const memoize = function(func) {
  // eslint-disable-next-line fp/no-let
  let runOnce = false
  // eslint-disable-next-line fp/no-let, init-declarations
  let lastRun

  return function memoized(...args) {
    if (!runOnce) {
      // eslint-disable-next-line fp/no-mutation
      lastRun = func(...args)
      // eslint-disable-next-line fp/no-mutation
      runOnce = true
    }

    return lastRun
  }
}

module.exports = memoize
