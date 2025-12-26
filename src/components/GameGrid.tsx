import { Tile as TileComponent } from './Tile'
import { Tile as TileType } from '@/lib/types'

interface GameGridProps {
  grid: TileType[]
  size: number
  selectedTile: TileType | null
  matchedTiles?: TileType[]
  onTileClick: (tile: TileType) => void
}

export function GameGrid({ grid, size, selectedTile, matchedTiles = [], onTileClick }: GameGridProps) {
  return (
    <div 
      className="grid gap-2 mx-auto"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        maxWidth: `min(90vw, ${size * 80}px)`
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
  )
}
