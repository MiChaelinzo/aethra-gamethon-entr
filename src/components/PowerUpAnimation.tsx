import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TileType } from '@/lib/types'

interface PowerUpAnimationProps {
  type: TileType
  isActive: boolean
  onComplete?: () => void
}

export function PowerUpAnimation({ type, isActive, onComplete }: PowerUpAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      const particleCount = type === 'phoenix' ? 60 : type === 'meteor' ? 50 : type === 'supernova' ? 45 : type === 'tsunami' ? 40 : 35
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        angle: (360 / particleCount) * i,
        delay: Math.random() * 0.3
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        onComplete?.()
      }, type === 'phoenix' ? 2000 : 1500)

      return () => clearTimeout(timer)
    }
  }, [isActive, type, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {type === 'supernova' && (
          <SupernovaAnimation particles={particles} />
        )}
        {type === 'tsunami' && (
          <TsunamiAnimation particles={particles} />
        )}
        {type === 'earthquake' && (
          <EarthquakeAnimation particles={particles} />
        )}
        {type === 'meteor' && (
          <MeteorAnimation particles={particles} />
        )}
        {type === 'phoenix' && (
          <PhoenixAnimation particles={particles} />
        )}
      </AnimatePresence>
    </div>
  )
}

function SupernovaAnimation({ particles }: { particles: Array<{ id: number; x: number; y: number; angle: number; delay: number }> }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-yellow-400/40 via-orange-500/30 to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 3, opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 2], rotate: 360 }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-32 h-32 rounded-full bg-yellow-300/80 blur-2xl" />
      </motion.div>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 left-1/2"
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos(p.angle * Math.PI / 180) * 600,
            y: Math.sin(p.angle * Math.PI / 180) * 600,
            scale: [0, 1, 0],
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 shadow-lg shadow-yellow-500/50" />
        </motion.div>
      ))}
    </>
  )
}

function TsunamiAnimation({ particles }: { particles: Array<{ id: number; x: number; y: number; angle: number; delay: number }> }) {
  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-500/40 via-cyan-400/20 to-transparent"
        initial={{ y: '100%' }}
        animate={{ y: [100, -20, -100] }}
        transition={{ duration: 1.3, ease: 'easeInOut' }}
      />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-40 rounded-t-full bg-blue-400/30"
          initial={{ y: '100%', scale: 0.8 }}
          animate={{ 
            y: [100, -50, -150],
            scale: [0.8, 1.2, 1.5],
            opacity: [0, 0.6, 0]
          }}
          transition={{ duration: 1.3, delay: i * 0.1, ease: 'easeOut' }}
        />
      ))}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${Math.random() * 100}%`, bottom: 0 }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: -800,
            x: Math.sin(p.angle) * 100,
            opacity: [1, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.3, delay: p.delay, ease: 'easeOut' }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-300 to-cyan-500" />
        </motion.div>
      ))}
    </>
  )
}

function EarthquakeAnimation({ particles }: { particles: Array<{ id: number; x: number; y: number; angle: number; delay: number }> }) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, -10, 10, -8, 8, -5, 5, 0],
          y: [0, 5, -5, 3, -3, 2, -2, 0]
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <div className="w-full h-full bg-amber-900/20" />
      </motion.div>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-2 bg-amber-700/60"
          style={{ bottom: `${i * 12}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1.2, 0.8, 1],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 1.2, delay: i * 0.05 }}
        />
      ))}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0"
          style={{ left: `${(p.id * 3) % 100}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-100, -200, -150, -300],
            x: [0, p.x, -p.x, p.x * 0.5],
            opacity: [1, 1, 0.5, 0],
            rotate: [0, 180, 360, 540]
          }}
          transition={{ duration: 1.2, delay: p.delay }}
        >
          <div className="w-3 h-3 bg-amber-600 rotate-45" />
        </motion.div>
      ))}
    </>
  )
}

function MeteorAnimation({ particles }: { particles: Array<{ id: number; x: number; y: number; angle: number; delay: number }> }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-purple-900/20 to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.4 }}
      />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ 
            left: `${Math.random() * 100}%`,
            top: `${-20 + Math.random() * 40}%`
          }}
          initial={{ y: -100, x: -100, opacity: 1 }}
          animate={{
            y: 1000,
            x: 200 + Math.random() * 200,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.5, 1, 0.5]
          }}
          transition={{ duration: 0.8 + Math.random() * 0.6, delay: p.delay }}
        >
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 shadow-lg shadow-purple-500/50" />
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{ 
                scaleX: [1, 3, 1],
                opacity: [0.8, 0.4, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="w-full h-full bg-gradient-to-r from-purple-500 to-transparent rounded-full blur-sm" 
                   style={{ transform: 'rotate(-45deg) translateX(-100%)' }} 
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

function PhoenixAnimation({ particles }: { particles: Array<{ id: number; x: number; y: number; angle: number; delay: number }> }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-orange-500/40 via-red-600/30 to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 3], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: [0, 1.5, 2, 1.8],
          rotate: [0, 180, 360, 540],
          y: [0, -50, 0, -100]
        }}
        transition={{ duration: 1.8 }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-2xl">
          <motion.path
            d="M50,20 Q30,40 40,60 Q45,70 50,80 Q55,70 60,60 Q70,40 50,20 Z"
            fill="url(#phoenixGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 1, 0.5],
              scale: [0.8, 1.2, 1, 1.1]
            }}
            transition={{ duration: 1.8 }}
          />
          <defs>
            <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 left-1/2"
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos(p.angle * Math.PI / 180) * 700,
            y: Math.sin(p.angle * Math.PI / 180) * 700,
            scale: [0, 1.5, 0.5, 0],
            opacity: [1, 1, 0.5, 0],
            rotate: [0, p.angle, p.angle * 2]
          }}
          transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
        >
          <motion.div
            className="w-4 h-8 rounded-full bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400"
            animate={{
              scaleY: [1, 1.5, 0.8, 1.2, 0.5],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </motion.div>
      ))}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute top-1/2 left-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            x: Math.random() * 400 - 200,
            y: -400 - Math.random() * 200,
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, delay: 0.5 + Math.random() * 0.8, ease: 'easeOut' }}
        >
          <div className="w-2 h-2 rounded-full bg-orange-400 shadow-lg shadow-orange-500/50" />
        </motion.div>
      ))}
    </>
  )
}
