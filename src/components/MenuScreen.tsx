'use client'

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

      <button
        onClick={onStart}
        className="w-full max-w-xs py-5 rounded-2xl bg-sky-500 text-white text-xl font-black tracking-wide active:bg-sky-600 transition-colors"
      >
        Start Game
      </button>
    </div>
  )
}
