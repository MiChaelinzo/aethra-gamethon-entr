import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAudioAnalyser } from '../lib/backgroundMusic'
import { VisualizerStyle } from '@/lib/types'

interface MusicVisualizerProps {
  isPlaying: boolean
  biome?: string
  style: VisualizerStyle
}

export function MusicVisualizer({ isPlaying, biome = 'menu', style }: MusicVisualizerProps) {
  const [frequencyData, setFrequencyData] = useState<number[]>(Array.from({ length: 32 }, () => 0))
  const animationFrameRef = useRef<number | undefined>(undefined)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    if (!isPlaying) {
      setFrequencyData(Array.from({ length: 32 }, () => 0))
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const analyser = getAudioAnalyser()
    if (!analyser) return

    analyserRef.current = analyser
    analyser.fftSize = 64
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const updateFrequencyData = () => {
      if (!analyserRef.current || !isPlaying) return

      analyserRef.current.getByteFrequencyData(dataArray)
      
      const normalized = Array.from(dataArray).map(value => value / 255)
      setFrequencyData(normalized)

      animationFrameRef.current = requestAnimationFrame(updateFrequencyData)
    }

    updateFrequencyData()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying])

  const getBiomeColors = () => {
    switch (biome) {
      case 'forest':
        return {
          primary: 'rgba(34, 197, 94, 0.6)',
          secondary: 'rgba(134, 239, 172, 0.4)',
          accent: 'rgba(22, 163, 74, 0.8)'
        }
      case 'ocean':
        return {
          primary: 'rgba(59, 130, 246, 0.6)',
          secondary: 'rgba(147, 197, 253, 0.4)',
          accent: 'rgba(37, 99, 235, 0.8)'
        }
      case 'desert':
        return {
          primary: 'rgba(251, 146, 60, 0.6)',
          secondary: 'rgba(253, 186, 116, 0.4)',
          accent: 'rgba(234, 88, 12, 0.8)'
        }
      case 'city':
        return {
          primary: 'rgba(168, 85, 247, 0.6)',
          secondary: 'rgba(216, 180, 254, 0.4)',
          accent: 'rgba(147, 51, 234, 0.8)'
        }
      case 'tundra':
        return {
          primary: 'rgba(125, 211, 252, 0.6)',
          secondary: 'rgba(186, 230, 253, 0.4)',
          accent: 'rgba(14, 165, 233, 0.8)'
        }
      case 'rainforest':
        return {
          primary: 'rgba(16, 185, 129, 0.6)',
          secondary: 'rgba(110, 231, 183, 0.4)',
          accent: 'rgba(5, 150, 105, 0.8)'
        }
      default:
        return {
          primary: 'rgba(148, 163, 184, 0.6)',
          secondary: 'rgba(203, 213, 225, 0.4)',
          accent: 'rgba(100, 116, 139, 0.8)'
        }
    }
  }

  const colors = getBiomeColors()

  const renderBarsVisualizer = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 flex items-end justify-center gap-1 px-4">
        {frequencyData.map((value, index) => {
          const height = Math.max(4, value * 100)
          const delay = index * 0.01
          const color = index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : colors.accent
          
          return (
            <motion.div
              key={index}
              className="flex-1 max-w-[20px] rounded-t-full origin-bottom"
              style={{
                background: `linear-gradient(to top, ${color}, ${colors.accent})`,
                boxShadow: `0 -2px 10px ${color}`,
              }}
              animate={{
                height: `${height}%`,
                opacity: 0.3 + value * 0.7,
              }}
              transition={{
                duration: 0.1,
                delay,
                ease: 'easeOut',
              }}
            />
          )
        })}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom, ${colors.primary} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 py-2">
        {frequencyData.slice(0, 16).map((value, index) => {
          const size = 4 + value * 8
          const color = index % 2 === 0 ? colors.primary : colors.secondary
          
          return (
            <motion.div
              key={`particle-${index}`}
              className="rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 10px ${color}`,
              }}
              animate={{
                width: size,
                height: size,
                y: [-5, 5, -5],
                opacity: 0.3 + value * 0.7,
              }}
              transition={{
                width: { duration: 0.1 },
                height: { duration: 0.1 },
                y: {
                  duration: 1 + index * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.1 },
              }}
            />
          )
        })}
      </div>
    </motion.div>
  )

  const renderWaveformVisualizer = () => {
    const avgFrequency = frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full"
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="50%" stopColor={colors.accent} stopOpacity="1" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <motion.path
            d={`M 0 ${50} ${frequencyData.map((value, i) => {
              const x = (i / frequencyData.length) * 100
              const y = 50 - value * 40
              return `L ${x} ${y}`
            }).join(' ')} L 100 50 Z`}
            fill="url(#waveGradient)"
            opacity={0.3 + avgFrequency * 0.4}
            animate={{
              d: `M 0 ${50} ${frequencyData.map((value, i) => {
                const x = (i / frequencyData.length) * 100
                const y = 50 - value * 40
                return `L ${x} ${y}`
              }).join(' ')} L 100 50 Z`,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          
          <motion.path
            d={`M 0 ${50} ${frequencyData.map((value, i) => {
              const x = (i / frequencyData.length) * 100
              const y = 50 - value * 40
              return `L ${x} ${y}`
            }).join(' ')}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth="2"
            opacity={0.6 + avgFrequency * 0.4}
            animate={{
              d: `M 0 ${50} ${frequencyData.map((value, i) => {
                const x = (i / frequencyData.length) * 100
                const y = 50 - value * 40
                return `L ${x} ${y}`
              }).join(' ')}`,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          
          <motion.path
            d={`M 0 ${50} ${frequencyData.map((value, i) => {
              const x = (i / frequencyData.length) * 100
              const y = 50 + value * 40
              return `L ${x} ${y}`
            }).join(' ')} L 100 50 Z`}
            fill="url(#waveGradient)"
            opacity={0.2 + avgFrequency * 0.3}
            animate={{
              d: `M 0 ${50} ${frequencyData.map((value, i) => {
                const x = (i / frequencyData.length) * 100
                const y = 50 + value * 40
                return `L ${x} ${y}`
              }).join(' ')} L 100 50 Z`,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          
          <motion.path
            d={`M 0 ${50} ${frequencyData.map((value, i) => {
              const x = (i / frequencyData.length) * 100
              const y = 50 + value * 40
              return `L ${x} ${y}`
            }).join(' ')}`}
            fill="none"
            stroke={colors.primary}
            strokeWidth="2"
            opacity={0.5 + avgFrequency * 0.4}
            animate={{
              d: `M 0 ${50} ${frequencyData.map((value, i) => {
                const x = (i / frequencyData.length) * 100
                const y = 50 + value * 40
                return `L ${x} ${y}`
              }).join(' ')}`,
            }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </svg>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.primary} 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    )
  }

  const renderCircularVisualizer = () => {
    const avgFrequency = frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="relative w-64 h-64">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.accent} 0%, ${colors.primary} 50%, transparent 100%)`,
            }}
            animate={{
              scale: [1, 1.2 + avgFrequency * 0.3, 1],
              opacity: [0.3, 0.5 + avgFrequency * 0.3, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            {frequencyData.map((value, index) => {
              const angle = (index / frequencyData.length) * 2 * Math.PI - Math.PI / 2
              const radius = 60
              const barLength = value * 40
              const x1 = 100 + Math.cos(angle) * radius
              const y1 = 100 + Math.sin(angle) * radius
              const x2 = 100 + Math.cos(angle) * (radius + barLength)
              const y2 = 100 + Math.sin(angle) * (radius + barLength)
              const color = index % 3 === 0 ? colors.accent : index % 3 === 1 ? colors.primary : colors.secondary
              
              return (
                <motion.line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x1}
                  y2={y1}
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{
                    x2,
                    y2,
                    opacity: 0.3 + value * 0.7,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: 'easeOut',
                  }}
                />
              )
            })}
          </svg>

          {[...Array(3)].map((_, ringIndex) => (
            <motion.div
              key={ringIndex}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${40 + ringIndex * 30}%`,
                height: `${40 + ringIndex * 30}%`,
                border: `2px solid ${ringIndex === 0 ? colors.accent : ringIndex === 1 ? colors.primary : colors.secondary}`,
                opacity: 0.15 + avgFrequency * 0.3,
              }}
              animate={{
                scale: [1, 1.1 + avgFrequency * 0.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                scale: {
                  duration: 1.5 + ringIndex * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 10 + ringIndex * 5,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.accent}, ${colors.primary})`,
              boxShadow: `0 0 30px ${colors.accent}`,
            }}
            animate={{
              scale: [1, 1.1 + avgFrequency * 0.5, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence mode="wait">
        {isPlaying && (
          <div key={style}>
            {style === 'bars' && renderBarsVisualizer()}
            {style === 'waveform' && renderWaveformVisualizer()}
            {style === 'circular' && renderCircularVisualizer()}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
