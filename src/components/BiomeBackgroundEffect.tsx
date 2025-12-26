import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BiomeBackgroundEffectProps {
  biome: string
  isActive: boolean
}

export function BiomeBackgroundEffect({ biome, isActive }: BiomeBackgroundEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      const particleCount = getParticleCount(biome)
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        delay: Math.random() * 0.3
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => setParticles([]), 2000)
      return () => clearTimeout(timer)
    }
  }, [isActive, biome])

  const getParticleCount = (biome: string) => {
    switch (biome) {
      case 'forest': return 8
      case 'rainforest': return 12
      case 'ocean': return 10
      case 'tundra': return 15
      case 'desert': return 6
      case 'city': return 5
      default: return 8
    }
  }

  const renderBiomeEffect = () => {
    switch (biome) {
      case 'forest':
      case 'rainforest':
        return (
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-4 h-6"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%'
                }}
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: '120vh',
                  opacity: [0, 1, 1, 0],
                  rotate: Math.random() * 360,
                  x: Math.sin(particle.id) * 50
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: particle.delay,
                  ease: 'linear'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path
                    d="M12 2C9 10 3 11 3 17c0 2.76 2.24 5 5 5 3.5 0 6-3 6-6 0-3 3-4 7-11-5 3-6 4-9 1z"
                    fill={biome === 'rainforest' ? '#10b981' : '#22c55e'}
                    opacity="0.6"
                  />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        )

      case 'ocean':
        return (
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '0%',
                  width: `${40 + Math.random() * 60}px`,
                  height: `${40 + Math.random() * 60}px`
                }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{
                  y: -300 - Math.random() * 200,
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 1.5]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: particle.delay,
                  ease: 'easeOut'
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
                    border: '2px solid rgba(34,211,238,0.3)'
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )

      case 'tundra':
        return (
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%'
                }}
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: '110vh',
                  opacity: [0, 1, 1, 1, 0],
                  rotate: Math.random() * 360,
                  x: Math.cos(particle.id) * 100
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: particle.delay,
                  ease: 'linear'
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                  <path
                    d="M12 2v20M2 12h20M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66"
                    stroke="#a5f3fc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <circle cx="12" cy="12" r="2" fill="#cffafe" opacity="0.8" />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        )

      case 'desert':
        return (
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '0%'
                }}
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{
                  y: -400,
                  opacity: [0, 0.8, 0.8, 0],
                  scale: [0.5, 1.5, 2, 2.5],
                  rotate: [0, 90, 180]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2.5,
                  delay: particle.delay,
                  ease: 'easeOut'
                }}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="#fbbf24"
                    opacity="0.6"
                  />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        )

      case 'city':
        return (
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: particle.delay,
                  ease: 'easeOut'
                }}
              >
                <div
                  className="w-16 h-16"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
                    boxShadow: '0 0 20px rgba(59,130,246,0.4)'
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )

      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {renderBiomeEffect()}
    </div>
  )
}
