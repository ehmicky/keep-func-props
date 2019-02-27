[![downloads](https://img.shields.io/npm/dt/keep-func-props.svg?logo=npm)](https://www.npmjs.com/package/keep-func-props) [![last commit](https://img.shields.io/github/last-commit/ehmicky/keep-func-props.svg?logo=github&logoColor=white)](https://github.com/ehmicky/keep-func-props/graphs/contributors) [![Coverage Status](https://img.shields.io/codecov/c/github/ehmicky/keep-func-props.svg?label=test%20coverage&logo=codecov)](https://codecov.io/gh/ehmicky/keep-func-props) [![travis](https://img.shields.io/travis/ehmicky/keep-func-props/master.svg?logo=travis)](https://travis-ci.org/ehmicky/keep-func-props/builds) [![node](https://img.shields.io/node/v/keep-func-props.svg?logo=node.js)](#) [![Gitter](https://img.shields.io/gitter/room/ehmicky/keep-func-props.svg?logo=gitter)](https://gitter.im/ehmicky/keep-func-props)

Function wrappers are commonly used in functional programming. They take a
function as input and return it wrapped. Examples include
[memoizing](https://github.com/planttheidea/moize) or ensuring a function is
only called once.

However those wrappers return a new function which means the original
function's `name`, `length` and other properties are lost. This module
enhances a function wrapper to keep those properties.

<!-- eslint-disable import/no-extraneous-dependencies, import/no-internal-modules, node/no-extraneous-require -->

```js
const keepFuncProps = require('keep-func-props')
const memoize = require('lodash/memoize')

const betterMemoize = keepFuncProps(memoize)

const anyFunction = function() {
  return true
}

// Function name is `memoized`
console.log(memoize(anyFunction))

// Function name is `anyFunction`
console.log(betterMemoize(anyFunction))
```

# Installation

```bash
npm install keep-func-props
```

# Usage

```js
const keepFuncProps = require('keep-func-props')

const functionWrapper = function(func) {
  return (...args) => func(...args)
}

// `betterWrapper` is like `functionWrapper` but it keeps the function
// properties
const betterWrapper = keepFuncProps(functionWrapper)
```

The function wrapper must:

- take a function as first argument
- take additional arguments (e.g. an options object)
- return a new function

Each of those requirements is optional.
