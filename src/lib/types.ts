export type TileType = 'tree' | 'solar' | 'wind' | 'recycle' | 'water' | 'energy'

export interface Tile {
  id: string
  type: TileType
  row: number
  col: number
  isMatched?: boolean
}

export interface Level {
  id: number
  name: string
  biome: string
  description: string
  gridSize: number
  targetScore: number
  movesLimit: number
}

export interface GameState {
  currentLevel: number
  score: number
  moves: number
  pollution: number
  completedLevels: number[]
  totalCO2Reduced: number
}

export interface TileInfo {
  type: TileType
  name: string
  icon: string
  color: string
  fact: string
  co2Impact: number
}
