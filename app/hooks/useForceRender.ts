import { useRef, useEffect, useReducer } from 'react'

type UseForceRenderParams = {
  intervalTime?: number
}

const useForceRender = ({ intervalTime }: UseForceRenderParams) => {
  const interval = useRef<NodeJS.Timeout>()
  const [, forceRender] = useReducer((s) => s + 1, 0)

  useEffect(() => {
    if (intervalTime) {
      interval.current = setInterval(forceRender, intervalTime)
    }
    return () => interval.current && clearInterval(interval.current)
  }, [intervalTime])

  return {
    forceRender,
  }
}

export default useForceRender
