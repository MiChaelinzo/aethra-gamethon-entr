import { motion, AnimatePresence } from 'framer-motion'
import { Tree, Wind, Recycle, Drop, Lightning, Snowflake, Bird, Sparkle, FlowerLotus, Cat, Leaf, Sun, Waves, Mountains, Meteor, Fire } from '@phosphor-icons/react'
import { Tile as TileType } from '@/lib/types'
import { TILE_INFO } from '@/lib/gameData'
import { BIOME_EFFECTS } from '@/lib/biomeEffects'
import { Card } from '@/components/ui/card'
import { ParticleEffect } from './ParticleEffect'

interface TileProps {
  tile: TileType
  isSelected: boolean
  isMatched?: boolean
  onClick: () => void
}

const iconMap = {
  Tree,
  Wind,
  Recycle,
  Drop,
  Lightning,
  Snowflake,
  Bird,
  Sparkle,
  FlowerLotus,
  Cat,
  Leaf,
  SunHorizon: Sun,
  Waves,
  Mountains,
  Comet: Meteor,
  FireSimple: Fire,
  SolarPanel: () => (
    <svg viewBox="0 0 256 256" className="w-full h-full">
      <rect width="256" height="256" fill="none"/>
      <path d="M32,104H56a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V96A8,8,0,0,0,32,104Z" fill="currentColor"/>
      <path d="M104,104h24a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8V96A8,8,0,0,0,104,104Z" fill="currentColor"/>
      <path d="M200,64H176a8,8,0,0,0-8,8V96a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V72A8,8,0,0,0,200,64Z" fill="currentColor"/>
      <path d="M56,120H32a8,8,0,0,0-8,8v24a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V128A8,8,0,0,0,56,120Z" fill="currentColor"/>
      <path d="M128,120H104a8,8,0,0,0-8,8v24a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V128A8,8,0,0,0,128,120Z" fill="currentColor"/>
      <path d="M200,120H176a8,8,0,0,0-8,8v24a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V128A8,8,0,0,0,200,120Z" fill="currentColor"/>
      <line x1="48" y1="160" x2="48" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
      <line x1="116" y1="160" x2="116" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
      <line x1="188" y1="160" x2="188" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
      <line x1="24" y1="208" x2="208" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
    </svg>
  )
}

const POWERUP_TYPES = ['supernova', 'tsunami', 'earthquake', 'meteor', 'phoenix']

export function Tile({ tile, isSelected, isMatched = false, onClick }: TileProps) {
  const info = TILE_INFO[tile.type]
  const IconComponent = iconMap[info.icon as keyof typeof iconMap]
  const particleConfig = BIOME_EFFECTS[tile.type]
  const isPowerUp = tile.isPowerUp || POWERUP_TYPES.includes(tile.type)

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: isMatched ? 1 : 1.05, y: isMatched ? 0 : -2 }}
      whileTap={{ scale: isMatched ? 1 : 0.95 }}
      animate={{
        scale: isSelected ? 1.1 : isMatched ? 1.2 : 1,
        borderColor: isSelected ? 'rgb(132, 204, 22)' : 'transparent'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {isMatched && (
          <>
            <motion.div
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [1, isPowerUp ? 2 : 1.3, isPowerUp ? 2.5 : 1.5],
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  `0 0 ${isPowerUp ? 60 : 30}px ${particleConfig.colors[0]}`,
                  '0 0 0px rgba(255,255,255,0)'
                ]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: isPowerUp ? 1 : 0.6, ease: 'easeOut' }}
              style={{
                background: `radial-gradient(circle, ${particleConfig.colors[0]}${isPowerUp ? '60' : '40'} 0%, transparent 70%)`
              }}
            />
            <ParticleEffect 
              config={particleConfig} 
              isActive={isMatched}
            />
          </>
        )}
      </AnimatePresence>

      <Card
        onClick={onClick}
        className={`
          aspect-square cursor-pointer flex items-center justify-center
          border-4 transition-all duration-200 hover:shadow-lg relative overflow-visible
          ${isSelected ? 'border-lime-500 shadow-lg' : 'border-transparent'}
          ${isMatched ? 'animate-pulse' : ''}
          ${isPowerUp ? 'bg-gradient-to-br from-yellow-100 via-orange-50 to-purple-100 shadow-xl' : ''}
        `}
      >
        {isPowerUp && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                '0 0 10px rgba(251, 146, 60, 0.5)',
                '0 0 20px rgba(251, 146, 60, 0.8)',
                '0 0 10px rgba(251, 146, 60, 0.5)'
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        
        <motion.div 
          className={`w-3/4 h-3/4 ${info.color} relative z-10`}
          animate={isMatched ? {
            scale: [1, isPowerUp ? 1.5 : 1.2, isPowerUp ? 1 : 0.8, isPowerUp ? 1.3 : 1.1, 0],
            rotate: [0, isPowerUp ? -15 : -10, isPowerUp ? 15 : 10, isPowerUp ? -8 : -5, 0],
            opacity: [1, 1, 1, 0.5, 0]
          } : isPowerUp ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={isMatched ? 
            { duration: isPowerUp ? 1.2 : 0.8, ease: 'easeInOut' } : 
            { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <IconComponent />
        </motion.div>

        {isPowerUp && !isMatched && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-orange-400"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 2) * 30],
                  y: [0, Math.sin(i * Math.PI / 2) * 30],
                  opacity: [1, 0],
                  scale: [0, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </Card>
    </motion.div>
  )
}
