'use client'

import { useState, useCallback } from 'react'
import { createDeck, drawFromDeck, type DeckState } from '@/lib/deck'
import { useGameTimer } from '@/hooks/useGameTimer'
import MenuScreen from './MenuScreen'
import GameScreen from './GameScreen'

type Screen = 'menu' | 'game'

export default function TetrisApp() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [intervalSeconds, setIntervalSeconds] = useState(15)
  const [deck, setDeck] = useState<DeckState>(() => createDeck())

  const drawNext = useCallback(() => {
    setDeck((d) => drawFromDeck(d))
  }, [])

  const { secondsLeft, isPaused, pause, resume, reset } = useGameTimer(
    intervalSeconds,
    drawNext,
    screen === 'game',
  )

  const handleSkip = useCallback(() => {
    drawNext()
    reset(intervalSeconds)
  }, [drawNext, reset, intervalSeconds])

  function handleStart() {
    const freshDeck = createDeck()
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
