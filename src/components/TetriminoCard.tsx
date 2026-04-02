import Image from 'next/image'
import type { Tetrimino } from '@/lib/deck'

interface Props {
  piece: Tetrimino
  size: 'large' | 'small'
}

const PIECE_COLORS: Record<Tetrimino, string> = {
  I: '#00f0f0',
  J: '#0000f0',
  L: '#f0a000',
  O: '#f0f000',
  S: '#00f000',
  T: '#a000f0',
  Z: '#f00000',
}

export default function TetriminoCard({ piece, size }: Props) {
  const color = PIECE_COLORS[piece]
  const isLarge = size === 'large'

  return (
    <div
      className={[
        'rounded-2xl',
        isLarge ? 'relative w-full aspect-square' : 'relative w-20 h-20 shrink-0',
      ].join(' ')}
      style={{
        backgroundColor: `${color}22`,
        border: `3px solid ${color}`,
      }}
    >
      <Image
        src={`/tetriminos/${piece}.png`}
        alt={`${piece} piece`}
        fill
        style={{ objectFit: 'contain', padding: '8%' }}
        priority={isLarge}
      />
    </div>
  )
}
