import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrailTheme } from '@/lib/types'
import { TRAIL_THEMES } from '@/lib/trailThemes'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  scale: number
  color: string
  shape: string
  life: number
  maxLife: number
}

interface ThemeSwitchBurstProps {
  theme: TrailTheme
  trigger: number
  x?: number
  y?: number
}

const ShapeRenderer = ({ shape, color, size }: { shape: string; color: string; size: number }) => {
  switch (shape) {
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={color}
            stroke={color}
            strokeWidth="1"
          />
        </svg>
      )
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
          <path
            d="M12 2L22 12L12 22L2 12Z"
            fill={color}
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'hexagon':
      return (
        <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
          <path
            d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
            fill={color}
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'square':
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '4px',
            border: `1px solid ${color}`
          }}
        />
      )
    default:
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '50%',
            boxShadow: `0 0 ${size}px ${color}`
          }}
        />
      )
  }
}

export function ThemeSwitchBurst({ theme, trigger, x, y }: ThemeSwitchBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger === 0) return

    const themeConfig = TRAIL_THEMES[theme]
    setIsActive(true)

    const burstX = x ?? window.innerWidth / 2
    const burstY = y ?? window.innerHeight / 2

    const particleCount = 40
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3
      const speed = 2 + Math.random() * 4
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      
      newParticles.push({
        id: Date.now() + i,
        x: burstX,
        y: burstY,
        vx,
        vy,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        scale: 0.5 + Math.random() * 1.5,
        color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
        shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4
      })
    }

    setParticles(newParticles)

    const animationDuration = 1200
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / animationDuration

      if (progress >= 1) {
        setParticles([])
        setIsActive(false)
        return
      }

      setParticles(prevParticles =>
        prevParticles.map(p => ({
          ...p,
          x: p.x + p.vx * 3,
          y: p.y + p.vy * 3 + 0.5,
          rotation: p.rotation + p.rotationSpeed,
          life: 1 - (progress / p.maxLife),
          vy: p.vy + 0.08
        })).filter(p => p.life > 0)
      )

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      setParticles([])
      setIsActive(false)
    }
  }, [trigger, theme, x, y])

  if (!isActive && particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
              opacity: particle.life,
              filter: `drop-shadow(0 0 8px ${particle.color})`
            }}
          >
            <ShapeRenderer
              shape={particle.shape}
              color={particle.color}
              size={16}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
