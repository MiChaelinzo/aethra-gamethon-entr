export type TileType = 'tree' | 'solar' | 'wind' | 'recycle' | 'water' | 'energy' | 'ice' | 'penguin' | 'aurora' | 'orchid' | 'jaguar' | 'medicinal' | 'supernova' | 'tsunami' | 'earthquake' | 'meteor' | 'phoenix'

export interface Tile {
  id: string
  type: TileType
  row: number
  col: number
  isMatched?: boolean
  isPowerUp?: boolean
}

export interface Level {
  id: number
  name: string
  biome: string
  description: string
  gridSize: number
  targetScore: number
  movesLimit: number
  tileTypes?: TileType[]
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
