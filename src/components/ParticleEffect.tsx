import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ParticleConfig } from '@/lib/biomeEffects'

interface Particle {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
}

interface ParticleEffectProps {
  config: ParticleConfig
  isActive: boolean
  onComplete?: () => void
}

const ShapeComponent = ({ shape, color }: { shape: string; color: string }) => {
  switch (shape) {
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M12 2C9 10 3 11 3 17c0 2.76 2.24 5 5 5 3.5 0 6-3 6-6 0-3 3-4 7-11-5 3-6 4-9 1z"
            fill={color}
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'snowflake':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M12 2v20M2 12h20M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2" fill={color} />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={color}
            stroke={color}
            strokeWidth="1"
          />
        </svg>
      )
    case 'water':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
            fill={color}
            opacity="0.8"
          />
        </svg>
      )
    case 'lightning':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
            fill={color}
            stroke={color}
            strokeWidth="1"
          />
        </svg>
      )
    case 'petal':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <ellipse
            cx="12"
            cy="12"
            rx="6"
            ry="10"
            fill={color}
            opacity="0.9"
          />
        </svg>
      )
    default:
      return (
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      )
  }
}

export function ParticleEffect({ config, isActive, onComplete }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (isActive) {
      const newParticles: Particle[] = Array.from({ length: config.count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / config.count + (Math.random() - 0.5) * 0.5
        const distance = config.spread * (0.5 + Math.random() * 0.5)
        
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          color: config.colors[Math.floor(Math.random() * config.colors.length)]
        }
      })
      
      setParticles(newParticles)
      
      const timer = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, config.duration)
      
      return () => clearTimeout(timer)
    }
  }, [isActive, config, onComplete])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-3 h-3"
            initial={{
              x: -6,
              y: -6,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: particle.x - 6,
              y: particle.y - 6,
              scale: particle.scale,
              opacity: 0,
              rotate: particle.rotation
            }}
            exit={{
              scale: 0,
              opacity: 0
            }}
            transition={{
              duration: config.duration / 1000,
              ease: 'easeOut'
            }}
          >
            <ShapeComponent shape={config.shapes} color={particle.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
