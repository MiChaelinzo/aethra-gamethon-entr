import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrailTheme } from '../lib/types'
import { getThemeConfig } from '../lib/trailThemes'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  life: number
  maxLife: number
  rotation: number
  rotationSpeed: number
  shape: 'circle' | 'square' | 'star' | 'diamond' | 'hexagon'
}

interface ParticleThemePreviewProps {
  theme: TrailTheme
  width?: number
  height?: number
  isActive?: boolean
}

export function ParticleThemePreview({ 
  theme, 
  width = 200, 
  height = 120,
  isActive = false
}: ParticleThemePreviewProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const canvasRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const spawnTimeRef = useRef(0)

  const themeConfig = getThemeConfig(theme)

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const spawnParticles = (timestamp: number) => {
      if (timestamp - spawnTimeRef.current > 150) {
        spawnTimeRef.current = timestamp

        const centerX = width / 2
        const centerY = height / 2
        const newParticles: Particle[] = []

        for (let i = 0; i < 3; i++) {
          let angle: number
          let speed: number
          
          switch (themeConfig.specialEffect) {
            case 'burst':
              angle = (Math.PI * 2 * i) / 3 + Math.random() * 0.5
              speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
              break
            case 'wave':
              angle = Math.sin(timestamp / 500 + i) * Math.PI
              speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
              break
            case 'comet':
              angle = Math.PI + (Math.random() - 0.5) * 0.5
              speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
              break
            case 'flame':
              angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8
              speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
              break
            case 'spiral':
              angle = ((timestamp / 100 + i * 60) % 360) * (Math.PI / 180)
              speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
              break
            default:
              angle = Math.random() * Math.PI * 2
              speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
          }

          const size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
          const life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min

          newParticles.push({
            id: particleIdRef.current++,
            x: centerX,
            y: centerY,
            color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
            size,
            velocityX: Math.cos(angle) * speed * 0.3,
            velocityY: Math.sin(angle) * speed * 0.3,
            life,
            maxLife: life,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * (themeConfig.rotationSpeed.max - themeConfig.rotationSpeed.min) + themeConfig.rotationSpeed.min,
            shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)]
          })
        }

        setParticles(prev => [...prev, ...newParticles].slice(-50))
      }

      setParticles(prev => {
        return prev
          .map(particle => {
            let newY = particle.y + particle.velocityY
            let newVelocityY = particle.velocityY

            if (themeConfig.specialEffect === 'flame') {
              newVelocityY = particle.velocityY - 0.05
            } else if (themeConfig.specialEffect === 'wave') {
              newY += Math.sin(particle.x / 20 + timestamp / 500) * 0.3
            } else {
              newVelocityY = particle.velocityY + 0.08
            }

            return {
              ...particle,
              x: particle.x + particle.velocityX,
              y: newY,
              velocityY: newVelocityY,
              life: particle.life - 1,
              size: particle.size * 0.985,
              rotation: particle.rotation + particle.rotationSpeed
            }
          })
          .filter(particle => 
            particle.life > 0 && 
            particle.size > 0.5 &&
            particle.x >= 0 && particle.x <= width &&
            particle.y >= 0 && particle.y <= height
          )
      })

      animationFrameRef.current = requestAnimationFrame(spawnParticles)
    }

    animationFrameRef.current = requestAnimationFrame(spawnParticles)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, theme, themeConfig, width, height])

  const getShapeStyles = (particle: Particle) => {
    const baseStyles = {
      left: particle.x - particle.size / 2,
      top: particle.y - particle.size / 2,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: (particle.life / particle.maxLife) * 0.8,
      boxShadow: `0 0 ${particle.size * themeConfig.glowIntensity}px ${particle.color}`,
      transform: `rotate(${particle.rotation}deg)`
    }

    switch (particle.shape) {
      case 'square':
        return { ...baseStyles, borderRadius: '20%' }
      case 'star':
        return { 
          ...baseStyles, 
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          borderRadius: '0'
        }
      case 'diamond':
        return { 
          ...baseStyles, 
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          borderRadius: '0'
        }
      case 'hexagon':
        return { 
          ...baseStyles, 
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
          borderRadius: '0'
        }
      default:
        return { ...baseStyles, borderRadius: '50%' }
    }
  }

  return (
    <div 
      ref={canvasRef}
      className="relative bg-gradient-to-br from-background to-muted rounded-lg overflow-hidden border"
      style={{ width, height }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-medium">
        {isActive ? 'Preview' : 'Hover to preview'}
      </div>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={getShapeStyles(particle)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      ))}
    </div>
  )
}
