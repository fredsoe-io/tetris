'use client'

import { useState, useCallback } from 'react'
import { createDeck, drawFromDeck, totalCards, COPIES, type DeckState, type Tetrimino } from '@/lib/deck'
import { useGameTimer } from '@/hooks/useGameTimer'
import { playTimerDing } from '@/lib/sound'
import MenuScreen from './MenuScreen'
import GameScreen from './GameScreen'

type Screen = 'menu' | 'game'

export default function TetrisApp() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [intervalSeconds, setIntervalSeconds] = useState(15)
  const [deck, setDeck] = useState<DeckState>(() => createDeck())
  const [deckSize, setDeckSize] = useState(() => totalCards(COPIES))

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
    setDeck(createDeck(copies))
    setDeckSize(totalCards(copies))
    reset(intervalSeconds)
    setScreen('game')
  }

  function handleExit() {
    setScreen('menu')
  }

  if (screen === 'menu') {
    return (
      <MenuScreen
        intervalSeconds={intervalSeconds}
        onIntervalChange={setIntervalSeconds}
        onStart={handleStart}
      />
    )
  }

  return (
    <GameScreen
      deck={deck}
      deckSize={deckSize}
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
