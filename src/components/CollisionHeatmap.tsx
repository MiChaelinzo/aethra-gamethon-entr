import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeatmapCell {
  row: number
  col: number
  intensity: number
  timestamp: number
}

interface CollisionHeatmapProps {
  gridSize: number
  isActive: boolean
  opacity?: number
  decayRate?: number
}

export function CollisionHeatmap({ 
  gridSize, 
  isActive, 
  opacity = 0.6,
  decayRate = 0.95
}: CollisionHeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<Map<string, HeatmapCell>>(new Map())

  useEffect(() => {
    if (!isActive) return

    const decayInterval = setInterval(() => {
      setHeatmapData(current => {
        const updated = new Map(current)
        const now = Date.now()
        
        updated.forEach((cell, key) => {
          const age = (now - cell.timestamp) / 1000
          const decayedIntensity = cell.intensity * Math.pow(decayRate, age)
          
          if (decayedIntensity < 0.01) {
            updated.delete(key)
          } else {
            updated.set(key, { ...cell, intensity: decayedIntensity })
          }
        })
        
        return updated
      })
    }, 100)

    return () => clearInterval(decayInterval)
  }, [isActive, decayRate])

  useEffect(() => {
    const handleCollision = (event: CustomEvent) => {
      const { row, col, intensity } = event.detail
      const key = `${row}-${col}`
      
      setHeatmapData(current => {
        const updated = new Map(current)
        const existing = updated.get(key)
        
        if (existing) {
          updated.set(key, {
            row,
            col,
            intensity: Math.min(1, existing.intensity + intensity * 0.2),
            timestamp: Date.now()
          })
        } else {
          updated.set(key, {
            row,
            col,
            intensity: intensity * 0.2,
            timestamp: Date.now()
          })
        }
        
        return updated
      })
    }

    window.addEventListener('collision-zone-hit', handleCollision as EventListener)
    return () => window.removeEventListener('collision-zone-hit', handleCollision as EventListener)
  }, [])

  if (!isActive) return null

  const cellSize = 100 / gridSize
  const cells = Array.from(heatmapData.values())

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <AnimatePresence>
        {cells.map(cell => {
          const key = `${cell.row}-${cell.col}`
          const normalizedIntensity = Math.min(1, cell.intensity)
          
          const getHeatColor = (intensity: number) => {
            if (intensity < 0.2) return 'rgba(59, 130, 246, 0.3)'
            if (intensity < 0.4) return 'rgba(34, 197, 94, 0.4)'
            if (intensity < 0.6) return 'rgba(234, 179, 8, 0.5)'
            if (intensity < 0.8) return 'rgba(249, 115, 22, 0.6)'
            return 'rgba(239, 68, 68, 0.7)'
          }

          return (
            <motion.div
              key={key}
              className="absolute rounded-md"
              style={{
                left: `${cell.col * cellSize}%`,
                top: `${cell.row * cellSize}%`,
                width: `${cellSize}%`,
                height: `${cellSize}%`,
                backgroundColor: getHeatColor(normalizedIntensity),
                boxShadow: `inset 0 0 ${20 * normalizedIntensity}px ${getHeatColor(normalizedIntensity)}`
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: normalizedIntensity * 0.8,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
