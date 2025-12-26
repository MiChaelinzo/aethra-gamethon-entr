const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null

type BiomeType = 'forest' | 'desert' | 'ocean' | 'city' | 'tundra' | 'rainforest' | 'menu'

interface MusicNode {
  oscillators: OscillatorNode[]
  gainNodes: GainNode[]
  filters: BiquadFilterNode[]
}

let currentMusic: MusicNode | null = null
let currentBiome: BiomeType | null = null
let masterGain: GainNode | null = null
let analyserNode: AnalyserNode | null = null
let isPlaying = false

if (audioContext) {
  masterGain = audioContext.createGain()
  masterGain.gain.value = 0.15
  
  analyserNode = audioContext.createAnalyser()
  analyserNode.smoothingTimeConstant = 0.8
  analyserNode.fftSize = 64
  
  masterGain.connect(analyserNode)
  analyserNode.connect(audioContext.destination)
}

const createOscillator = (
  type: OscillatorType,
  frequency: number,
  gain: number,
  detune: number = 0
): { osc: OscillatorNode; gainNode: GainNode } => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const osc = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  const filter = audioContext.createBiquadFilter()

  osc.type = type
  osc.frequency.value = frequency
  osc.detune.value = detune

  filter.type = 'lowpass'
  filter.frequency.value = 2000

  osc.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(masterGain)

  gainNode.gain.value = 0
  gainNode.gain.linearRampToValueAtTime(gain, audioContext.currentTime + 2)

  return { osc, gainNode }
}

const playForestMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const bassFreq = 65.41
  const chordNotes = [
    { freq: 196.00, gain: 0.04 },
    { freq: 246.94, gain: 0.03 },
    { freq: 293.66, gain: 0.035 },
    { freq: 392.00, gain: 0.025 },
    { freq: 493.88, gain: 0.02 }
  ]

  const bass = createOscillator('triangle', bassFreq, 0.06)
  oscillators.push(bass.osc)
  gainNodes.push(bass.gainNode)

  chordNotes.forEach(({ freq, gain }, index) => {
    const node = createOscillator('sine', freq, gain, index * 5)
    oscillators.push(node.osc)
    gainNodes.push(node.gainNode)
  })

  const melody = audioContext.createOscillator()
  const melodyGain = audioContext.createGain()
  const melodyFilter = audioContext.createBiquadFilter()

  melody.type = 'sine'
  melody.frequency.value = 587.33
  melodyFilter.type = 'lowpass'
  melodyFilter.frequency.value = 1500

  melody.connect(melodyFilter)
  melodyFilter.connect(melodyGain)
  melodyGain.connect(masterGain)
  melodyGain.gain.value = 0

  const melodySequence = [587.33, 659.25, 783.99, 659.25]
  let melodyIndex = 0

  const melodyInterval = setInterval(() => {
    if (!isPlaying || currentBiome !== 'forest') {
      clearInterval(melodyInterval)
      return
    }
    melodyGain.gain.cancelScheduledValues(audioContext.currentTime)
    melodyGain.gain.setValueAtTime(0, audioContext.currentTime)
    melodyGain.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 0.1)
    melodyGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5)
    
    melody.frequency.setValueAtTime(melodySequence[melodyIndex], audioContext.currentTime)
    melodyIndex = (melodyIndex + 1) % melodySequence.length
  }, 2000)

  oscillators.push(melody)
  gainNodes.push(melodyGain)

  oscillators.forEach(osc => osc.start())

  return { oscillators, gainNodes, filters }
}

const playDesertMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const droneFreq = 110.00
  const harmonics = [
    { freq: droneFreq, gain: 0.05 },
    { freq: droneFreq * 1.5, gain: 0.035 },
    { freq: droneFreq * 2, gain: 0.03 },
    { freq: droneFreq * 3, gain: 0.02 }
  ]

  harmonics.forEach(({ freq, gain }) => {
    const node = createOscillator('sawtooth', freq, gain)
    oscillators.push(node.osc)
    gainNodes.push(node.gainNode)
  })

  const shimmer = audioContext.createOscillator()
  const shimmerGain = audioContext.createGain()
  const shimmerFilter = audioContext.createBiquadFilter()
  const lfo = audioContext.createOscillator()
  const lfoGain = audioContext.createGain()

  shimmer.type = 'sine'
  shimmer.frequency.value = 1760
  shimmerFilter.type = 'bandpass'
  shimmerFilter.frequency.value = 2000
  shimmerFilter.Q.value = 5

  lfo.type = 'sine'
  lfo.frequency.value = 0.3
  lfoGain.gain.value = 400

  lfo.connect(lfoGain)
  lfoGain.connect(shimmerFilter.frequency)

  shimmer.connect(shimmerFilter)
  shimmerFilter.connect(shimmerGain)
  shimmerGain.connect(masterGain)
  shimmerGain.gain.value = 0
  shimmerGain.gain.linearRampToValueAtTime(0.012, audioContext.currentTime + 2)

  oscillators.push(shimmer, lfo)
  gainNodes.push(shimmerGain)
  filters.push(shimmerFilter)

  oscillators.forEach(osc => osc.start())

  return { oscillators, gainNodes, filters }
}

const playOceanMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const bassFreq = 73.42
  const waves = [
    { freq: bassFreq, gain: 0.055 },
    { freq: 146.83, gain: 0.04 },
    { freq: 220.00, gain: 0.03 },
    { freq: 329.63, gain: 0.025 },
    { freq: 440.00, gain: 0.02 }
  ]

  waves.forEach(({ freq, gain }, index) => {
    const osc = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()
    const lfo = audioContext.createOscillator()
    const lfoGain = audioContext.createGain()

    osc.type = 'sine'
    osc.frequency.value = freq
    filter.type = 'lowpass'
    filter.frequency.value = 1200

    lfo.type = 'sine'
    lfo.frequency.value = 0.2 + (index * 0.05)
    lfoGain.gain.value = 3 + (index * 2)

    lfo.connect(lfoGain)
    lfoGain.connect(osc.detune)

    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(masterGain)
    gainNode.gain.value = 0
    gainNode.gain.linearRampToValueAtTime(gain, audioContext.currentTime + 3)

    oscillators.push(osc, lfo)
    gainNodes.push(gainNode)
    filters.push(filter)

    osc.start()
    lfo.start()
  })

  return { oscillators, gainNodes, filters }
}

const playCityMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const bassFreq = 82.41
  const techChord = [
    { freq: bassFreq, gain: 0.05 },
    { freq: 164.81, gain: 0.04 },
    { freq: 207.65, gain: 0.035 },
    { freq: 329.63, gain: 0.03 },
    { freq: 415.30, gain: 0.025 }
  ]

  techChord.forEach(({ freq, gain }) => {
    const node = createOscillator('square', freq, gain)
    oscillators.push(node.osc)
    gainNodes.push(node.gainNode)
  })

  const arp = audioContext.createOscillator()
  const arpGain = audioContext.createGain()
  const arpFilter = audioContext.createBiquadFilter()

  arp.type = 'triangle'
  arp.frequency.value = 659.25
  arpFilter.type = 'lowpass'
  arpFilter.frequency.value = 1800

  arp.connect(arpFilter)
  arpFilter.connect(arpGain)
  arpGain.connect(masterGain)
  arpGain.gain.value = 0

  const arpNotes = [659.25, 830.61, 987.77, 1318.51]
  let arpIndex = 0

  const arpInterval = setInterval(() => {
    if (!isPlaying || currentBiome !== 'city') {
      clearInterval(arpInterval)
      return
    }
    arpGain.gain.cancelScheduledValues(audioContext.currentTime)
    arpGain.gain.setValueAtTime(0, audioContext.currentTime)
    arpGain.gain.linearRampToValueAtTime(0.018, audioContext.currentTime + 0.05)
    arpGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4)
    
    arp.frequency.setValueAtTime(arpNotes[arpIndex], audioContext.currentTime)
    arpIndex = (arpIndex + 1) % arpNotes.length
  }, 500)

  oscillators.push(arp)
  gainNodes.push(arpGain)
  filters.push(arpFilter)

  oscillators.forEach(osc => osc.start())

  return { oscillators, gainNodes, filters }
}

const playTundraMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const iceFreq = 98.00
  const crystalNotes = [
    { freq: iceFreq, gain: 0.045 },
    { freq: 146.83, gain: 0.035 },
    { freq: 196.00, gain: 0.03 },
    { freq: 293.66, gain: 0.025 },
    { freq: 440.00, gain: 0.02 },
    { freq: 659.25, gain: 0.015 }
  ]

  crystalNotes.forEach(({ freq, gain }) => {
    const node = createOscillator('sine', freq, gain)
    oscillators.push(node.osc)
    gainNodes.push(node.gainNode)
  })

  const wind = audioContext.createOscillator()
  const windGain = audioContext.createGain()
  const windFilter = audioContext.createBiquadFilter()
  const windLfo = audioContext.createOscillator()
  const windLfoGain = audioContext.createGain()

  wind.type = 'sawtooth'
  wind.frequency.value = 880
  windFilter.type = 'highpass'
  windFilter.frequency.value = 1000
  windFilter.Q.value = 0.5

  windLfo.type = 'sine'
  windLfo.frequency.value = 0.15
  windLfoGain.gain.value = 0.015

  windLfo.connect(windLfoGain)
  windLfoGain.connect(windGain.gain)

  wind.connect(windFilter)
  windFilter.connect(windGain)
  windGain.connect(masterGain)
  windGain.gain.value = 0.008
  windGain.gain.linearRampToValueAtTime(0.012, audioContext.currentTime + 4)

  oscillators.push(wind, windLfo)
  gainNodes.push(windGain)
  filters.push(windFilter)

  oscillators.forEach(osc => osc.start())

  return { oscillators, gainNodes, filters }
}

const playRainforestMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const rootFreq = 55.00
  const jungleChord = [
    { freq: rootFreq, gain: 0.055 },
    { freq: 110.00, gain: 0.045 },
    { freq: 164.81, gain: 0.04 },
    { freq: 246.94, gain: 0.035 },
    { freq: 329.63, gain: 0.03 }
  ]

  jungleChord.forEach(({ freq, gain }) => {
    const node = createOscillator('triangle', freq, gain)
    oscillators.push(node.osc)
    gainNodes.push(node.gainNode)
  })

  const birdCall = audioContext.createOscillator()
  const birdGain = audioContext.createGain()
  const birdFilter = audioContext.createBiquadFilter()

  birdCall.type = 'sine'
  birdCall.frequency.value = 1760
  birdFilter.type = 'bandpass'
  birdFilter.frequency.value = 1800
  birdFilter.Q.value = 3

  birdCall.connect(birdFilter)
  birdFilter.connect(birdGain)
  birdGain.connect(masterGain)
  birdGain.gain.value = 0

  const birdNotes = [1760, 1975.53, 2217.46, 1975.53]
  let birdIndex = 0

  const birdInterval = setInterval(() => {
    if (!isPlaying || currentBiome !== 'rainforest') {
      clearInterval(birdInterval)
      return
    }
    birdGain.gain.cancelScheduledValues(audioContext.currentTime)
    birdGain.gain.setValueAtTime(0, audioContext.currentTime)
    birdGain.gain.linearRampToValueAtTime(0.012, audioContext.currentTime + 0.08)
    birdGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8)
    
    birdCall.frequency.setValueAtTime(birdNotes[birdIndex], audioContext.currentTime)
    birdIndex = (birdIndex + 1) % birdNotes.length
  }, 3000)

  oscillators.push(birdCall)
  gainNodes.push(birdGain)
  filters.push(birdFilter)

  oscillators.forEach(osc => osc.start())

  return { oscillators, gainNodes, filters }
}

const playMenuMusic = (): MusicNode => {
  if (!audioContext || !masterGain) throw new Error('AudioContext not available')

  const oscillators: OscillatorNode[] = []
  const gainNodes: GainNode[] = []
  const filters: BiquadFilterNode[] = []

  const ambientFreq = 130.81
  const ambientChord = [
    { freq: ambientFreq, gain: 0.04 },
    { freq: 164.81, gain: 0.035 },
    { freq: 196.00, gain: 0.03 },
    { freq: 246.94, gain: 0.025 },
    { freq: 329.63, gain: 0.02 }
  ]

  ambientChord.forEach(({ freq, gain }) => {
    const node = createOscillator('sine', freq, gain)
    oscillators.push(node.osc)
    gainNodes.push(node.gainNode)
  })

  oscillators.forEach(osc => osc.start())

  return { oscillators, gainNodes, filters }
}

export const playBackgroundMusic = (biome: BiomeType) => {
  if (!audioContext || !masterGain) return

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  if (currentBiome === biome && isPlaying) return

  stopBackgroundMusic()

  currentBiome = biome
  isPlaying = true

  switch (biome) {
    case 'forest':
      currentMusic = playForestMusic()
      break
    case 'desert':
      currentMusic = playDesertMusic()
      break
    case 'ocean':
      currentMusic = playOceanMusic()
      break
    case 'city':
      currentMusic = playCityMusic()
      break
    case 'tundra':
      currentMusic = playTundraMusic()
      break
    case 'rainforest':
      currentMusic = playRainforestMusic()
      break
    case 'menu':
      currentMusic = playMenuMusic()
      break
  }
}

export const stopBackgroundMusic = () => {
  if (!audioContext || !currentMusic) return

  isPlaying = false

  currentMusic.gainNodes.forEach(gainNode => {
    gainNode.gain.cancelScheduledValues(audioContext.currentTime)
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 1)
  })

  setTimeout(() => {
    if (currentMusic) {
      currentMusic.oscillators.forEach(osc => {
        try {
          osc.stop()
          osc.disconnect()
        } catch (e) {
        }
      })
      currentMusic.gainNodes.forEach(gain => {
        try {
          gain.disconnect()
        } catch (e) {
        }
      })
      currentMusic.filters.forEach(filter => {
        try {
          filter.disconnect()
        } catch (e) {
        }
      })
    }
    currentMusic = null
    currentBiome = null
  }, 1100)
}

export const setMusicVolume = (volume: number) => {
  if (!masterGain) return
  const clampedVolume = Math.max(0, Math.min(1, volume))
  masterGain.gain.setValueAtTime(clampedVolume * 0.15, audioContext!.currentTime)
}

export const toggleMusic = (play: boolean) => {
  if (play && currentBiome) {
    playBackgroundMusic(currentBiome)
  } else {
    stopBackgroundMusic()
  }
}

export const getAudioAnalyser = (): AnalyserNode | null => {
  return analyserNode
}

export const getAudioContext = (): AudioContext | null => {
  return audioContext
}
