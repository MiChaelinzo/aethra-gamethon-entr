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

interface Firework {
  id: number
  x: number
  y: number
  color: string
  particles: Array<{
    angle: number
    velocity: number
  }>
}

interface StreakCelebrationProps {
  isActive: boolean
  streakCount: number
  onComplete?: () => void
}

const STREAK_COLORS = {
  3: ['#FCD34D', '#F59E0B', '#D97706'], // Gold/Orange
  7: ['#6EE7B7', '#10B981', '#059669'], // Emerald
  14: ['#60A5FA', '#2563EB', '#1D4ED8'], // Blue
  30: ['#C084FC', '#9333EA', '#7E22CE'], // Purple
  50: ['#F472B6', '#DB2777', '#BE185D'], // Pink
  100: ['#E879F9', '#D946EF', '#A21CAF'], // Fuchsia
  default: ['#9CA3AF', '#4B5563', '#1F2937'] // Gray
}

const STREAK_EMOJIS: Record<number, string> = {
  1: '👍',
  3: '🔥',
  7: '⚡',
  14: '💎',
  30: '🚀',
  50: '🌟',
  100: '👑'
}

const STREAK_MESSAGES: Record<number, string> = {
  1: 'Good Start!',
  3: 'Heating Up!',
  7: 'Unstoppable!',
  14: 'Crushing It!',
  30: 'To The Moon!',
  50: 'Legendary!',
  100: 'Godlike Status!'
}

const generateConfettiPiece = (id: number, count: number, colors: string[]): ConfettiPiece => {
  const shapes: ConfettiPiece['shape'][] = ['circle', 'square', 'triangle', 'star']
  return {
    id,
    x: Math.random() * 100, // percentage
    y: -10 - Math.random() * 40, // start above screen
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 8 + Math.random() * 10,
    velocityX: (Math.random() - 0.5) * 2, // horizontal drift
    velocityY: 5 + Math.random() * 5, // fall speed
    rotationSpeed: (Math.random() - 0.5) * 10,
    shape: shapes[Math.floor(Math.random() * shapes.length)]
  }
}

const generateFirework = (id: number): Firework => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
  return {
    id,
    x: 20 + Math.random() * 60, // Keep away from edges
    y: 20 + Math.random() * 40,
    color: colors[Math.floor(Math.random() * colors.length)],
    particles: Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      velocity: 2 + Math.random() * 3
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
  
  const getStreakData = (map: Record<number, any>, defaultVal: any) => {
    const tiers = [100, 50, 30, 14, 7, 3, 1]
    const tier = tiers.find(t => streakCount >= t) || 1
    return map[tier] || defaultVal
  }

  const currentEmoji = getStreakData(STREAK_EMOJIS, '🎉')
  const currentMessage = getStreakData(STREAK_MESSAGES, 'Keep it up!')
  const currentColors = (() => {
    const tiers = [100, 50, 30, 14, 7, 3]
    const tier = tiers.find(t => streakCount >= t)
    return tier ? STREAK_COLORS[tier as keyof typeof STREAK_COLORS] : STREAK_COLORS.default
  })()

  const duration = streakCount >= 7 ? 6000 : 4000
  const shouldShowFireworks = streakCount >= 7

  useEffect(() => {
    if (isActive) {
      // Initialize Confetti
      const pieceCount = Math.min(100 + streakCount * 2, 200)
      const pieces = Array.from({ length: pieceCount }, (_, i) => 
        generateConfettiPiece(i, pieceCount, currentColors)
      )
      setConfetti(pieces)

      // Handle Fireworks
      let fireworkInterval: NodeJS.Timeout
      if (shouldShowFireworks) {
        let count = 0
        const maxFireworks = Math.min(Math.floor(streakCount / 5), 8)
        
        fireworkInterval = setInterval(() => {
          if (count >= maxFireworks) {
            clearInterval(fireworkInterval)
            return
          }
          setFireworks(prev => [...prev, generateFirework(Date.now() + Math.random())])
          count++
        }, 500)
      }

      // Cleanup timer
      const timer = setTimeout(() => {
        setConfetti([])
        setFireworks([])
        onComplete?.()
      }, duration)

      return () => {
        clearTimeout(timer)
        if (fireworkInterval) clearInterval(fireworkInterval)
        setConfetti([])
        setFireworks([])
      }
    }
  }, [isActive, streakCount, shouldShowFireworks, duration, onComplete])

  // Clean up old fireworks
  useEffect(() => {
    if (fireworks.length > 0) {
      const timer = setTimeout(() => {
        setFireworks(prev => prev.slice(1))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [fireworks])

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Rays Effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[200vw] h-[200vh] bg-[conic-gradient(from_0deg,transparent_0deg,white_20deg,transparent_40deg,white_60deg,transparent_80deg,white_100deg,transparent_120deg,white_140deg,transparent_160deg,white_180deg,transparent_200deg,white_220deg,transparent_240deg,white_260deg,transparent_280deg,white_300deg,transparent_320deg,white_340deg,transparent_360deg)]" />
          </motion.div>

          {/* Confetti */}
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              initial={{ 
                x: `${piece.x}vw`, 
                y: `${piece.y}vh`, 
                rotate: piece.rotation,
                opacity: 1 
              }}
              animate={{ 
                y: '120vh',
                x: `${piece.x + (piece.velocityX * 20)}vw`,
                rotate: piece.rotation + (piece.rotationSpeed * 20)
              }}
              transition={{ 
                duration: Math.random() * 2 + 2, 
                ease: "linear" 
              }}
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : '0',
                clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                          piece.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined
              }}
            />
          ))}

          {/* Fireworks */}
          {fireworks.map((fw) => (
            <div key={fw.id} className="absolute" style={{ left: `${fw.x}%`, top: `${fw.y}%` }}>
              {fw.particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: fw.color, boxShadow: `0 0 10px ${fw.color}` }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ 
                    x: Math.cos(p.angle) * p.velocity * 50,
                    y: Math.sin(p.angle) * p.velocity * 50,
                    opacity: 0,
                    scale: [1, 0]
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}
            </div>
          ))}

          {/* Main Card */}
          <motion.div
            className="relative z-10 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border-4 border-white/20 text-center max-w-sm w-full mx-4"
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <motion.div 
              className="text-8xl mb-4"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            >
              {currentEmoji}
            </motion.div>

            <motion.h2 
              className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {streakCount} Day Streak!
            </motion.h2>

            <motion.p 
              className="text-xl text-zinc-600 dark:text-zinc-300 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentMessage}
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
