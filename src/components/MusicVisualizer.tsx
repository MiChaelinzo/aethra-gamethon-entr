import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAudioAnalyser } from '../lib/backgroundMusic'

interface MusicVisualizerProps {
  isPlaying: boolean
  biome?: string
}

export function MusicVisualizer({ isPlaying, biome = 'menu' }: MusicVisualizerProps) {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {isPlaying && (
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

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, ringIndex) => {
                const avgFrequency = frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length
                const scale = 1 + avgFrequency * 2
                
                return (
                  <motion.div
                    key={ringIndex}
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full"
                    style={{
                      width: `${40 + ringIndex * 60}%`,
                      height: `${40 + ringIndex * 60}%`,
                      border: `2px solid ${ringIndex === 0 ? colors.accent : ringIndex === 1 ? colors.primary : colors.secondary}`,
                      opacity: 0.1 + avgFrequency * 0.3,
                    }}
                    animate={{
                      scale: scale,
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 1.5 + ringIndex * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: ringIndex * 0.2,
                    }}
                  />
                )
              })}
            </div>

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
        )}
      </AnimatePresence>
    </div>
  )
}
