import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tile } from '@/lib/types'
import { BIOME_EFFECTS } from '@/lib/biomeEffects'

interface MatchedTileTrailsProps {
  matchedTiles: Tile[]
  gridSize: number
  isActive: boolean
}

interface TrailParticle {
  id: string
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
  delay: number
  size: number
  isPowerUp?: boolean
}

interface ConnectionLine {
  id: string
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  delay: number
  isPowerUp?: boolean
}

interface EnergyRing {
  id: string
  x: number
  y: number
  color: string
  delay: number
}

const TILE_SIZE = 80
const GAP_SIZE = 8
const POWERUP_TYPES = ['supernova', 'tsunami', 'earthquake', 'meteor', 'phoenix']

export function MatchedTileTrails({ matchedTiles, gridSize, isActive }: MatchedTileTrailsProps) {
  const [particles, setParticles] = useState<TrailParticle[]>([])
  const [connections, setConnections] = useState<ConnectionLine[]>([])
  const [energyRings, setEnergyRings] = useState<EnergyRing[]>([])

  useEffect(() => {
    if (!isActive || matchedTiles.length === 0) {
      setParticles([])
      setConnections([])
      setEnergyRings([])
      return
    }

    const getTilePosition = (tile: Tile) => {
      const col = tile.col
      const row = tile.row
      const x = col * (TILE_SIZE + GAP_SIZE) + TILE_SIZE / 2
      const y = row * (TILE_SIZE + GAP_SIZE) + TILE_SIZE / 2
      return { x, y }
    }

    const hasPowerUp = matchedTiles.some(t => t.isPowerUp || POWERUP_TYPES.includes(t.type))

    const sortedTiles = [...matchedTiles].sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row
      return a.col - b.col
    })

    const newConnections: ConnectionLine[] = []
    const newParticles: TrailParticle[] = []
    const newEnergyRings: EnergyRing[] = []

    for (let i = 0; i < sortedTiles.length - 1; i++) {
      const currentTile = sortedTiles[i]
      const nextTile = sortedTiles[i + 1]
      
      const fromPos = getTilePosition(currentTile)
      const toPos = getTilePosition(nextTile)

      const particleConfig = BIOME_EFFECTS[currentTile.type]
      const color = particleConfig.colors[0]
      const isPowerUpTile = currentTile.isPowerUp || POWERUP_TYPES.includes(currentTile.type)

      newConnections.push({
        id: `connection-${currentTile.id}-${nextTile.id}`,
        from: fromPos,
        to: toPos,
        color,
        delay: i * 0.05,
        isPowerUp: isPowerUpTile
      })

      const particleCount = isPowerUpTile ? 15 : 8
      for (let j = 0; j < particleCount; j++) {
        newParticles.push({
          id: `particle-${currentTile.id}-${nextTile.id}-${j}`,
          x: fromPos.x,
          y: fromPos.y,
          targetX: toPos.x,
          targetY: toPos.y,
          color,
          delay: i * 0.05 + j * 0.015,
          size: isPowerUpTile ? Math.random() * 6 + 3 : Math.random() * 4 + 2,
          isPowerUp: isPowerUpTile
        })
      }
    }

    sortedTiles.forEach((tile, idx) => {
      const pos = getTilePosition(tile)
      const particleConfig = BIOME_EFFECTS[tile.type]
      const isPowerUpTile = tile.isPowerUp || POWERUP_TYPES.includes(tile.type)

      if (isPowerUpTile) {
        newEnergyRings.push({
          id: `ring-${tile.id}`,
          x: pos.x,
          y: pos.y,
          color: particleConfig.colors[0],
          delay: idx * 0.04
        })
      }

      if (matchedTiles.length >= 3) {
        const color = particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)]
        const burstParticles = isPowerUpTile ? 20 : 12
        
        for (let i = 0; i < burstParticles; i++) {
          const angle = (Math.PI * 2 * i) / burstParticles
          const distance = isPowerUpTile ? 60 + Math.random() * 40 : 40 + Math.random() * 30
          
          newParticles.push({
            id: `burst-${tile.id}-${i}`,
            x: pos.x,
            y: pos.y,
            targetX: pos.x + Math.cos(angle) * distance,
            targetY: pos.y + Math.sin(angle) * distance,
            color,
            delay: idx * 0.03,
            size: isPowerUpTile ? Math.random() * 5 + 2 : Math.random() * 3 + 1,
            isPowerUp: isPowerUpTile
          })
        }

        if (isPowerUpTile && matchedTiles.length >= 4) {
          for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2
            const distance = 80 + Math.random() * 60
            const spiralAngle = angle + (i * Math.PI / 15)
            
            newParticles.push({
              id: `spiral-${tile.id}-${i}`,
              x: pos.x,
              y: pos.y,
              targetX: pos.x + Math.cos(spiralAngle) * distance,
              targetY: pos.y + Math.sin(spiralAngle) * distance,
              color: particleConfig.colors[i % particleConfig.colors.length],
              delay: idx * 0.03 + i * 0.01,
              size: Math.random() * 4 + 2,
              isPowerUp: true
            })
          }
        }
      }
    })

    if (hasPowerUp && matchedTiles.length >= 4) {
      const centerX = sortedTiles.reduce((sum, t) => sum + getTilePosition(t).x, 0) / sortedTiles.length
      const centerY = sortedTiles.reduce((sum, t) => sum + getTilePosition(t).y, 0) / sortedTiles.length
      
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50
        const distance = 100 + Math.random() * 80
        const particleConfig = BIOME_EFFECTS[sortedTiles[0].type]
        
        newParticles.push({
          id: `mega-burst-${i}`,
          x: centerX,
          y: centerY,
          targetX: centerX + Math.cos(angle) * distance,
          targetY: centerY + Math.sin(angle) * distance,
          color: particleConfig.colors[i % particleConfig.colors.length],
          delay: 0.2 + i * 0.005,
          size: Math.random() * 6 + 3,
          isPowerUp: true
        })
      }
    }

    setConnections(newConnections)
    setParticles(newParticles)
    setEnergyRings(newEnergyRings)
  }, [matchedTiles, isActive, gridSize])

  if (!isActive || matchedTiles.length === 0) {
    return null
  }

  const maxWidth = gridSize * (TILE_SIZE + GAP_SIZE)
  const maxHeight = gridSize * (TILE_SIZE + GAP_SIZE)

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{
        width: maxWidth,
        height: maxHeight
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <AnimatePresence>
          {connections.map((connection) => (
            <motion.line
              key={connection.id}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.from.x}
              y2={connection.from.y}
              stroke={connection.color}
              strokeWidth={connection.isPowerUp ? "5" : "3"}
              strokeLinecap="round"
              initial={{ 
                x2: connection.from.x,
                y2: connection.from.y,
                opacity: 0
              }}
              animate={{ 
                x2: connection.to.x,
                y2: connection.to.y,
                opacity: connection.isPowerUp ? [0, 1, 0.9, 0] : [0, 0.8, 0.8, 0],
                strokeWidth: connection.isPowerUp ? [5, 8, 5] : [3, 5, 3]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: connection.isPowerUp ? 0.5 : 0.4,
                delay: connection.delay,
                ease: 'easeInOut'
              }}
              style={{
                filter: `drop-shadow(0 0 ${connection.isPowerUp ? 10 : 6}px ${connection.color})`
              }}
            />
          ))}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        {energyRings.map((ring) => (
          <motion.div
            key={ring.id}
            className="absolute rounded-full border-4"
            style={{
              left: ring.x - 20,
              top: ring.y - 20,
              width: 40,
              height: 40,
              borderColor: ring.color
            }}
            initial={{
              scale: 0.5,
              opacity: 0
            }}
            animate={{
              scale: [0.5, 2, 2.5],
              opacity: [0, 1, 0],
              borderWidth: [4, 2, 0]
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.8,
              delay: ring.delay,
              ease: 'easeOut'
            }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * (particle.isPowerUp ? 3 : 2)}px ${particle.color}`,
              left: 0,
              top: 0
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: particle.targetX,
              y: particle.targetY,
              opacity: particle.isPowerUp ? [0, 1, 1, 0.8, 0] : [0, 1, 1, 0],
              scale: particle.isPowerUp ? [0, 1.5, 1.2, 1, 0.5] : [0, 1.2, 1, 0.5]
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: particle.isPowerUp ? 0.8 : 0.6,
              delay: particle.delay,
              ease: 'easeOut'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
