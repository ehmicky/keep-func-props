import { expectType } from 'tsd'

import keepFuncProps from 'keep-func-props'

const wrapper =
  (func: (...args: unknown[]) => boolean, arg: unknown) =>
  (...args: unknown[]) =>
    func(...args, arg)
expectType<typeof wrapper>(keepFuncProps(wrapper))

const wrapperTwo =
  (Func: new (...args: unknown[]) => boolean) =>
  (...args: unknown[]) =>
    new Func(...args)
expectType<typeof wrapperTwo>(keepFuncProps(wrapperTwo))

// @ts-expect-error
keepFuncProps()
// @ts-expect-error
keepFuncProps(true)
