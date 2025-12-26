import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle } from '@phosphor-icons/react'

interface CollisionMultiplierProps {
  multiplier: number
  position: { x: number; y: number }
  isActive: boolean
  collisionCount: number
}

export function CollisionMultiplier({ 
  multiplier, 
  position, 
  isActive,
  collisionCount 
}: CollisionMultiplierProps) {
  if (!isActive || multiplier <= 1) return null

  const getMultiplierColor = (mult: number) => {
    if (mult >= 5) return 'text-purple-500'
    if (mult >= 4) return 'text-pink-500'
    if (mult >= 3) return 'text-orange-500'
    if (mult >= 2) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getMultiplierSize = (mult: number) => {
    if (mult >= 5) return 'text-4xl'
    if (mult >= 4) return 'text-3xl'
    if (mult >= 3) return 'text-2xl'
    return 'text-xl'
  }

  const getGlowIntensity = (mult: number) => {
    if (mult >= 5) return '0 0 30px currentColor, 0 0 60px currentColor'
    if (mult >= 4) return '0 0 25px currentColor, 0 0 50px currentColor'
    if (mult >= 3) return '0 0 20px currentColor, 0 0 40px currentColor'
    return '0 0 15px currentColor, 0 0 30px currentColor'
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x,
          top: position.y
        }}
        initial={{ opacity: 0, scale: 0, y: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1.2, 1, 0.8],
          y: [0, -60, -80, -100]
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="relative flex flex-col items-center gap-1">
          <motion.div
            className={`font-bold ${getMultiplierSize(multiplier)} ${getMultiplierColor(multiplier)} drop-shadow-2xl`}
            style={{
              textShadow: getGlowIntensity(multiplier),
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '0.05em'
            }}
            animate={{
              scale: [1, 1.15, 1, 1.1, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: 2,
              ease: 'easeInOut'
            }}
          >
            ×{multiplier.toFixed(1)}
          </motion.div>

          <motion.div
            className="text-xs font-semibold text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkle className="inline-block mr-1" size={12} weight="fill" />
            {collisionCount} collision{collisionCount !== 1 ? 's' : ''}!
          </motion.div>

          {multiplier >= 3 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${getMultiplierColor(multiplier).replace('text-', '')}44, transparent)`
              }}
              animate={{
                scale: [1, 2, 3],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: 1,
                ease: 'easeOut'
              }}
            />
          )}

          {multiplier >= 5 && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-400"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  animate={{
                    x: Math.cos((Math.PI * 2 * i) / 8) * 60,
                    y: Math.sin((Math.PI * 2 * i) / 8) * 60,
                    opacity: [1, 0],
                    scale: [1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
