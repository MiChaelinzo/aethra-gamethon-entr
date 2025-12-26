import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  rotationSpeed: number
  shape: 'circle' | 'square' | 'triangle' | 'star'
}

interface ConfettiCelebrationProps {
  isActive: boolean
  onComplete?: () => void
  duration?: number
  particleCount?: number
}

const COLORS = [
  'oklch(0.75 0.20 135)',
  'oklch(0.52 0.14 155)',
  'oklch(0.65 0.15 230)',
  'oklch(0.80 0.18 45)',
  'oklch(0.70 0.22 340)',
  'oklch(0.85 0.15 90)',
]

const generateConfettiPiece = (index: number, total: number): ConfettiPiece => {
  const angle = (index / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
  const velocity = 8 + Math.random() * 12
  
  return {
    id: index,
    x: 50,
    y: 50,
    rotation: Math.random() * 360,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 8 + Math.random() * 12,
    velocityX: Math.cos(angle) * velocity,
    velocityY: Math.sin(angle) * velocity - 15,
    rotationSpeed: (Math.random() - 0.5) * 20,
    shape: ['circle', 'square', 'triangle', 'star'][Math.floor(Math.random() * 4)] as ConfettiPiece['shape']
  }
}

export function ConfettiCelebration({ 
  isActive, 
  onComplete, 
  duration = 4000,
  particleCount = 80
}: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (isActive) {
      const pieces = Array.from({ length: particleCount }, (_, i) => 
        generateConfettiPiece(i, particleCount)
      )
      setConfetti(pieces)

      const timer = setTimeout(() => {
        setConfetti([])
        onComplete?.()
      }, duration)

      return () => clearTimeout(timer)
    } else {
      setConfetti([])
    }
  }, [isActive, duration, particleCount, onComplete])

  const getShapePath = (shape: ConfettiPiece['shape'], size: number) => {
    const half = size / 2
    switch (shape) {
      case 'circle':
        return null
      case 'square':
        return null
      case 'triangle':
        return `polygon(50% 0%, 0% 100%, 100% 100%)`
      case 'star':
        return `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confetti.map((piece) => {
            const clipPath = getShapePath(piece.shape, piece.size)
            
            return (
              <motion.div
                key={piece.id}
                className="absolute"
                style={{
                  width: piece.size,
                  height: piece.size,
                  left: `${piece.x}%`,
                  top: `${piece.y}%`,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: piece.rotation,
                  opacity: 1,
                }}
                animate={{
                  x: piece.velocityX * 50,
                  y: piece.velocityY * 50 + 600,
                  rotate: piece.rotation + piece.rotationSpeed * 100,
                  opacity: [1, 1, 1, 0.8, 0],
                }}
                transition={{
                  duration: duration / 1000,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: piece.color,
                    borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : '0',
                    clipPath: clipPath || undefined,
                    boxShadow: `0 0 ${piece.size / 2}px ${piece.color}`,
                  }}
                />
              </motion.div>
            )
          })}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl px-12 py-8 shadow-2xl border-4 border-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                scale: [1, 1.1, 1],
              }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: 0.6,
                scale: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }
              }}
            >
              <motion.div
                className="text-center"
                animate={{
                  rotate: [0, -3, 3, -3, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <div className="text-7xl mb-4">🔥</div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  STREAK MASTER!
                </h2>
                <p className="text-xl text-white/90 font-medium">
                  7 Day Streak Achieved!
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.3, 0] }}
            transition={{ duration: duration / 1000 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.2) 0%, transparent 70%)',
            }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
