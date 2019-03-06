[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/keep-func-props.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/keep-func-props) [![Travis](https://img.shields.io/badge/cross-platform-4cc61e.svg?logo=travis)](https://travis-ci.org/ehmicky/keep-func-props) [![Node](https://img.shields.io/node/v/keep-func-props.svg?logo=node.js)](#) [![Gitter](https://img.shields.io/gitter/room/ehmicky/keep-func-props.svg?logo=gitter)](https://gitter.im/ehmicky/keep-func-props)

Wrap a function without changing its name, length and other properties.

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

# Related projects

If you want to modify a function that is not a function wrapper, check out
[`mimic-fn`](https://github.com/sindresorhus/mimic-fn).
