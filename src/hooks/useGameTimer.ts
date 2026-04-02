import { useEffect, useRef, useState, useCallback } from 'react'

interface UseGameTimerResult {
  secondsLeft: number
  isPaused: boolean
  pause: () => void
  resume: () => void
  reset: (newInterval: number) => void
}

export function useGameTimer(
  intervalSeconds: number,
  onTick: () => void,
  active: boolean,
): UseGameTimerResult {
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds)
  const [isPaused, setIsPaused] = useState(false)
  const onTickRef = useRef(onTick)

  useEffect(() => {
    onTickRef.current = onTick
  })

  useEffect(() => {
    secondsLeftRef.current = intervalSeconds
    setSecondsLeft(intervalSeconds)
    setIsPaused(false)
  }, [intervalSeconds])

  const secondsLeftRef = useRef(secondsLeft)

  useEffect(() => {
    if (!active || isPaused) return
    const id = setInterval(() => {
      if (secondsLeftRef.current <= 1) {
        secondsLeftRef.current = intervalSeconds
        setSecondsLeft(intervalSeconds)
        onTickRef.current()
      } else {
        secondsLeftRef.current -= 1
        setSecondsLeft(secondsLeftRef.current)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [active, isPaused, intervalSeconds])

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])
  const reset = useCallback((newInterval: number) => {
    secondsLeftRef.current = newInterval
    setSecondsLeft(newInterval)
    setIsPaused(false)
  }, [])

  return { secondsLeft, isPaused, pause, resume, reset }
}
