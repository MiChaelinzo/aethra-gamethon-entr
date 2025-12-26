import { motion, AnimatePresence } from 'framer-motion'
import { Tree, Wind, Recycle, Drop, Lightning, Snowflake, Bird, Sparkle, FlowerLotus, Cat, Leaf } from '@phosphor-icons/react'
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

export function Tile({ tile, isSelected, isMatched = false, onClick }: TileProps) {
  const info = TILE_INFO[tile.type]
  const IconComponent = iconMap[info.icon as keyof typeof iconMap]
  const particleConfig = BIOME_EFFECTS[tile.type]

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
                scale: [1, 1.3, 1.5],
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  `0 0 30px ${particleConfig.colors[0]}`,
                  '0 0 0px rgba(255,255,255,0)'
                ]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: `radial-gradient(circle, ${particleConfig.colors[0]}40 0%, transparent 70%)`
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
        `}
      >
        <motion.div 
          className={`w-3/4 h-3/4 ${info.color}`}
          animate={isMatched ? {
            scale: [1, 1.2, 0.8, 1.1, 0],
            rotate: [0, -10, 10, -5, 0],
            opacity: [1, 1, 1, 0.5, 0]
          } : {}}
          transition={isMatched ? { duration: 0.8, ease: 'easeInOut' } : {}}
        >
          <IconComponent />
        </motion.div>
      </Card>
    </motion.div>
  )
}
