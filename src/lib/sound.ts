let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function playTimerDing() {
  try {
    const c = getCtx()
    if (c.state === 'suspended') c.resume()

    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, c.currentTime)
    osc.frequency.exponentialRampToValueAtTime(660, c.currentTime + 0.15)

    gain.gain.setValueAtTime(0.4, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4)

    osc.start(c.currentTime)
    osc.stop(c.currentTime + 0.4)
  } catch {
    // audio not available
  }
}
