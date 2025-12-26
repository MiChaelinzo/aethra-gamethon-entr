import { Tile as TileComponent } from './Tile'
import { Tile as TileType } from '@/lib/types'
import { MatchedTileTrails } from './MatchedTileTrails'
import { TrailCollisionEffects } from './TrailCollisionEffects'
import { CollisionZoneIndicator } from './CollisionZoneIndicator'
import { CollisionHeatmap } from './CollisionHeatmap'
import { useCollisionZones } from '@/hooks/use-collision-zones'
import { useEffect } from 'react'

interface GameGridProps {
  grid: TileType[]
  size: number
  selectedTile: TileType | null
  matchedTiles?: TileType[]
  onTileClick: (tile: TileType) => void
  onCollisionMultiplier?: (multiplier: number, collisionCount: number, position: { x: number; y: number }) => void
  combo?: number
  heatmapEnabled?: boolean
  heatmapOpacity?: number
  heatmapDecayRate?: number
}

export function GameGrid({ 
  grid, 
  size, 
  selectedTile, 
  matchedTiles = [], 
  onTileClick, 
  onCollisionMultiplier,
  combo = 0,
  heatmapEnabled = false,
  heatmapOpacity = 0.6,
  heatmapDecayRate = 0.95
}: GameGridProps) {
  const { zones, addCollisionZonesForMatches } = useCollisionZones()

  useEffect(() => {
    if (matchedTiles.length > 0) {
      addCollisionZonesForMatches(matchedTiles, Math.max(combo, 1))
      
      matchedTiles.forEach(tile => {
        const intensity = Math.min(1, (combo + 1) * 0.15)
        const event = new CustomEvent('collision-zone-hit', {
          detail: { row: tile.row, col: tile.col, intensity }
        })
        window.dispatchEvent(event)
      })
    }
  }, [matchedTiles, combo, addCollisionZonesForMatches])

  const cellSize = 80

  return (
    <div className="relative mx-auto" style={{ maxWidth: `min(90vw, ${size * cellSize}px)` }}>
      <div 
        className="grid gap-2 relative"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
        }}
      >
        <CollisionHeatmap
          gridSize={size}
          isActive={heatmapEnabled}
          opacity={heatmapOpacity}
          decayRate={heatmapDecayRate}
        />
        
        {grid.map((tile) => (
          <TileComponent
            key={tile.id}
            tile={tile}
            isSelected={selectedTile?.id === tile.id}
            isMatched={matchedTiles.some(m => m.id === tile.id)}
            onClick={() => onTileClick(tile)}
          />
        ))}
        
        <CollisionZoneIndicator 
          zones={zones} 
          gridSize={size} 
          cellSize={cellSize}
        />
      </div>
      <MatchedTileTrails
        matchedTiles={matchedTiles}
        gridSize={size}
        isActive={matchedTiles.length > 0}
      />
      <TrailCollisionEffects
        matchedTiles={matchedTiles}
        gridSize={size}
        isActive={matchedTiles.length > 0}
        onCollisionMultiplier={onCollisionMultiplier}
      />
    </div>
  )
}
