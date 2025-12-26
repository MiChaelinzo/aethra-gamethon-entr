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

const generateSpiralBurst = (burstX: number, burstY: number, themeConfig: any): Particle[] => {
  const particles: Particle[] = []
  const spiralCount = 3
  const particlesPerSpiral = 25
  
  for (let spiral = 0; spiral < spiralCount; spiral++) {
    const spiralOffset = (Math.PI * 2 * spiral) / spiralCount
    
    for (let i = 0; i < particlesPerSpiral; i++) {
      const progress = i / particlesPerSpiral
      const angle = progress * Math.PI * 6 + spiralOffset
      const radius = progress * 180
      
      const targetX = burstX + Math.cos(angle) * radius
      const targetY = burstY + Math.sin(angle) * radius
      
      particles.push({
        id: Date.now() + spiral * particlesPerSpiral + i,
        x: burstX,
        y: burstY,
        vx: (targetX - burstX) / 40,
        vy: (targetY - burstY) / 40,
        rotation: angle * (180 / Math.PI),
        rotationSpeed: 15 + Math.random() * 10,
        scale: 0.6 + Math.random() * 1.2,
        color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
        shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
        life: 1,
        maxLife: 0.8 + progress * 0.3
      })
    }
  }
  
  return particles
}

const generateWaveBurst = (burstX: number, burstY: number, themeConfig: any): Particle[] => {
  const particles: Particle[] = []
  const waveCount = 5
  const particlesPerWave = 20
  
  for (let wave = 0; wave < waveCount; wave++) {
    const waveDelay = wave * 0.15
    
    for (let i = 0; i < particlesPerWave; i++) {
      const angle = (Math.PI * 2 * i) / particlesPerWave
      const waveRadius = 50 + wave * 40
      const amplitude = 20 + Math.random() * 15
      const frequency = 3
      
      const baseVx = Math.cos(angle) * waveRadius / 30
      const baseVy = Math.sin(angle) * waveRadius / 30
      
      const waveOffsetX = Math.sin(angle * frequency) * amplitude / 30
      const waveOffsetY = Math.cos(angle * frequency) * amplitude / 30
      
      particles.push({
        id: Date.now() + wave * particlesPerWave + i,
        x: burstX,
        y: burstY,
        vx: baseVx + waveOffsetX,
        vy: baseVy + waveOffsetY,
        rotation: angle * (180 / Math.PI),
        rotationSpeed: Math.sin(angle * frequency) * 10,
        scale: 0.7 + Math.random() * 1.0,
        color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
        shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
        life: 1,
        maxLife: 0.7 + waveDelay
      })
    }
  }
  
  return particles
}

const generateRadialBurst = (burstX: number, burstY: number, themeConfig: any): Particle[] => {
  const particles: Particle[] = []
  const ringCount = 4
  const particlesPerRing = 15
  
  for (let ring = 0; ring < ringCount; ring++) {
    for (let i = 0; i < particlesPerRing; i++) {
      const angle = (Math.PI * 2 * i) / particlesPerRing + (Math.random() - 0.5) * 0.3
      const baseSpeed = 3 + ring * 1.5
      const speed = baseSpeed + Math.random() * 2
      
      particles.push({
        id: Date.now() + ring * particlesPerRing + i,
        x: burstX,
        y: burstY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 25,
        scale: 0.8 + Math.random() * 1.5,
        color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
        shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
        life: 1,
        maxLife: 0.6 + Math.random() * 0.5
      })
    }
  }
  
  return particles
}

const generateCometBurst = (burstX: number, burstY: number, themeConfig: any): Particle[] => {
  const particles: Particle[] = []
  const cometCount = 12
  const tailParticles = 8
  
  for (let i = 0; i < cometCount; i++) {
    const angle = (Math.PI * 2 * i) / cometCount + (Math.random() - 0.5) * 0.4
    const speed = 4 + Math.random() * 3
    
    for (let j = 0; j < tailParticles; j++) {
      const tailProgress = j / tailParticles
      const delay = tailProgress * 0.3
      
      particles.push({
        id: Date.now() + i * tailParticles + j,
        x: burstX - Math.cos(angle) * 15 * tailProgress,
        y: burstY - Math.sin(angle) * 15 * tailProgress,
        vx: Math.cos(angle) * speed * (1 - tailProgress * 0.3),
        vy: Math.sin(angle) * speed * (1 - tailProgress * 0.3),
        rotation: angle * (180 / Math.PI),
        rotationSpeed: (Math.random() - 0.5) * 15,
        scale: (1 - tailProgress * 0.6) * (0.8 + Math.random() * 0.8),
        color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
        shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
        life: 1,
        maxLife: 0.5 + delay + Math.random() * 0.4
      })
    }
  }
  
  return particles
}

const generateFlameBurst = (burstX: number, burstY: number, themeConfig: any): Particle[] => {
  const particles: Particle[] = []
  const flameColumns = 8
  const particlesPerColumn = 12
  
  for (let col = 0; col < flameColumns; col++) {
    const angleOffset = (Math.PI * 2 * col) / flameColumns
    const radiusOffset = 30 + Math.random() * 20
    
    for (let i = 0; i < particlesPerColumn; i++) {
      const upwardProgress = i / particlesPerColumn
      const wobble = Math.sin(upwardProgress * Math.PI * 3) * 25
      
      const startX = burstX + Math.cos(angleOffset) * radiusOffset + wobble
      const startY = burstY + Math.sin(angleOffset) * radiusOffset
      
      particles.push({
        id: Date.now() + col * particlesPerColumn + i,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -3 - Math.random() * 2.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        scale: (1 - upwardProgress * 0.7) * (0.7 + Math.random() * 1.0),
        color: themeConfig.colors[Math.floor((1 - upwardProgress) * (themeConfig.colors.length - 1))],
        shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
        life: 1,
        maxLife: 0.5 + upwardProgress * 0.6
      })
    }
  }
  
  return particles
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

    let newParticles: Particle[] = []

    switch (themeConfig.specialEffect) {
      case 'spiral':
        newParticles = generateSpiralBurst(burstX, burstY, themeConfig)
        break
      case 'wave':
        newParticles = generateWaveBurst(burstX, burstY, themeConfig)
        break
      case 'burst':
        newParticles = generateRadialBurst(burstX, burstY, themeConfig)
        break
      case 'comet':
        newParticles = generateCometBurst(burstX, burstY, themeConfig)
        break
      case 'flame':
        newParticles = generateFlameBurst(burstX, burstY, themeConfig)
        break
      default:
        newParticles = generateRadialBurst(burstX, burstY, themeConfig)
    }

    setParticles(newParticles)

    const animationDuration = 1400
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
        prevParticles.map(p => {
          let newVy = p.vy
          let newVx = p.vx
          
          if (themeConfig.specialEffect === 'flame') {
            newVy = p.vy - 0.05
            newVx = p.vx * 0.98
          } else if (themeConfig.specialEffect === 'wave') {
            newVy = p.vy + Math.sin(elapsed * 0.01) * 0.05
          } else {
            newVy = p.vy + 0.08
          }
          
          return {
            ...p,
            x: p.x + p.vx * 3,
            y: p.y + newVy * 3,
            vx: newVx,
            vy: newVy,
            rotation: p.rotation + p.rotationSpeed,
            life: 1 - (progress / p.maxLife)
          }
        }).filter(p => p.life > 0)
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
              opacity: Math.max(0, particle.life),
              filter: `drop-shadow(0 0 ${8 * particle.life}px ${particle.color})`
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
