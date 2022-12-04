import { expectType } from 'tsd'

import keepFuncProps from 'keep-func-props'

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

// @ts-expect-error
keepFuncProps()
// @ts-expect-error
keepFuncProps(true)
