import { Tile, TileType, Level } from './types'

const TILE_TYPES: TileType[] = ['tree', 'solar', 'wind', 'recycle', 'water', 'energy']
const POWERUP_TYPES: TileType[] = ['supernova', 'tsunami', 'earthquake', 'meteor', 'phoenix']

export function generateGrid(size: number, level?: Level, unlockedPowerUps: TileType[] = []): Tile[] {
  const grid: Tile[] = []
  const availableTiles = level?.tileTypes || TILE_TYPES
  const availablePowerUps = unlockedPowerUps.length > 0 
    ? POWERUP_TYPES.filter(p => unlockedPowerUps.includes(p))
    : []
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const isPowerUp = availablePowerUps.length > 0 && Math.random() < 0.03
      grid.push({
        id: `${row}-${col}`,
        type: isPowerUp 
          ? availablePowerUps[Math.floor(Math.random() * availablePowerUps.length)] 
          : availableTiles[Math.floor(Math.random() * availableTiles.length)],
        row,
        col,
        isPowerUp
      })
    }
  }
  
  return grid
}

export function findMatches(grid: Tile[], size: number): Tile[] {
  const matches: Set<string> = new Set()
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const tile = grid[row * size + col]
      
      const horizontalMatch = checkHorizontalMatch(grid, size, row, col)
      const verticalMatch = checkVerticalMatch(grid, size, row, col)
      
      if (horizontalMatch.length >= 3) {
        horizontalMatch.forEach(t => matches.add(t.id))
        
        const hasPowerUp = horizontalMatch.some(t => t.isPowerUp)
        if (hasPowerUp) {
          horizontalMatch.forEach(t => {
            if (t.isPowerUp) {
              const adjacentTiles = getAdjacentTiles(grid, size, t.row, t.col)
              adjacentTiles.forEach(adj => matches.add(adj.id))
            }
          })
        }
      }
      
      if (verticalMatch.length >= 3) {
        verticalMatch.forEach(t => matches.add(t.id))
        
        const hasPowerUp = verticalMatch.some(t => t.isPowerUp)
        if (hasPowerUp) {
          verticalMatch.forEach(t => {
            if (t.isPowerUp) {
              const adjacentTiles = getAdjacentTiles(grid, size, t.row, t.col)
              adjacentTiles.forEach(adj => matches.add(adj.id))
            }
          })
        }
      }
    }
  }
  
  return grid.filter(tile => matches.has(tile.id))
}

function getAdjacentTiles(grid: Tile[], size: number, row: number, col: number): Tile[] {
  const adjacent: Tile[] = []
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ]
  
  for (const [dr, dc] of directions) {
    const newRow = row + dr
    const newCol = col + dc
    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
      adjacent.push(grid[newRow * size + newCol])
    }
  }
  
  return adjacent
}

function checkHorizontalMatch(grid: Tile[], size: number, row: number, col: number): Tile[] {
  const tile = grid[row * size + col]
  const matched: Tile[] = [tile]
  
  for (let c = col + 1; c < size; c++) {
    const nextTile = grid[row * size + c]
    if (nextTile.type === tile.type) {
      matched.push(nextTile)
    } else {
      break
    }
  }
  
  return matched
}

function checkVerticalMatch(grid: Tile[], size: number, row: number, col: number): Tile[] {
  const tile = grid[row * size + col]
  const matched: Tile[] = [tile]
  
  for (let r = row + 1; r < size; r++) {
    const nextTile = grid[r * size + col]
    if (nextTile.type === tile.type) {
      matched.push(nextTile)
    } else {
      break
    }
  }
  
  return matched
}

export function swapTiles(grid: Tile[], tile1: Tile, tile2: Tile): Tile[] {
  const newGrid = [...grid]
  const index1 = newGrid.findIndex(t => t.id === tile1.id)
  const index2 = newGrid.findIndex(t => t.id === tile2.id)
  
  if (index1 === -1 || index2 === -1) return grid
  
  const temp = { ...newGrid[index1] }
  newGrid[index1] = { ...newGrid[index2], row: tile1.row, col: tile1.col, id: tile1.id }
  newGrid[index2] = { ...temp, row: tile2.row, col: tile2.col, id: tile2.id }
  
  return newGrid
}

export function areAdjacent(tile1: Tile, tile2: Tile): boolean {
  const rowDiff = Math.abs(tile1.row - tile2.row)
  const colDiff = Math.abs(tile1.col - tile2.col)
  
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)
}

export function removeMatches(grid: Tile[], matches: Tile[]): Tile[] {
  const matchIds = new Set(matches.map(m => m.id))
  return grid.filter(tile => !matchIds.has(tile.id))
}

export function dropTiles(grid: Tile[], size: number): Tile[] {
  const newGrid = [...grid]
  
  for (let col = 0; col < size; col++) {
    let emptyRow = size - 1
    
    for (let row = size - 1; row >= 0; row--) {
      const tile = newGrid.find(t => t.row === row && t.col === col)
      
      if (tile) {
        if (row !== emptyRow) {
          tile.row = emptyRow
          tile.id = `${emptyRow}-${col}`
        }
        emptyRow--
      }
    }
  }
  
  return newGrid
}

export function fillEmpty(grid: Tile[], size: number, level?: Level, unlockedPowerUps: TileType[] = []): Tile[] {
  const newGrid = [...grid]
  const availableTiles = level?.tileTypes || TILE_TYPES
  const availablePowerUps = unlockedPowerUps.length > 0 
    ? POWERUP_TYPES.filter(p => unlockedPowerUps.includes(p))
    : []
  
  for (let col = 0; col < size; col++) {
    const colTiles = newGrid.filter(t => t.col === col)
    const missing = size - colTiles.length
    
    for (let i = 0; i < missing; i++) {
      const isPowerUp = availablePowerUps.length > 0 && Math.random() < 0.02
      newGrid.push({
        id: `${i}-${col}`,
        type: isPowerUp 
          ? availablePowerUps[Math.floor(Math.random() * availablePowerUps.length)]
          : availableTiles[Math.floor(Math.random() * availableTiles.length)],
        row: i,
        col,
        isPowerUp
      })
    }
  }
  
  return newGrid
}

export function hasValidMoves(grid: Tile[], size: number): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const tile = grid[row * size + col]
      
      if (col < size - 1) {
        const right = grid[row * size + col + 1]
        const swapped = swapTiles(grid, tile, right)
        if (findMatches(swapped, size).length > 0) return true
      }
      
      if (row < size - 1) {
        const below = grid[(row + 1) * size + col]
        const swapped = swapTiles(grid, tile, below)
        if (findMatches(swapped, size).length > 0) return true
      }
    }
  }
  
  return false
}

export function shuffleGrid(grid: Tile[], size: number): Tile[] {
  const types = grid.map(t => t.type)
  
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]]
  }
  
  return grid.map((tile, index) => ({
    ...tile,
    type: types[index]
  }))
}

export interface ValidMove {
  tile1: Tile
  tile2: Tile
  matchCount: number
}

export function findValidMoves(grid: Tile[], size: number): ValidMove[] {
  const validMoves: ValidMove[] = []
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const tile = grid[row * size + col]
      
      if (col < size - 1) {
        const right = grid[row * size + col + 1]
        const swapped = swapTiles(grid, tile, right)
        const matches = findMatches(swapped, size)
        if (matches.length > 0) {
          validMoves.push({
            tile1: tile,
            tile2: right,
            matchCount: matches.length
          })
        }
      }
      
      if (row < size - 1) {
        const below = grid[(row + 1) * size + col]
        const swapped = swapTiles(grid, tile, below)
        const matches = findMatches(swapped, size)
        if (matches.length > 0) {
          validMoves.push({
            tile1: tile,
            tile2: below,
            matchCount: matches.length
          })
        }
      }
    }
  }
  
  return validMoves
}

export function findBestMove(grid: Tile[], size: number): ValidMove | null {
  const validMoves = findValidMoves(grid, size)
  
  if (validMoves.length === 0) return null
  
  validMoves.sort((a, b) => b.matchCount - a.matchCount)
  
  return validMoves[0]
}
