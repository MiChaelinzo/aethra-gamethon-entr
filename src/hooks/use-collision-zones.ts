import { useState, useCallback } from 'react'
import { Tile } from '../lib/types'

interface CollisionZone {
  id: string
  gridX: number
  gridY: number
  intensity: number
  timestamp: number
}

export function useCollisionZones() {
  const [zones, setZones] = useState<CollisionZone[]>([])

  const addCollisionZone = useCallback((tile: Tile, intensity: number = 1) => {
    const id = `zone-${tile.id}-${Date.now()}`
    const newZone: CollisionZone = {
      id,
      gridX: tile.col,
      gridY: tile.row,
      intensity,
      timestamp: Date.now()
    }

    setZones(prev => [...prev, newZone])

    setTimeout(() => {
      setZones(prev => prev.filter(z => z.id !== id))
    }, 1500)
  }, [])

  const addCollisionZonesForMatches = useCallback((matches: Tile[], combo: number = 1) => {
    const zoneMap = new Map<string, { tile: Tile; count: number }>()

    matches.forEach(tile => {
      const key = `${tile.col}-${tile.row}`
      if (zoneMap.has(key)) {
        const existing = zoneMap.get(key)!
        zoneMap.set(key, { tile, count: existing.count + 1 })
      } else {
        zoneMap.set(key, { tile, count: 1 })
      }
    })

    zoneMap.forEach(({ tile, count }) => {
      const intensity = Math.min(count * combo, 10)
      addCollisionZone(tile, intensity)
    })
  }, [addCollisionZone])

  const clearZones = useCallback(() => {
    setZones([])
  }, [])

  return {
    zones,
    addCollisionZone,
    addCollisionZonesForMatches,
    clearZones
  }
}
