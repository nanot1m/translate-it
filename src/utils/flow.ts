import { flow as _flow } from "mobx-state-tree"

export type Flow = <T extends Promise<any>, R, Args extends any[]>(
  generator: (
    ...args: Args
  ) => Generator<T, R, T extends Promise<infer Y> ? Y : never>,
) => (...args: Args) => Promise<R>

export const flow = _flow as Flow
