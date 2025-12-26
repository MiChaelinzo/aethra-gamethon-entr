import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { GameGrid } from './components/GameGrid'
import { GameStats } from './components/GameStats'
import { EducationalCard } from './components/EducationalCard'
import { LevelComplete } from './components/LevelComplete'
import { LevelSelect } from './components/LevelSelect'
import { Button } from './components/ui/button'
import { ArrowLeft, Shuffle } from '@phosphor-icons/react'
import { Tile, GameState, TileInfo } from './lib/types'
import { LEVELS, TILE_INFO, BIOME_GRADIENTS, POLLUTION_GRADIENT } from './lib/gameData'
import {
  generateGrid,
  findMatches,
  swapTiles,
  areAdjacent,
  removeMatches,
  dropTiles,
  fillEmpty,
  hasValidMoves,
  shuffleGrid
} from './lib/gameLogic'

const DEFAULT_GAME_STATE: GameState = {
  currentLevel: 0,
  score: 0,
  moves: 0,
  pollution: 100,
  completedLevels: [],
  totalCO2Reduced: 0
}

function App() {
  const [gameState, setGameState] = useKV<GameState>('ecorise-game-state', DEFAULT_GAME_STATE)
  const [grid, setGrid] = useState<Tile[]>([])
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [combo, setCombo] = useState(0)
  const [showEducational, setShowEducational] = useState(false)
  const [currentTileInfo, setCurrentTileInfo] = useState<TileInfo | null>(null)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [levelCO2, setLevelCO2] = useState(0)
  const [seenTileTypes, setSeenTileTypes] = useKV<string[]>('ecorise-seen-tiles', [])

  const state = gameState ?? DEFAULT_GAME_STATE
  const seen = seenTileTypes ?? []
  const currentLevel = LEVELS.find(l => l.id === state.currentLevel)
  const isInGame = state.currentLevel > 0

  useEffect(() => {
    if (currentLevel && grid.length === 0) {
      setGrid(generateGrid(currentLevel.gridSize))
    }
  }, [currentLevel])

  const startLevel = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId)
    if (!level) return

    setGameState({
      ...state,
      currentLevel: levelId,
      score: 0,
      moves: 0,
      pollution: 100
    })
    setGrid(generateGrid(level.gridSize))
    setCombo(0)
    setLevelCO2(0)
    setShowLevelComplete(false)
  }

  const handleTileClick = async (tile: Tile) => {
    if (isProcessing || !currentLevel) return

    if (!seen.includes(tile.type)) {
      setSeenTileTypes([...seen, tile.type])
      setCurrentTileInfo(TILE_INFO[tile.type])
      setShowEducational(true)
    }

    if (!selectedTile) {
      setSelectedTile(tile)
      return
    }

    if (selectedTile.id === tile.id) {
      setSelectedTile(null)
      return
    }

    if (!areAdjacent(selectedTile, tile)) {
      setSelectedTile(tile)
      return
    }

    setIsProcessing(true)
    const swapped = swapTiles(grid, selectedTile, tile)
    const matches = findMatches(swapped, currentLevel.gridSize)

    if (matches.length === 0) {
      toast.error('No matches! Try a different move.')
      setSelectedTile(null)
      setIsProcessing(false)
      return
    }

    setGrid(swapped)
    setSelectedTile(null)
    
    await processMatches(swapped, matches)
  }

  const processMatches = async (currentGrid: Tile[], matches: Tile[]) => {
    if (!currentLevel) return

    const matchScore = matches.length * 50 * (combo + 1)
    const co2Reduction = matches.reduce((sum, match) => sum + TILE_INFO[match.type].co2Impact, 0)
    const pollutionReduction = matches.length * 5

    setGameState({
      ...state,
      score: state.score + matchScore,
      moves: state.moves + 1,
      pollution: Math.max(0, state.pollution - pollutionReduction),
      totalCO2Reduced: state.totalCO2Reduced + co2Reduction
    })

    setLevelCO2(prev => prev + co2Reduction)
    setCombo(prev => prev + 1)

    if (matches.length >= 4) {
      toast.success(`Amazing! ${matches.length} match combo!`)
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    let newGrid = removeMatches(currentGrid, matches)
    newGrid = dropTiles(newGrid, currentLevel.gridSize)
    newGrid = fillEmpty(newGrid, currentLevel.gridSize)
    setGrid(newGrid)

    await new Promise(resolve => setTimeout(resolve, 300))

    const newMatches = findMatches(newGrid, currentLevel.gridSize)
    if (newMatches.length > 0) {
      await processMatches(newGrid, newMatches)
    } else {
      setCombo(0)
      checkGameEnd(newGrid)
      setIsProcessing(false)
    }
  }

  const checkGameEnd = (currentGrid: Tile[]) => {
    if (!currentLevel) return

    const hasWon = state.score >= currentLevel.targetScore
    const hasLost = state.moves >= currentLevel.movesLimit && !hasWon
    const noMoves = !hasValidMoves(currentGrid, currentLevel.gridSize)

    if (hasWon) {
      setGameState({
        ...state,
        completedLevels: state.completedLevels.includes(currentLevel.id)
          ? state.completedLevels
          : [...state.completedLevels, currentLevel.id]
      })
      setShowLevelComplete(true)
      toast.success('Level Complete! 🎉')
    } else if (hasLost) {
      toast.error('Out of moves! Try again.')
      setTimeout(() => startLevel(currentLevel.id), 2000)
    } else if (noMoves) {
      toast('No valid moves! Shuffling...', { icon: '🔄' })
      setGrid(shuffleGrid(currentGrid, currentLevel.gridSize))
    }
  }

  const handleShuffle = () => {
    if (!currentLevel || isProcessing) return
    
    toast('Board shuffled!', { icon: '🔄' })
    setGrid(shuffleGrid(grid, currentLevel.gridSize))
  }

  const handleNextLevel = () => {
    const nextLevel = LEVELS.find(l => l.id === currentLevel!.id + 1)
    if (nextLevel) {
      startLevel(nextLevel.id)
    }
  }

  const handleBackToMenu = () => {
    setGameState({
      ...state,
      currentLevel: 0
    })
    setGrid([])
  }

  const progressPercent = currentLevel 
    ? Math.min((state.score / currentLevel.targetScore) * 100, 100)
    : 0

  const backgroundGradient = currentLevel
    ? BIOME_GRADIENTS[currentLevel.biome as keyof typeof BIOME_GRADIENTS]
    : POLLUTION_GRADIENT

  const gradientOpacity = currentLevel 
    ? Math.max(0.15, Math.min(0.4, progressPercent / 100 * 0.4))
    : 0.1

  if (!isInGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <LevelSelect
          levels={LEVELS}
          completedLevels={state.completedLevels}
          onSelectLevel={startLevel}
          totalCO2Reduced={state.totalCO2Reduced}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} transition-opacity duration-[2000ms]`}
        animate={{ opacity: gradientOpacity }}
      />
      
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={handleBackToMenu}>
              <ArrowLeft className="mr-2" />
              Menu
            </Button>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-1">{currentLevel?.name}</h2>
              <p className="text-sm text-muted-foreground">{currentLevel?.description}</p>
            </div>

            <Button variant="outline" onClick={handleShuffle} disabled={isProcessing}>
              <Shuffle className="mr-2" />
              Shuffle
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLevel?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GameGrid
                    grid={grid}
                    size={currentLevel?.gridSize || 6}
                    selectedTile={selectedTile}
                    onTileClick={handleTileClick}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:sticky lg:top-8 h-fit">
              <GameStats
                score={state.score}
                targetScore={currentLevel?.targetScore || 0}
                moves={state.moves}
                movesLimit={currentLevel?.movesLimit || 0}
                pollution={state.pollution}
                combo={combo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTileInfo && (
        <EducationalCard
          isOpen={showEducational}
          onClose={() => setShowEducational(false)}
          tileInfo={currentTileInfo}
        />
      )}

      {currentLevel && (
        <LevelComplete
          isOpen={showLevelComplete}
          score={state.score}
          targetScore={currentLevel.targetScore}
          co2Reduced={levelCO2}
          onNextLevel={handleNextLevel}
          onRestart={() => startLevel(currentLevel.id)}
          isLastLevel={currentLevel.id === LEVELS.length}
        />
      )}
    </div>
  )
}

export default App