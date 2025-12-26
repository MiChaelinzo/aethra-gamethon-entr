import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
  shape: 'circle' | 'square' | 'star'
}

interface MouseTrailProps {
  isActive: boolean
  biome: string
  intensity?: 'low' | 'medium' | 'high'
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

export function MouseTrail({ isActive, biome, intensity = 'medium' }: MouseTrailProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const particleIdRef = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)
  const moveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const particleCount = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1
  const colors = BIOME_COLORS[biome] || BIOME_COLORS.menu

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
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 1
        const size = Math.random() * 8 + 4
        const life = Math.random() * 30 + 40
        const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'circle', 'square', 'star']
        
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
          rotationSpeed: (Math.random() - 0.5) * 10,
          shape: shapes[Math.floor(Math.random() * shapes.length)]
        })
      }

      setParticles(prev => [...prev, ...newParticles].slice(-150))
    }

    addParticles()
  }, [mousePos, isMoving, isActive, particleCount, colors])

  useEffect(() => {
    if (!isActive) return

    const animate = () => {
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            velocityY: particle.velocityY + 0.15,
            life: particle.life - 1,
            size: particle.size * 0.98,
            rotation: particle.rotation + particle.rotationSpeed
          }))
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
  }, [isActive])

  if (!isActive) return null

  const getShapeStyles = (particle: Particle) => {
    const baseStyles = {
      left: particle.x - particle.size / 2,
      top: particle.y - particle.size / 2,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      opacity: (particle.life / particle.maxLife) * 0.8,
      boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
      transform: `rotate(${particle.rotation}deg)`
    }

    switch (particle.shape) {
      case 'square':
        return { ...baseStyles, borderRadius: '20%' }
      case 'star':
        return { ...baseStyles, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }
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
