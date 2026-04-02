'use client'

import type { DeckState } from '@/lib/deck'
import TetriminoCard from './TetriminoCard'
import CountdownRing from './CountdownRing'

interface Props {
  deck: DeckState
  deckSize: number
  secondsLeft: number
  intervalSeconds: number
  isPaused: boolean
  onPause: () => void
  onResume: () => void
  onExit: () => void
  onSkip: () => void
}

export default function GameScreen({
  deck,
  deckSize,
  secondsLeft,
  intervalSeconds,
  isPaused,
  onPause,
  onResume,
  onExit,
  onSkip,
}: Props) {
  const drawnCount = deck.drawn.length + (deck.current ? 1 : 0)

  if (deck.current === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-950 px-6">
        <div className="flex flex-col items-center gap-3">
          <span className="text-6xl">🎉</span>
          <h2 className="text-3xl font-black text-white">Deck exhausted!</h2>
          <p className="text-slate-400">All {deckSize} pieces have been drawn.</p>
        </div>
        <button
          onClick={onExit}
          className="w-full max-w-xs py-5 rounded-2xl bg-sky-500 text-white text-xl font-black active:bg-sky-600 transition-colors"
        >
          New Game
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 px-4 py-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold active:bg-slate-700 transition-colors"
        >
          Exit
        </button>
        <span className="text-slate-400 text-sm font-medium">
          {drawnCount} / {deckSize}
        </span>
        <button
          onClick={isPaused ? onResume : onPause}
          className={[
            'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
            isPaused
              ? 'bg-sky-500 text-white active:bg-sky-600'
              : 'bg-slate-800 text-slate-300 active:bg-slate-700',
          ].join(' ')}
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>

      {/* Countdown */}
      <div className="flex justify-center py-2">
        <CountdownRing
          intervalSeconds={intervalSeconds}
          isPaused={isPaused}
          drawCount={deck.drawn.length}
          secondsLeft={secondsLeft}
        />
      </div>

      {/* Next piece — tap to skip */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Next</p>
        {deck.next ? (
          <button onClick={onSkip} className="active:scale-95 transition-transform">
            <TetriminoCard piece={deck.next} size="small" />
          </button>
        ) : (
          <span className="text-slate-600 text-sm">Last piece</span>
        )}
      </div>

      {/* Current piece */}
      <div className="flex flex-col items-center gap-2 px-8 pb-4">
        <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Current</p>
        <div className="w-full max-w-[260px]">
          <TetriminoCard piece={deck.current} size="large" />
        </div>
      </div>
    </div>
  )
}
