import Image from 'next/image'
import { PIECE_COLORS, pieceImageSrc, type Tetrimino } from '@/lib/deck'

interface Props {
  piece: Tetrimino
  size: 'large' | 'small'
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
        src={pieceImageSrc(piece)}
        alt={`${piece} piece`}
        fill
        style={{ objectFit: 'contain', padding: '8%' }}
        priority={isLarge}
      />
    </div>
  )
}
