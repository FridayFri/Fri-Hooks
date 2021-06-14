import { useState, useLayoutEffect } from 'react'
type Size = { width?: number; height?: number }

function useSize(target): Size {
  const [state, setState] = useState<Size>(() => {
    const el = target
    return {
      width: el.clientWidth,
      height: el.clientHeight,
    }
  })

  useLayoutEffect(() => {
    const el = target
    if (!el) {
      return () => {}
    }
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        })
      })
    })
    resizeObserver.observe(el)
    return () => {
      resizeObserver.disconnect()
    }
  }, [target])

  return state
}

export default useSize
