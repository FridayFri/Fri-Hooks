import { useRef } from 'react'
export type noop = (...args: any[]) => any

function PersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const persistFn = useRef<T>()
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current!.apply(this, args)
    }
  }
  return fnRef.current
}

export default PersistFn
