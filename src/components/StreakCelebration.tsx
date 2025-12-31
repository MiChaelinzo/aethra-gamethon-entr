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
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'flame'
}

interface Firework {
  id: number
  x: number
  y: number
  color: string
  particles: Array<{
    angle: number
    velocity: number
    size: number
  }>
}

interface StreakCelebrationProps {
  isActive: boolean
  streakCount: number
  onComplete?: () => void
}

const STREAK_COLORS = {
  3: ['oklch(0.85 0.15 90)', 'oklch(0.80 0.18 45)', 'oklch(0.75 0.20 65)'],
  7: ['oklch(0.70 0.22 15)', 'oklch(0.75 0.20 340)', 'oklch(0.80 0.18 25)'],
  14: ['oklch(0.65 0.15 230)', 'oklch(0.70 0.20 280)', 'oklch(0.75 0.18 310)'],
  30: ['oklch(0.75 0.20 135)', 'oklch(0.70 0.22 155)', 'oklch(0.65 0.18 175)'],
  default: [
    'oklch(0.75 0.20 135)',
    'oklch(0.52 0.14 155)',
    'oklch(0.65 0.15 230)',
    'oklch(0.80 0.18 45)',
    'oklch(0.70 0.22 340)',
    'oklch(0.85 0.15 90)',
  ]
}

const STREAK_EMOJIS = {
  1: '🌱',
  3: '🔥',
  7: '⚡',
  14: '💎',
  30: '👑',
  50: '🌟',
  100: '🏆'
}

const STREAK_MESSAGES = {
  1: 'Great Start!',
  3: 'On Fire!',
  7: 'Streak Master!',
  14: 'Unstoppable!',
  30: 'Legendary!',
  50: 'Absolutely Insane!',
  100: 'Climate Champion!'
}

const generateConfettiPiece = (index: number, total: number, colors: string[]): ConfettiPiece => {
  const angle = (index / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
  const velocity = 8 + Math.random() * 12
  
  return {
    id: index,
    x: 50,
    y: 50,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 8 + Math.random() * 12,
    velocityX: Math.cos(angle) * velocity,
    velocityY: Math.sin(angle) * velocity - 15,
    rotationSpeed: (Math.random() - 0.5) * 20,
    shape: ['circle', 'square', 'triangle', 'star', 'flame'][Math.floor(Math.random() * 5)] as ConfettiPiece['shape']
  }
}

const generateFirework = (id: number): Firework => {
  const x = 20 + Math.random() * 60
  const y = 20 + Math.random() * 40
  const colors = ['oklch(0.85 0.20 15)', 'oklch(0.80 0.22 45)', 'oklch(0.90 0.15 90)']
  
  return {
    id,
    x,
    y,
    color: colors[Math.floor(Math.random() * colors.length)],
    particles: Array.from({ length: 30 }, (_, i) => ({
      angle: (i / 30) * Math.PI * 2,
      velocity: 5 + Math.random() * 8,
      size: 3 + Math.random() * 5
    }))
  }
}

export function StreakCelebration({ 
  isActive, 
  streakCount,
  onComplete
}: StreakCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [showRays, setShowRays] = useState(false)

  const getStreakEmoji = () => {
    if (streakCount >= 100) return STREAK_EMOJIS[100]
    if (streakCount >= 50) return STREAK_EMOJIS[50]
    if (streakCount >= 30) return STREAK_EMOJIS[30]
    if (streakCount >= 14) return STREAK_EMOJIS[14]
    if (streakCount >= 7) return STREAK_EMOJIS[7]
    if (streakCount >= 3) return STREAK_EMOJIS[3]
    return STREAK_EMOJIS[1]
  }

  const getStreakMessage = () => {
    if (streakCount >= 100) return STREAK_MESSAGES[100]
    if (streakCount >= 50) return STREAK_MESSAGES[50]
    if (streakCount >= 30) return STREAK_MESSAGES[30]
    if (streakCount >= 14) return STREAK_MESSAGES[14]
    if (streakCount >= 7) return STREAK_MESSAGES[7]
    if (streakCount >= 3) return STREAK_MESSAGES[3]
    return STREAK_MESSAGES[1]
  }

  const getStreakColors = () => {
    if (streakCount >= 30) return STREAK_COLORS[30]
    if (streakCount >= 14) return STREAK_COLORS[14]
    if (streakCount >= 7) return STREAK_COLORS[7]
    if (streakCount >= 3) return STREAK_COLORS[3]
    return STREAK_COLORS.default
  }

  const duration = streakCount >= 7 ? 6000 : 4000
  const particleCount = Math.min(100 + streakCount * 2, 200)
  const shouldShowFireworks = streakCount >= 7

  useEffect(() => {
    if (isActive) {
      const colors = getStreakColors()
      const pieces = Array.from({ length: particleCount }, (_, i) => 
        generateConfettiPiece(i, particleCount, colors)
      )
      setConfetti(pieces)
      setShowRays(true)

      if (shouldShowFireworks) {
        const fireworkIntervals: NodeJS.Timeout[] = []
        const fireworkCount = Math.min(Math.floor(streakCount / 7), 5)
        
        for (let i = 0; i < fireworkCount; i++) {
          const interval = setInterval(() => {
            setFireworks(prev => [...prev, generateFirework(Date.now() + Math.random())])
          }, 800 + i * 200)
          fireworkIntervals.push(interval)
        }

        setTimeout(() => {
          fireworkIntervals.forEach(clearInterval)
        }, duration - 1000)
      }

      const timer = setTimeout(() => {
        setConfetti([])
        setFireworks([])
        setShowRays(false)
        onComplete?.()
      }, duration)

      return () => {
        clearTimeout(timer)
        setConfetti([])
        setFireworks([])
      }
    } else {
      setConfetti([])
      setFireworks([])
      setShowRays(false)
    }
  }, [isActive, streakCount])

  useEffect(() => {
    if (fireworks.length > 0) {
      const timer = setTimeout(() => {
        setFireworks(prev => prev.slice(1))
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [fireworks])

  const getShapePath = (shape: ConfettiPiece['shape'], size: number) => {
    switch (shape) {
      case 'triangle':
        return `polygon(50% 0%, 0% 100%, 100% 100%)`
      case 'star':
        return `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
      case 'flame':
        return `polygon(50% 0%, 65% 20%, 80% 45%, 70% 70%, 60% 100%, 50% 85%, 40% 100%, 30% 70%, 20% 45%, 35% 20%)`
      default:
        return undefined
    }
  }

  const getGradientColors = () => {
    const colors = getStreakColors()
    return colors.slice(0, 3).join(', ')
  }

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {showRays && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.6, 0.4],
                scale: [0.8, 1.2, 1.5],
                rotate: [0, 180]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: duration / 1000,
                ease: "easeOut"
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[200%] h-2 origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${getStreakColors()[i % getStreakColors().length]} 0%, transparent 100%)`,
                    transform: `rotate(${(i * 360) / 12}deg)`,
                    opacity: 0.15,
                  }}
                  animate={{
                    scaleX: [0, 1, 0.7],
                    opacity: [0, 0.15, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              ))}
            </motion.div>
          )}

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

          {fireworks.map((firework) => (
            <div
              key={firework.id}
              className="absolute"
              style={{
                left: `${firework.x}%`,
                top: `${firework.y}%`,
              }}
            >
              {firework.particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: firework.color,
                    boxShadow: `0 0 8px ${firework.color}`,
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.cos(particle.angle) * particle.velocity * 40,
                    y: Math.sin(particle.angle) * particle.velocity * 40,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          ))}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative rounded-3xl px-12 py-8 shadow-2xl border-4 border-white overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${getGradientColors()})`,
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                scale: [1, 1.05, 1],
              }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: 0.6,
                scale: {
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, white 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 80%, white 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="text-center relative z-10"
                animate={{
                  rotate: [0, -2, 2, -2, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              >
                <motion.div 
                  className="text-8xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                >
                  {getStreakEmoji()}
                </motion.div>
                
                <motion.h2 
                  className="text-5xl font-bold text-white mb-3 drop-shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.8
                  }}
                >
                  {getStreakMessage()}
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-3xl text-white font-bold mb-2 drop-shadow">
                    {streakCount} Day Streak!
                  </p>
                  <p className="text-lg text-white/90 font-medium">
                    Keep up the amazing work! 🌍
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.3, 0] }}
            transition={{ duration: duration / 1000 }}
            style={{
              background: `radial-gradient(circle at center, ${getStreakColors()[0]}40 0%, transparent 70%)`,
            }}
          />

          <motion.div
            className="absolute top-0 left-0 right-0 h-32"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: duration / 1000 }}
          >
            {Array.from({ length: streakCount >= 7 ? 20 : 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 rounded-full"
                style={{
                  left: `${(i / (streakCount >= 7 ? 20 : 10)) * 100}%`,
                  height: `${30 + Math.random() * 40}px`,
                  background: `linear-gradient(180deg, ${getStreakColors()[i % getStreakColors().length]} 0%, transparent 100%)`,
                }}
                animate={{
                  scaleY: [0, 1, 0.8, 0],
                  opacity: [0, 1, 0.8, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
