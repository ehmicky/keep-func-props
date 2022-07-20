import { expectError, expectType } from 'tsd'

import keepFuncProps from './main.js'

const wrapper =
  (func: (...args: any[]) => boolean, arg: any) =>
  (...args: any[]) =>
    func(...args, arg)
expectType<typeof wrapper>(keepFuncProps(wrapper))

const wrapperTwo =
  (func: Function) =>
  (...args: any[]) =>
    func(...args)
expectType<typeof wrapperTwo>(keepFuncProps(wrapperTwo))

expectError(keepFuncProps())
expectError(keepFuncProps(true))
