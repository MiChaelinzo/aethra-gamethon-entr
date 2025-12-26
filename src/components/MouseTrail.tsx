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
  angle?: number
  distance?: number
}

interface MouseTrailProps {
  isActive: boolean
  biome: string
  intensity?: 'low' | 'medium' | 'high'
  theme?: TrailTheme
}

const BIOME_COLORS: Record<string, string[]> = {
  forest: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
  ocean: ['#3b82f6', '#60a5fa', '#93c5fd', '#06b6d4', '#67e8f9'],
  desert: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7'],
  arctic: ['#67e8f9', '#a5f3fc', '#e0f2fe', '#f0f9ff', '#ffffff'],
  volcano: ['#ef4444', '#f97316', '#fb923c', '#fbbf24', '#fde047'],
  tundra: ['#bae6fd', '#e0f2fe', '#dbeafe', '#e0e7ff', '#eef2ff'],
  rainforest: ['#22c55e', '#84cc16', '#a3e635', '#fde047', '#fef08a'],
  menu: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe']
}

export function MouseTrail({ isActive, biome, intensity = 'medium', theme = 'default' }: MouseTrailProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const particleIdRef = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)
  const moveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const particleCount = intensity === 'high' ? 4 : intensity === 'medium' ? 3 : 2
  const themeConfig = getThemeConfig(theme)
  const colors = themeConfig.colors.length > 0 ? themeConfig.colors : BIOME_COLORS[biome] || BIOME_COLORS.menu

  useEffect(() => {
    if (!isActive) {
      setParticles(() => [])
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY
      
      const distance = Math.sqrt(
        Math.pow(newX - lastPosRef.current.x, 2) + 
        Math.pow(newY - lastPosRef.current.y, 2)
      )

      if (distance > 5) {
        setMousePos(() => ({ x: newX, y: newY }))
        setIsMoving(() => true)
        lastPosRef.current = { x: newX, y: newY }

        if (moveTimeoutRef.current) {
          clearTimeout(moveTimeoutRef.current)
        }
        moveTimeoutRef.current = setTimeout(() => {
          setIsMoving(() => false)
        }, 100)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive || !isMoving) return

    const addParticles = () => {
      const newParticles: Particle[] = []
      
      for (let i = 0; i < particleCount; i++) {
        let angle: number
        let speed: number
        let size: number
        let life: number
        
        switch (themeConfig.specialEffect) {
          case 'burst':
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
            speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
            size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
            life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min
            break
          
          case 'wave':
            angle = Math.sin(Date.now() / 500 + i) * Math.PI
            speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
            size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
            life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min
            break
          
          case 'comet':
            const baseAngle = Math.atan2(mousePos.y - lastPosRef.current.y, mousePos.x - lastPosRef.current.x)
            angle = baseAngle + Math.PI + (Math.random() - 0.5) * 0.3
            speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
            size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
            life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min
            break
          
          case 'flame':
            angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8
            speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
            size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
            life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min
            break
          
          case 'spiral':
            const spiralAngle = (Date.now() / 100 + i * 60) % 360
            angle = (spiralAngle * Math.PI) / 180
            speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
            size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
            life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min
            break
          
          default:
            angle = Math.random() * Math.PI * 2
            speed = Math.random() * (themeConfig.particleSpeed.max - themeConfig.particleSpeed.min) + themeConfig.particleSpeed.min
            size = Math.random() * (themeConfig.particleSize.max - themeConfig.particleSize.min) + themeConfig.particleSize.min
            life = Math.random() * (themeConfig.particleLife.max - themeConfig.particleLife.min) + themeConfig.particleLife.min
        }
        
        newParticles.push({
          id: particleIdRef.current++,
          x: mousePos.x,
          y: mousePos.y,
          color: colors[Math.floor(Math.random() * colors.length)],
          size,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          life,
          maxLife: life,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * (themeConfig.rotationSpeed.max - themeConfig.rotationSpeed.min) + themeConfig.rotationSpeed.min,
          shape: themeConfig.particleShapes[Math.floor(Math.random() * themeConfig.particleShapes.length)],
          angle: themeConfig.specialEffect === 'spiral' ? angle : undefined,
          distance: themeConfig.specialEffect === 'spiral' ? 0 : undefined
        })
      }

      setParticles(prev => [...prev, ...newParticles].slice(-200))
    }

    addParticles()
  }, [mousePos, isMoving, isActive, particleCount, colors, themeConfig])

  useEffect(() => {
    if (!isActive) return

    const animate = () => {
      setParticles(prev => {
        return prev
          .map(particle => {
            let newX = particle.x + particle.velocityX
            let newY = particle.y + particle.velocityY
            let newVelocityY = particle.velocityY
            
            if (themeConfig.specialEffect === 'flame') {
              newVelocityY = particle.velocityY - 0.1
              newX += (Math.random() - 0.5) * 1.5
            } else if (themeConfig.specialEffect === 'wave') {
              newY += Math.sin(particle.x / 30 + Date.now() / 500) * 0.5
              newVelocityY = particle.velocityY + 0.05
            } else if (themeConfig.specialEffect === 'spiral') {
              const distance = (particle.distance || 0) + 0.5
              const currentAngle = (particle.angle || 0) + 0.05
              newX = particle.x + Math.cos(currentAngle) * distance
              newY = particle.y + Math.sin(currentAngle) * distance
              particle.angle = currentAngle
              particle.distance = distance
            } else {
              newVelocityY = particle.velocityY + 0.15
            }
            
            return {
              ...particle,
              x: newX,
              y: newY,
              velocityY: newVelocityY,
              life: particle.life - 1,
              size: particle.size * 0.98,
              rotation: particle.rotation + particle.rotationSpeed
            }
          })
          .filter(particle => particle.life > 0 && particle.size > 0.5)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, themeConfig.specialEffect])

  if (!isActive) return null

  const getShapeStyles = (particle: Particle) => {
    const baseStyles = {
      left: particle.x - particle.size / 2,
      top: particle.y - particle.size / 2,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: (particle.life / particle.maxLife) * 0.9,
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
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={getShapeStyles(particle)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      ))}
    </div>
  )
}
