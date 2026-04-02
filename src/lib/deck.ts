export type Tetrimino = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export const TETRIMINOS: Tetrimino[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']

export const COPIES: Record<Tetrimino, number> = {
  I: 4, J: 3, L: 3, O: 4, S: 3, T: 4, Z: 3,
}

export const PIECE_COLORS: Record<Tetrimino, string> = {
  I: '#00f0f0',
  J: '#0000f0',
  L: '#f0a000',
  O: '#f0f000',
  S: '#00f000',
  T: '#a000f0',
  Z: '#f00000',
}

export function pieceImageSrc(t: Tetrimino): string {
  return `/tetriminos/${t}.png`
}

export function totalCards(copies: Record<Tetrimino, number>): number {
  return TETRIMINOS.reduce((sum, t) => sum + copies[t], 0)
}

export interface DeckState {
  remaining: Tetrimino[]
  drawn: Tetrimino[]
  current: Tetrimino | null
  next: Tetrimino | null
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function createDeck(copies: Record<Tetrimino, number> = COPIES): DeckState {
  const full: Tetrimino[] = []
  for (const t of TETRIMINOS) {
    for (let i = 0; i < copies[t]; i++) full.push(t)
  }
  const shuffled = shuffle(full)
  return {
    current: shuffled[0],
    next: shuffled[1] ?? null,
    remaining: shuffled.slice(2),
    drawn: [],
  }
}

export function drawFromDeck(deck: DeckState): DeckState {
  if (deck.current === null) return deck
  return {
    drawn: [...deck.drawn, deck.current],
    current: deck.next,
    next: deck.remaining[0] ?? null,
    remaining: deck.remaining.slice(1),
  }
}

export function isDeckExhausted(deck: DeckState): boolean {
  return deck.current === null
}
