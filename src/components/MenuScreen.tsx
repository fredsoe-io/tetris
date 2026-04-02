'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { TETRIMINOS, COPIES, type Tetrimino } from '@/lib/deck'

const INTERVAL_OPTIONS = [5, 10, 15, 30, 60]

interface Props {
  intervalSeconds: number
  onIntervalChange: (s: number) => void
  onStart: (copies: Record<Tetrimino, number>) => void
}

export default function MenuScreen({ intervalSeconds, onIntervalChange, onStart }: Props) {
  const [copies, setCopies] = useState<Record<Tetrimino, number>>({ ...COPIES })
  const [editing, setEditing] = useState<Tetrimino | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const deckSize = Object.values(copies).reduce((a, b) => a + b, 0)

  function startEditing(t: Tetrimino) {
    setEditing(t)
    setTimeout(() => inputRef.current?.select(), 0)
  }

  function commitEdit(t: Tetrimino, raw: string) {
    const n = parseInt(raw, 10)
    if (!isNaN(n) && n >= 0) setCopies((c) => ({ ...c, [t]: n }))
    setEditing(null)
  }

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
          Deck — {deckSize} cards
        </p>
        <div className="grid grid-cols-7 gap-1">
          {TETRIMINOS.map((t) => (
            <div key={t} className="flex flex-col items-center gap-1">
              <div className="relative w-10 h-10">
                <Image src={`/tetriminos/${t}.png`} alt={`${t} piece`} fill style={{ objectFit: 'contain' }} />
              </div>
              {editing === t ? (
                <input
                  ref={inputRef}
                  type="number"
                  min={0}
                  defaultValue={copies[t]}
                  onBlur={(e) => commitEdit(t, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit(t, e.currentTarget.value)
                    if (e.key === 'Escape') setEditing(null)
                  }}
                  className="w-8 text-center text-xs font-bold bg-slate-700 text-white rounded border border-sky-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              ) : (
                <button
                  onClick={() => startEditing(t)}
                  className="text-slate-400 text-xs active:text-white transition-colors"
                >
                  ×{copies[t]}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(copies)}
        className="w-full max-w-xs py-5 rounded-2xl bg-sky-500 text-white text-xl font-black tracking-wide active:bg-sky-600 transition-colors"
      >
        Start Game
      </button>
    </div>
  )
}
