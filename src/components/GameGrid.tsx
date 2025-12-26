import { Tile as TileComponent } from './Tile'
import { Tile as TileType } from '@/lib/types'
import { MatchedTileTrails } from './MatchedTileTrails'
import { TrailCollisionEffects } from './TrailCollisionEffects'

interface GameGridProps {
  grid: TileType[]
  size: number
  selectedTile: TileType | null
  matchedTiles?: TileType[]
  onTileClick: (tile: TileType) => void
}

export function GameGrid({ grid, size, selectedTile, matchedTiles = [], onTileClick }: GameGridProps) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: `min(90vw, ${size * 80}px)` }}>
      <div 
        className="grid gap-2 relative"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
        }}
      >
        {grid.map((tile) => (
          <TileComponent
            key={tile.id}
            tile={tile}
            isSelected={selectedTile?.id === tile.id}
            isMatched={matchedTiles.some(m => m.id === tile.id)}
            onClick={() => onTileClick(tile)}
          />
        ))}
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
      />
    </div>
  )
}
