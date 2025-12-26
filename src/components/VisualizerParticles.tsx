import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getVisualizerColors } from '@/lib/visualizerThemes'
import { VisualizerStyle } from '@/lib/types'

interface Particle {
  id: string
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  life: number
  maxLife: number
  opacity: number
}

interface VisualizerParticlesProps {
  isPlaying: boolean
  biome: string
  style: VisualizerStyle
  intensity?: number
}

export function VisualizerParticles({ isPlaying, biome, style, intensity = 0.5 }: VisualizerParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastSpawnTimeRef = useRef<number>(0)
  const colors = getVisualizerColors(biome, style)

  const particleColors = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.gradient.start,
    colors.gradient.middle,
    colors.gradient.end
  ]

  const createParticle = (forceX?: number, forceY?: number): Particle => {
    const baseId = Date.now().toString() + Math.random().toString(36).substring(2, 9)
    const x = forceX ?? Math.random() * 100
    const y = forceY ?? (style === 'bars' ? 100 : style === 'circular' ? 50 : Math.random() * 100)
    
    let speedX: number
    let speedY: number
    let size: number
    
    if (style === 'bars') {
      speedX = (Math.random() - 0.5) * 0.3
      speedY = -(Math.random() * 1.5 + 0.5)
      size = Math.random() * 6 + 2
    } else if (style === 'circular') {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.8 + 0.4
      speedX = Math.cos(angle) * speed
      speedY = Math.sin(angle) * speed
      size = Math.random() * 8 + 3
    } else {
      speedX = (Math.random() - 0.5) * 0.6
      speedY = (Math.random() - 0.5) * 0.6
      size = Math.random() * 7 + 3
    }

    const biomeSize = (() => {
      switch (biome) {
        case 'forest':
        case 'rainforest':
          return size * 1.1
        case 'ocean':
          return size * 0.9
        case 'desert':
          return size * 1.2
        case 'tundra':
          return size * 0.8
        case 'city':
          return size * 1.0
        default:
          return size
      }
    })()

    return {
      id: baseId,
      x,
      y,
      size: biomeSize,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX,
      speedY,
      life: 0,
      maxLife: Math.random() * 60 + 60,
      opacity: Math.random() * 0.6 + 0.3
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      setParticles([])
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const animate = (currentTime: number) => {
      if (currentTime - lastSpawnTimeRef.current > 100 / (intensity * 2)) {
        setParticles(prev => {
          const newParticles = [...prev]
          
          const baseCount = style === 'bars' ? 2 : style === 'circular' ? 4 : 3
          const particlesToSpawn = Math.floor(intensity * baseCount + 1)
          
          for (let i = 0; i < particlesToSpawn; i++) {
            if (style === 'circular') {
              newParticles.push(createParticle(50, 50))
            } else if (style === 'bars') {
              const barPosition = Math.random() * 100
              newParticles.push(createParticle(barPosition, 95 + Math.random() * 5))
            } else {
              newParticles.push(createParticle())
            }
          }
          
          return newParticles
            .map(p => ({
              ...p,
              x: p.x + p.speedX,
              y: p.y + p.speedY,
              life: p.life + 1,
              opacity: p.opacity * (1 - p.life / p.maxLife)
            }))
            .filter(p => p.life < p.maxLife && p.x >= -10 && p.x <= 110 && p.y >= -10 && p.y <= 110)
            .slice(-200)
        })
        
        lastSpawnTimeRef.current = currentTime
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, intensity, style, biome])

  const getParticleShape = (particle: Particle) => {
    const biomeSpecificEffect = () => {
      switch (biome) {
        case 'forest':
        case 'rainforest':
          return 'drop-shadow(0 0 3px rgba(34, 197, 94, 0.6))'
        case 'ocean':
          return 'drop-shadow(0 0 3px rgba(59, 130, 246, 0.6))'
        case 'desert':
          return 'drop-shadow(0 0 3px rgba(251, 146, 60, 0.6))'
        case 'tundra':
          return 'drop-shadow(0 0 3px rgba(125, 211, 252, 0.6))'
        case 'city':
          return 'drop-shadow(0 0 3px rgba(168, 85, 247, 0.6))'
        default:
          return 'drop-shadow(0 0 3px rgba(148, 163, 184, 0.6))'
      }
    }

    switch (style) {
      case 'bars':
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              opacity: particle.opacity,
              filter: biomeSpecificEffect(),
            }}
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1, y: -20 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )
      
      case 'circular':
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              filter: biomeSpecificEffect(),
            }}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )
      
      case 'waveform':
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              filter: biomeSpecificEffect(),
            }}
          >
            <svg width={particle.size * 2} height={particle.size * 2} viewBox="0 0 20 20">
              <motion.path
                d="M10 2 L15 10 L10 18 L5 10 Z"
                fill={particle.color}
                filter={`drop-shadow(0 0 ${particle.size}px ${particle.color})`}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </svg>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  if (!isPlaying) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence mode="sync">
        {particles.map(particle => getParticleShape(particle))}
      </AnimatePresence>

      {style === 'circular' && (
        <>
          <motion.div
            className="absolute left-1/2 bottom-16 -translate-x-1/2"
            animate={{
              scale: [1, 1.2 + intensity * 0.3, 1],
              opacity: [0.2, 0.4 + intensity * 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-32 h-32 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${colors.accent} 0%, ${colors.glow} 50%, transparent 100%)`,
              }}
            />
          </motion.div>

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute left-1/2 bottom-16 origin-center"
              style={{
                width: 4,
                height: 4,
              }}
              animate={{
                rotate: [0, 360],
                x: [
                  Math.cos((i / 8) * Math.PI * 2) * (60 + intensity * 40),
                  Math.cos((i / 8) * Math.PI * 2 + Math.PI) * (60 + intensity * 40),
                ],
                y: [
                  Math.sin((i / 8) * Math.PI * 2) * (60 + intensity * 40),
                  Math.sin((i / 8) * Math.PI * 2 + Math.PI) * (60 + intensity * 40),
                ],
              }}
              transition={{
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                },
                x: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.primary : colors.secondary,
                  boxShadow: `0 0 10px ${i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.primary : colors.secondary}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {style === 'bars' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute bottom-0 w-1 h-full origin-bottom"
              style={{
                left: `${20 + i * 15}%`,
                background: `linear-gradient(to top, ${colors.gradient.start}, transparent)`,
                opacity: 0.1 + intensity * 0.2,
              }}
              animate={{
                scaleY: [0.3, 0.7 + intensity * 0.4, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(90deg, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end}, ${colors.gradient.middle}, ${colors.gradient.start})`,
              opacity: 0.3 + intensity * 0.4,
              boxShadow: `0 -2px 20px ${colors.glow}`,
            }}
            animate={{
              opacity: [0.2 + intensity * 0.3, 0.5 + intensity * 0.5, 0.2 + intensity * 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute bottom-0 w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 8}%`,
                background: i % 2 === 0 ? colors.accent : colors.secondary,
                boxShadow: `0 0 10px ${i % 2 === 0 ? colors.accent : colors.secondary}`,
              }}
              animate={{
                y: [-10, -80 - intensity * 40, -10],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.15,
              }}
            />
          ))}
        </>
      )}

      {style === 'waveform' && (
        <>
          {[...Array(3)].map((_, layerIndex) => (
            <motion.div
              key={`wave-layer-${layerIndex}`}
              className="absolute inset-x-0"
              style={{
                top: `${30 + layerIndex * 15}%`,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${
                  layerIndex === 0 ? colors.primary : layerIndex === 1 ? colors.secondary : colors.accent
                }, transparent)`,
                opacity: 0.3 + intensity * 0.4,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8 - layerIndex * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`wave-particle-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${5 + i * 4.5}%`,
                background: i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.primary : colors.secondary,
                boxShadow: `0 0 15px ${i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.primary : colors.secondary}`,
              }}
              animate={{
                y: [
                  `${40 + Math.sin((i / 20) * Math.PI * 4) * 20}%`,
                  `${40 + Math.sin((i / 20) * Math.PI * 4 + Math.PI) * 20 - intensity * 20}%`,
                ],
                opacity: [0.4 + intensity * 0.3, 0.8 + intensity * 0.2, 0.4 + intensity * 0.3],
                scale: [1, 1.3 + intensity * 0.5, 1],
              }}
              transition={{
                duration: 2 + (i % 5) * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${colors.gradient.middle}, transparent)`,
            }}
            animate={{
              scale: [1, 1.3 + intensity * 0.5, 1],
              opacity: [0.1, 0.25 + intensity * 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
    </div>
  )
}
