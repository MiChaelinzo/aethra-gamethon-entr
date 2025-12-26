import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tile } from '@/lib/types'
import { playSoundEffect } from '@/lib/soundEffects'

interface TrailCollisionEffectsProps {
  matchedTiles: Tile[]
  gridSize: number
  isActive: boolean
}

interface ParticlePath {
  id: string
  points: { x: number; y: number; time: number }[]
  tileType: string
  color: string
  isPowerUp: boolean
}

interface CollisionPoint {
  id: string
  x: number
  y: number
  color1: string
  color2: string
  intensity: number
  type: 'burst' | 'ripple' | 'spark' | 'vortex' | 'shockwave'
  timestamp: number
}

interface CollisionParticle {
  id: string
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
  size: number
  delay: number
}

const TILE_SIZE = 80
const GAP_SIZE = 8
const COLLISION_THRESHOLD = 25
const PATH_LIFETIME = 800

export function TrailCollisionEffects({ matchedTiles, gridSize, isActive }: TrailCollisionEffectsProps) {
  const [particlePaths, setParticlePaths] = useState<ParticlePath[]>([])
  const [collisions, setCollisions] = useState<CollisionPoint[]>([])
  const [collisionParticles, setCollisionParticles] = useState<CollisionParticle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const pathsRef = useRef<ParticlePath[]>([])

  const getTilePosition = (tile: Tile) => {
    const x = tile.col * (TILE_SIZE + GAP_SIZE) + TILE_SIZE / 2
    const y = tile.row * (TILE_SIZE + GAP_SIZE) + TILE_SIZE / 2
    return { x, y }
  }

  const getColorForTile = (tileType: string): string => {
    const colorMap: Record<string, string> = {
      tree: '#10b981',
      solar: '#f59e0b',
      wind: '#3b82f6',
      water: '#06b6d4',
      recycle: '#8b5cf6',
      energy: '#eab308',
      ice: '#7dd3fc',
      penguin: '#0ea5e9',
      aurora: '#c084fc',
      orchid: '#ec4899',
      jaguar: '#f97316',
      medicinal: '#84cc16',
      supernova: '#fbbf24',
      tsunami: '#0ea5e9',
      earthquake: '#92400e',
      meteor: '#dc2626',
      phoenix: '#f97316'
    }
    return colorMap[tileType] || '#10b981'
  }

  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  const detectCollisions = (paths: ParticlePath[]): CollisionPoint[] => {
    const now = Date.now()
    const detectedCollisions: CollisionPoint[] = []
    const recentPaths = paths.map(path => ({
      ...path,
      points: path.points.filter(p => now - p.time < PATH_LIFETIME)
    })).filter(path => path.points.length > 0)

    for (let i = 0; i < recentPaths.length; i++) {
      for (let j = i + 1; j < recentPaths.length; j++) {
        const path1 = recentPaths[i]
        const path2 = recentPaths[j]

        for (const point1 of path1.points) {
          for (const point2 of path2.points) {
            const timeDiff = Math.abs(point1.time - point2.time)
            if (timeDiff < 100) {
              const dist = distance(point1, point2)
              if (dist < COLLISION_THRESHOLD) {
                const intensity = Math.max(0.5, 1 - dist / COLLISION_THRESHOLD)
                const isPowerUpCollision = path1.isPowerUp || path2.isPowerUp
                const isMegaCollision = path1.isPowerUp && path2.isPowerUp

                let collisionType: CollisionPoint['type'] = 'burst'
                if (isMegaCollision) {
                  collisionType = 'vortex'
                } else if (isPowerUpCollision && intensity > 0.8) {
                  collisionType = 'shockwave'
                } else if (isPowerUpCollision) {
                  collisionType = 'spark'
                } else if (intensity > 0.7) {
                  collisionType = 'ripple'
                }

                detectedCollisions.push({
                  id: `collision-${path1.id}-${path2.id}-${point1.time}`,
                  x: (point1.x + point2.x) / 2,
                  y: (point1.y + point2.y) / 2,
                  color1: path1.color,
                  color2: path2.color,
                  intensity,
                  type: collisionType,
                  timestamp: now
                })
              }
            }
          }
        }
      }
    }

    return detectedCollisions
  }

  const generateCollisionParticles = (collision: CollisionPoint): CollisionParticle[] => {
    const particles: CollisionParticle[] = []
    const particleCount = collision.type === 'vortex' ? 40 :
                         collision.type === 'shockwave' ? 30 :
                         collision.type === 'spark' ? 20 :
                         collision.type === 'ripple' ? 15 : 12

    const maxDistance = collision.type === 'vortex' ? 120 :
                       collision.type === 'shockwave' ? 100 :
                       collision.type === 'spark' ? 70 :
                       collision.type === 'ripple' ? 50 : 40

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const baseDistance = maxDistance * collision.intensity
      const distance = baseDistance + Math.random() * 20 - 10
      
      const isColor1 = Math.random() > 0.5
      const color = isColor1 ? collision.color1 : collision.color2

      if (collision.type === 'vortex') {
        const spiralAngle = angle + (i * Math.PI / 20)
        particles.push({
          id: `${collision.id}-particle-${i}`,
          x: collision.x,
          y: collision.y,
          targetX: collision.x + Math.cos(spiralAngle) * distance,
          targetY: collision.y + Math.sin(spiralAngle) * distance,
          color,
          size: Math.random() * 6 + 3,
          delay: i * 0.005
        })
      } else if (collision.type === 'shockwave') {
        for (let ring = 0; ring < 3; ring++) {
          const ringDistance = distance * (0.4 + ring * 0.3)
          particles.push({
            id: `${collision.id}-shockwave-${i}-${ring}`,
            x: collision.x,
            y: collision.y,
            targetX: collision.x + Math.cos(angle) * ringDistance,
            targetY: collision.y + Math.sin(angle) * ringDistance,
            color: ring % 2 === 0 ? collision.color1 : collision.color2,
            size: Math.random() * 4 + 2,
            delay: ring * 0.1 + i * 0.003
          })
        }
      } else if (collision.type === 'spark') {
        const sparkLength = distance + Math.random() * 30
        const sparkAngle = angle + (Math.random() - 0.5) * 0.5
        particles.push({
          id: `${collision.id}-spark-${i}`,
          x: collision.x,
          y: collision.y,
          targetX: collision.x + Math.cos(sparkAngle) * sparkLength,
          targetY: collision.y + Math.sin(sparkAngle) * sparkLength,
          color,
          size: Math.random() * 5 + 2,
          delay: i * 0.008
        })
      } else {
        particles.push({
          id: `${collision.id}-particle-${i}`,
          x: collision.x,
          y: collision.y,
          targetX: collision.x + Math.cos(angle) * distance,
          targetY: collision.y + Math.sin(angle) * distance,
          color,
          size: Math.random() * 4 + 1,
          delay: i * 0.01
        })
      }
    }

    return particles
  }

  useEffect(() => {
    if (!isActive || matchedTiles.length === 0) {
      setParticlePaths([])
      setCollisions([])
      setCollisionParticles([])
      pathsRef.current = []
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const sortedTiles = [...matchedTiles].sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row
      return a.col - b.col
    })

    const newPaths: ParticlePath[] = []
    const isPowerUpTypes = ['supernova', 'tsunami', 'earthquake', 'meteor', 'phoenix']

    for (let i = 0; i < sortedTiles.length - 1; i++) {
      const currentTile = sortedTiles[i]
      const nextTile = sortedTiles[i + 1]
      
      const fromPos = getTilePosition(currentTile)
      const toPos = getTilePosition(nextTile)
      const color = getColorForTile(currentTile.type)
      const isPowerUp = currentTile.isPowerUp || isPowerUpTypes.includes(currentTile.type)

      const steps = 10
      const points: { x: number; y: number; time: number }[] = []
      const now = Date.now()

      for (let step = 0; step <= steps; step++) {
        const t = step / steps
        points.push({
          x: fromPos.x + (toPos.x - fromPos.x) * t,
          y: fromPos.y + (toPos.y - fromPos.y) * t,
          time: now + step * 30
        })
      }

      newPaths.push({
        id: `path-${currentTile.id}-${nextTile.id}`,
        points,
        tileType: currentTile.type,
        color,
        isPowerUp
      })
    }

    pathsRef.current = newPaths
    setParticlePaths(newPaths)

    const detectAndAnimate = () => {
      const now = Date.now()
      const activePaths = pathsRef.current.map(path => ({
        ...path,
        points: path.points.filter(p => p.time <= now && now - p.time < PATH_LIFETIME)
      })).filter(path => path.points.length > 0)

      if (activePaths.length > 1) {
        const detectedCollisions = detectCollisions(activePaths)
        
        if (detectedCollisions.length > 0) {
          const uniqueCollisions = detectedCollisions.filter((collision, index, self) => 
            index === self.findIndex(c => 
              distance({ x: c.x, y: c.y }, { x: collision.x, y: collision.y }) < 15
            )
          )

          setCollisions(prev => {
            const filtered = prev.filter(c => now - c.timestamp < 500)
            return [...filtered, ...uniqueCollisions]
          })

          const newParticles: CollisionParticle[] = []
          uniqueCollisions.forEach(collision => {
            newParticles.push(...generateCollisionParticles(collision))
            
            if (collision.type === 'vortex') {
              playSoundEffect('collision-vortex')
            } else if (collision.type === 'spark' || collision.type === 'shockwave') {
              playSoundEffect('collision-spark')
            } else if (Math.random() > 0.7) {
              playSoundEffect('collision-burst')
            }
          })

          setCollisionParticles(prev => [...prev, ...newParticles])
        }
      }

      if (now < Date.now() + 1000) {
        animationFrameRef.current = requestAnimationFrame(detectAndAnimate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(detectAndAnimate)

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [matchedTiles, isActive, gridSize])

  useEffect(() => {
    if (collisionParticles.length > 0) {
      const timer = setTimeout(() => {
        setCollisionParticles([])
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [collisionParticles])

  if (!isActive || matchedTiles.length === 0) {
    return null
  }

  const maxWidth = gridSize * (TILE_SIZE + GAP_SIZE)
  const maxHeight = gridSize * (TILE_SIZE + GAP_SIZE)

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-visible z-20"
      style={{
        width: maxWidth,
        height: maxHeight
      }}
    >
      <AnimatePresence>
        {collisions.map((collision) => (
          <motion.div
            key={collision.id}
            className="absolute"
            style={{
              left: collision.x,
              top: collision.y
            }}
          >
            {collision.type === 'vortex' && (
              <>
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 60,
                    height: 60,
                    left: -30,
                    top: -30,
                    background: `radial-gradient(circle, ${collision.color1}88, ${collision.color2}88, transparent)`,
                    boxShadow: `0 0 40px ${collision.color1}, 0 0 60px ${collision.color2}`
                  }}
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 2.5, 3],
                    opacity: [0, 1, 0],
                    rotate: [0, 360, 720]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute rounded-full border-4"
                  style={{
                    width: 40,
                    height: 40,
                    left: -20,
                    top: -20,
                    borderColor: collision.color1
                  }}
                  initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
                  animate={{
                    scale: [0.5, 3, 4],
                    opacity: [0, 1, 0],
                    rotate: [0, -180, -360]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </>
            )}

            {collision.type === 'shockwave' && (
              <>
                {[0, 1, 2].map((ring) => (
                  <motion.div
                    key={`shockwave-${collision.id}-${ring}`}
                    className="absolute rounded-full border-2"
                    style={{
                      width: 30,
                      height: 30,
                      left: -15,
                      top: -15,
                      borderColor: ring % 2 === 0 ? collision.color1 : collision.color2
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [0.5, 4, 5],
                      opacity: [0, 0.9, 0],
                      borderWidth: [2, 3, 0]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: ring * 0.08,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}

            {collision.type === 'spark' && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 30,
                  height: 30,
                  left: -15,
                  top: -15,
                  background: `radial-gradient(circle, ${collision.color1}FF, ${collision.color2}FF)`,
                  boxShadow: `0 0 30px ${collision.color1}`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.8, 2.2],
                  opacity: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )}

            {collision.type === 'ripple' && (
              <>
                {[0, 1].map((ripple) => (
                  <motion.div
                    key={`ripple-${collision.id}-${ripple}`}
                    className="absolute rounded-full border"
                    style={{
                      width: 20,
                      height: 20,
                      left: -10,
                      top: -10,
                      borderColor: ripple === 0 ? collision.color1 : collision.color2
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 3],
                      opacity: [0, 0.8, 0],
                      borderWidth: [2, 1, 0]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: ripple * 0.1,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}

            {collision.type === 'burst' && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  left: -10,
                  top: -10,
                  background: `linear-gradient(135deg, ${collision.color1}, ${collision.color2})`,
                  boxShadow: `0 0 20px ${collision.color1}`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2],
                  opacity: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {collisionParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
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
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0.3]
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 0.7,
              delay: particle.delay,
              ease: 'easeOut'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
