// Demo of the main usage.
// This file can be directly run:
//   - first install `keep-func-props`
//   - then `node node_modules/keep-func-props/examples/main.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/keep-func-props

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('./utils')

const keepFuncProps = require('keep-func-props')

// Any function wrapper works
const wrapper = function(anyFunction) {
  return (...args) => anyFunction(...args)
}

// `betterWrapper` is like `wrapper` but it keeps the function properties
const betterWrapper = keepFuncProps(wrapper)

const getTrue = () => true

console.log(wrapper(getTrue)) // `[Function]`
console.log(betterWrapper(getTrue)) // `[Function: getTrue]`
