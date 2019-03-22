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

// This could be `lodash/memoize` for example.
const memoize = require('./memoize')

const betterMemoize = keepFuncProps(memoize)

const anyFunction = () => true

console.log(memoize(anyFunction)) // `[Function: memoized]`
console.log(betterMemoize(anyFunction)) // `[Function: anyFunction]`
