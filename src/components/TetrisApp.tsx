'use client'

import { useState, useCallback } from 'react'
import { createDeck, drawFromDeck, type DeckState, type Tetrimino } from '@/lib/deck'
import { useGameTimer } from '@/hooks/useGameTimer'
import { playTimerDing } from '@/lib/sound'
import MenuScreen from './MenuScreen'
import GameScreen from './GameScreen'

type Screen = 'menu' | 'game'

export default function TetrisApp() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [intervalSeconds, setIntervalSeconds] = useState(15)
  const [deck, setDeck] = useState<DeckState>(() => createDeck())

  const drawNext = useCallback((withSound = false) => {
    setDeck((d) => drawFromDeck(d))
    if (withSound) playTimerDing()
  }, [])

  const onTimerTick = useCallback(() => drawNext(true), [drawNext])

  const { secondsLeft, isPaused, pause, resume, reset } = useGameTimer(
    intervalSeconds,
    onTimerTick,
    screen === 'game',
  )

  const handleSkip = useCallback(() => {
    drawNext()
    reset(intervalSeconds)
  }, [drawNext, reset, intervalSeconds])

  function handleStart(copies: Record<Tetrimino, number>) {
    const freshDeck = createDeck(copies)
    setDeck(freshDeck)
    reset(intervalSeconds)
    setScreen('game')
  }

  function handleExit() {
    setScreen('menu')
  }

  function handleIntervalChange(s: number) {
    setIntervalSeconds(s)
  }

  if (screen === 'menu') {
    return (
      <MenuScreen
        intervalSeconds={intervalSeconds}
        onIntervalChange={handleIntervalChange}
        onStart={handleStart}
      />
    )
  }

  return (
    <GameScreen
      deck={deck}
      secondsLeft={secondsLeft}
      intervalSeconds={intervalSeconds}
      isPaused={isPaused}
      onPause={pause}
      onResume={resume}
      onExit={handleExit}
      onSkip={handleSkip}
    />
  )
}
