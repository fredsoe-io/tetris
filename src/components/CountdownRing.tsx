'use client'

interface Props {
  intervalSeconds: number
  isPaused: boolean
  drawCount: number
  secondsLeft: number
}

const RADIUS = 36
const STROKE = 6
const SIZE = (RADIUS + STROKE) * 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ≈ 226.195

export default function CountdownRing({ intervalSeconds, isPaused, drawCount, secondsLeft }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
          {/* background track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#334155"
            strokeWidth={STROKE}
          />
          {/* animated arc — key forces restart on new piece */}
          <circle
            key={drawCount}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={isPaused ? '#64748b' : '#38bdf8'}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={0}
            style={{
              animationName: 'ring-deplete',
              animationDuration: `${intervalSeconds}s`,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </svg>
        {/* seconds overlay — not rotated */}
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
          {secondsLeft}
        </span>
      </div>
      <span className="text-xs text-slate-400">{isPaused ? 'paused' : 'seconds'}</span>
    </div>
  )
}
