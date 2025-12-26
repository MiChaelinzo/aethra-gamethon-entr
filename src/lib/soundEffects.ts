const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

export const playSoundEffect = (type: 'badge-unlock' | 'streak-master' | 'champion' | 'power-up' | 'achievement' | 'collision-burst' | 'collision-vortex' | 'collision-spark') => {
  if (!audioContext) return

  switch (type) {
    case 'badge-unlock':
      playBadgeUnlock()
      break
    case 'streak-master':
      playStreakMaster()
      break
    case 'champion':
      playChampion()
      break
    case 'power-up':
      playPowerUp()
      break
    case 'achievement':
      playAchievement()
      break
    case 'collision-burst':
      playCollisionBurst()
      break
    case 'collision-vortex':
      playCollisionVortex()
      break
    case 'collision-spark':
      playCollisionSpark()
      break
  }
}

const playBadgeUnlock = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()
  const osc3 = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  osc1.connect(gainNode)
  osc2.connect(gainNode)
  osc3.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  osc1.type = 'sine'
  osc2.type = 'triangle'
  osc3.type = 'sine'
  
  osc1.frequency.setValueAtTime(523.25, now)
  osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15)
  
  osc2.frequency.setValueAtTime(659.25, now)
  osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15)
  
  osc3.frequency.setValueAtTime(783.99, now + 0.1)
  osc3.frequency.exponentialRampToValueAtTime(1567.98, now + 0.25)
  
  gainNode.gain.setValueAtTime(0.15, now)
  gainNode.gain.exponentialRampToValueAtTime(0.25, now + 0.05)
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4)
  
  osc1.start(now)
  osc2.start(now)
  osc3.start(now + 0.1)
  
  osc1.stop(now + 0.4)
  osc2.stop(now + 0.4)
  osc3.stop(now + 0.4)
}

const playStreakMaster = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51]
  const delays = [0, 0.08, 0.16, 0.24, 0.32]
  
  frequencies.forEach((freq, index) => {
    const osc = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    osc.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now + delays[index])
    osc.frequency.exponentialRampToValueAtTime(freq * 2, now + delays[index] + 0.3)
    
    gainNode.gain.setValueAtTime(0, now + delays[index])
    gainNode.gain.linearRampToValueAtTime(0.2, now + delays[index] + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + delays[index] + 0.5)
    
    osc.start(now + delays[index])
    osc.stop(now + delays[index] + 0.5)
  })
  
  const bassOsc = audioContext.createOscillator()
  const bassGain = audioContext.createGain()
  
  bassOsc.connect(bassGain)
  bassGain.connect(audioContext.destination)
  
  bassOsc.type = 'triangle'
  bassOsc.frequency.setValueAtTime(130.81, now)
  bassOsc.frequency.exponentialRampToValueAtTime(261.63, now + 0.6)
  
  bassGain.gain.setValueAtTime(0.15, now)
  bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7)
  
  bassOsc.start(now)
  bassOsc.stop(now + 0.7)
}

const playChampion = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const createTrumpet = (startTime: number, baseFreq: number, duration: number) => {
    const osc = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()
    
    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    osc.type = 'sawtooth'
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2000, startTime)
    
    osc.frequency.setValueAtTime(baseFreq, startTime)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, startTime + duration)
    
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(0.18, startTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
    
    osc.start(startTime)
    osc.stop(startTime + duration)
  }
  
  createTrumpet(now, 523.25, 0.3)
  createTrumpet(now + 0.15, 659.25, 0.3)
  createTrumpet(now + 0.3, 783.99, 0.4)
  createTrumpet(now + 0.5, 1046.50, 0.5)
  
  const shimmer = audioContext.createOscillator()
  const shimmerGain = audioContext.createGain()
  
  shimmer.connect(shimmerGain)
  shimmerGain.connect(audioContext.destination)
  
  shimmer.type = 'sine'
  shimmer.frequency.setValueAtTime(2093, now + 0.5)
  
  shimmerGain.gain.setValueAtTime(0, now + 0.5)
  shimmerGain.gain.linearRampToValueAtTime(0.1, now + 0.55)
  shimmerGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2)
  
  shimmer.start(now + 0.5)
  shimmer.stop(now + 1.2)
}

const playPowerUp = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const osc = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()
  
  osc.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  osc.type = 'square'
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(800, now)
  filter.frequency.exponentialRampToValueAtTime(3000, now + 0.3)
  
  osc.frequency.setValueAtTime(220, now)
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.3)
  
  gainNode.gain.setValueAtTime(0.2, now)
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
  
  osc.start(now)
  osc.stop(now + 0.3)
}

const playAchievement = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const chord = [523.25, 659.25, 783.99]
  
  chord.forEach((freq, index) => {
    const osc = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    osc.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now)
    
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6)
    
    osc.start(now)
    osc.stop(now + 0.6)
  })
  
  const sparkle = audioContext.createOscillator()
  const sparkleGain = audioContext.createGain()
  
  sparkle.connect(sparkleGain)
  sparkleGain.connect(audioContext.destination)
  
  sparkle.type = 'sine'
  sparkle.frequency.setValueAtTime(1568, now + 0.2)
  sparkle.frequency.exponentialRampToValueAtTime(2637, now + 0.4)
  
  sparkleGain.gain.setValueAtTime(0, now + 0.2)
  sparkleGain.gain.linearRampToValueAtTime(0.08, now + 0.22)
  sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
  
  sparkle.start(now + 0.2)
  sparkle.stop(now + 0.5)
}

const playCollisionBurst = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const osc = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()
  
  osc.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  osc.type = 'sine'
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(800, now)
  filter.Q.setValueAtTime(5, now)
  
  osc.frequency.setValueAtTime(400, now)
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08)
  
  gainNode.gain.setValueAtTime(0.15, now)
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12)
  
  osc.start(now)
  osc.stop(now + 0.12)
}

const playCollisionVortex = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()
  
  osc1.connect(filter)
  osc2.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  osc1.type = 'sawtooth'
  osc2.type = 'sine'
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(1500, now)
  filter.frequency.exponentialRampToValueAtTime(3000, now + 0.3)
  
  osc1.frequency.setValueAtTime(150, now)
  osc1.frequency.exponentialRampToValueAtTime(600, now + 0.3)
  
  osc2.frequency.setValueAtTime(300, now)
  osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.3)
  
  gainNode.gain.setValueAtTime(0.2, now)
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.35)
  
  osc1.start(now)
  osc2.start(now)
  osc1.stop(now + 0.35)
  osc2.stop(now + 0.35)
}

const playCollisionSpark = () => {
  if (!audioContext) return

  const now = audioContext.currentTime
  
  const numSparks = 3
  
  for (let i = 0; i < numSparks; i++) {
    const delay = i * 0.03
    const osc = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()
    
    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    osc.type = 'square'
    filter.type = 'highpass'
    filter.frequency.setValueAtTime(1000, now + delay)
    
    const baseFreq = 800 + i * 200
    osc.frequency.setValueAtTime(baseFreq, now + delay)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + delay + 0.06)
    
    gainNode.gain.setValueAtTime(0.1, now + delay)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.08)
    
    osc.start(now + delay)
    osc.stop(now + delay + 0.08)
  }
}

