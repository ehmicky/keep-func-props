'use strict'

const test = require('ava')

const keepFuncProps = require('..')

const { getTrue, getIdentity } = require('./helpers')

test('should be a noop if input is not a function', t => {
  const returnValue = keepFuncProps(true)
  t.true(returnValue)
})

test('should allow functors not returning a function', t => {
  const functor = keepFuncProps(getTrue)
  const returnValue = functor(getTrue)
  t.true(returnValue)
})

test('should allow functors not taking a function as argument', t => {
  const functor = keepFuncProps(getIdentity)
  const returnValue = functor(true)
  t.true(typeof returnValue === 'function')
})
