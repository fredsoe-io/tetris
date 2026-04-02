'use client'

import { TETRIMINOS, DECK_SIZE } from '@/lib/deck'

const COPIES: Record<string, number> = {
  I: 4, J: 3, L: 3, O: 4, S: 3, T: 4, Z: 3,
}

const PIECE_COLORS: Record<string, string> = {
  I: '#00f0f0', J: '#0000f0', L: '#f0a000', O: '#f0f000',
  S: '#00f000', T: '#a000f0', Z: '#f00000',
}

const INTERVAL_OPTIONS = [5, 10, 15, 30, 60]

interface Props {
  intervalSeconds: number
  onIntervalChange: (s: number) => void
  onStart: () => void
}

export default function MenuScreen({ intervalSeconds, onIntervalChange, onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-slate-950 px-6 py-12">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-black tracking-tight text-white">TETRIS</h1>
        <p className="text-slate-400 text-sm">Board game card drawer</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <p className="text-slate-300 text-sm font-medium text-center">
          Seconds between pieces
        </p>
        <div className="grid grid-cols-5 gap-2">
          {INTERVAL_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onIntervalChange(s)}
              className={[
                'py-3 rounded-xl text-sm font-bold transition-colors',
                intervalSeconds === s
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 active:bg-slate-700',
              ].join(' ')}
            >
              {s}s
            </button>
          ))}
        </div>
      </div>

      {/* Deck breakdown */}
      <div className="w-full max-w-xs flex flex-col gap-2">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest text-center">
          Deck — {DECK_SIZE} cards
        </p>
        <div className="grid grid-cols-7 gap-1">
          {TETRIMINOS.map((t) => (
            <div key={t} className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                style={{ backgroundColor: `${PIECE_COLORS[t]}33`, border: `2px solid ${PIECE_COLORS[t]}`, color: PIECE_COLORS[t] }}
              >
                {t}
              </div>
              <span className="text-slate-400 text-xs">×{COPIES[t]}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-xs py-5 rounded-2xl bg-sky-500 text-white text-xl font-black tracking-wide active:bg-sky-600 transition-colors"
      >
        Start Game
      </button>
    </div>
  )
}
