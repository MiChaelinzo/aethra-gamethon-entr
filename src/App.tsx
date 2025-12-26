import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { GameGrid } from './components/GameGrid'
import { GameStats } from './components/GameStats'
import { EducationalCard } from './components/EducationalCard'
import { LevelComplete } from './components/LevelComplete'
import { LevelSelect } from './components/LevelSelect'
import { BiomeBackgroundEffect } from './components/BiomeBackgroundEffect'
import { PowerUpAnimation } from './components/PowerUpAnimation'
import { DailyChallenge } from './components/DailyChallenge'
import { Leaderboard } from './components/Leaderboard'
import { TournamentView } from './components/TournamentView'
import { BadgeShowcase } from './components/BadgeShowcase'
import { Button } from './components/ui/button'
import { ArrowLeft, Shuffle } from '@phosphor-icons/react'
import { Tile, GameState, TileInfo, DailyChallenge as DailyChallengeType, LeaderboardEntry, ChallengeCompletion, Tournament, TournamentEntry, PlayerBadge } from './lib/types'
import { LEVELS, TILE_INFO, BIOME_GRADIENTS, POLLUTION_GRADIENT } from './lib/gameData'
import { getTodayChallenge, isChallengeActive } from './lib/challengeData'
import { getCurrentTournament, isTournamentActive } from './lib/tournamentData'
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
  totalCO2Reduced: 0,
  unlockedPowerUps: [],
  dailyChallengeStreak: 0
}

function App() {
  const [gameState, setGameState] = useKV<GameState>('ecorise-game-state', DEFAULT_GAME_STATE)
  const [grid, setGrid] = useState<Tile[]>([])
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null)
  const [matchedTiles, setMatchedTiles] = useState<Tile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [combo, setCombo] = useState(0)
  const [showEducational, setShowEducational] = useState(false)
  const [currentTileInfo, setCurrentTileInfo] = useState<TileInfo | null>(null)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [levelCO2, setLevelCO2] = useState(0)
  const [seenTileTypes, setSeenTileTypes] = useKV<string[]>('ecorise-seen-tiles', [])
  const [showBiomeEffect, setShowBiomeEffect] = useState(false)
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null)
  const [showDailyChallenge, setShowDailyChallenge] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showTournament, setShowTournament] = useState(false)
  const [showBadgeShowcase, setShowBadgeShowcase] = useState(false)
  const [isChallenge, setIsChallenge] = useState(false)
  const [isTournament, setIsTournament] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState<DailyChallengeType | null>(null)
  const [currentTournament, setCurrentTournament] = useState<Tournament | null>(null)
  const [challengeCompletions, setChallengeCompletions] = useKV<ChallengeCompletion[]>('ecorise-challenges', [])
  const [leaderboardEntries, setLeaderboardEntries] = useKV<LeaderboardEntry[]>('ecorise-leaderboard', [])
  const [tournamentEntries, setTournamentEntries] = useKV<TournamentEntry[]>('ecorise-tournaments', [])
  const [playerBadges, setPlayerBadges] = useKV<PlayerBadge[]>('ecorise-badges', [])
  const [currentUserId, setCurrentUserId] = useState<string>('')

  const state = gameState ?? DEFAULT_GAME_STATE
  const seen = seenTileTypes ?? []
  const completions = challengeCompletions ?? []
  const leaderboard = leaderboardEntries ?? []
  const tournaments = tournamentEntries ?? []
  const badges = playerBadges ?? []
  
  const currentLevel = isChallenge && currentChallenge
    ? {
        id: 999,
        name: currentChallenge.name,
        biome: currentChallenge.biome,
        description: currentChallenge.description,
        gridSize: currentChallenge.gridSize,
        targetScore: currentChallenge.targetScore,
        movesLimit: currentChallenge.movesLimit,
        tileTypes: currentChallenge.tileTypes
      }
    : isTournament && currentTournament
    ? {
        id: 998,
        name: currentTournament.name,
        biome: currentTournament.biome,
        description: currentTournament.description,
        gridSize: currentTournament.gridSize,
        targetScore: currentTournament.targetScore,
        movesLimit: currentTournament.movesLimit,
        tileTypes: currentTournament.tileTypes
      }
    : LEVELS.find(l => l.id === state.currentLevel)
  
  const isInGame = (state.currentLevel > 0 || isChallenge || isTournament) && currentLevel

  useEffect(() => {
    if (currentLevel && grid.length === 0) {
      setGrid(generateGrid(currentLevel.gridSize, currentLevel, state.unlockedPowerUps))
    }
  }, [currentLevel])

  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await window.spark.user()
        if (user) {
          setCurrentUserId(String(user.id))
        }
      } catch (error) {
        console.error('Failed to get user:', error)
      }
    }
    getUserId()
  }, [])

  useEffect(() => {
    const updateLeaderboard = async () => {
      try {
        const user = await window.spark.user()
        if (!user) return
        
        const userId = String(user.id)
        const existingIndex = leaderboard.findIndex(e => e.userId === userId)
        
        if (existingIndex >= 0) {
          setLeaderboardEntries(current => {
            const updated = [...(current ?? [])]
            updated[existingIndex] = {
              userId,
              username: user.login,
              avatarUrl: user.avatarUrl,
              score: state.score,
              co2Reduced: state.totalCO2Reduced,
              challengesCompleted: completions.length,
              streak: state.dailyChallengeStreak,
              isOwner: user.isOwner
            }
            return updated
          })
        } else {
          setLeaderboardEntries(current => [
            ...(current ?? []),
            {
              userId,
              username: user.login,
              avatarUrl: user.avatarUrl,
              score: state.score,
              co2Reduced: state.totalCO2Reduced,
              challengesCompleted: completions.length,
              streak: state.dailyChallengeStreak,
              isOwner: user.isOwner
            }
          ])
        }
      } catch (error) {
        console.error('Failed to update leaderboard:', error)
      }
    }

    if (state.score > 0) {
      updateLeaderboard()
    }
  }, [state.score, state.totalCO2Reduced, completions.length, state.dailyChallengeStreak])

  const startLevel = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId)
    if (!level) return

    setIsChallenge(false)
    setIsTournament(false)
    setCurrentChallenge(null)
    setCurrentTournament(null)
    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      currentLevel: levelId,
      score: 0,
      moves: 0,
      pollution: 100
    }))
    setGrid(generateGrid(level.gridSize, level, state.unlockedPowerUps))
    setCombo(0)
    setLevelCO2(0)
    setShowLevelComplete(false)
  }

  const startDailyChallenge = () => {
    const challenge = getTodayChallenge()
    if (!isChallengeActive(challenge)) {
      toast.error('This challenge has expired!')
      return
    }

    setCurrentChallenge(challenge)
    setIsChallenge(true)
    setIsTournament(false)
    setCurrentTournament(null)
    setShowDailyChallenge(false)
    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      currentLevel: 999,
      score: 0,
      moves: 0,
      pollution: 100
    }))
    setGrid(generateGrid(challenge.gridSize, {
      id: 999,
      name: challenge.name,
      biome: challenge.biome,
      description: challenge.description,
      gridSize: challenge.gridSize,
      targetScore: challenge.targetScore,
      movesLimit: challenge.movesLimit,
      tileTypes: challenge.tileTypes
    }, state.unlockedPowerUps))
    setCombo(0)
    setLevelCO2(0)
    setShowLevelComplete(false)
  }

  const startTournament = () => {
    const tournament = getCurrentTournament()
    if (!isTournamentActive(tournament)) {
      toast.error('This tournament is not active!')
      return
    }

    setCurrentTournament(tournament)
    setIsTournament(true)
    setIsChallenge(false)
    setCurrentChallenge(null)
    setShowTournament(false)
    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      currentLevel: 998,
      score: 0,
      moves: 0,
      pollution: 100
    }))
    setGrid(generateGrid(tournament.gridSize, {
      id: 998,
      name: tournament.name,
      biome: tournament.biome,
      description: tournament.description,
      gridSize: tournament.gridSize,
      targetScore: tournament.targetScore,
      movesLimit: tournament.movesLimit,
      tileTypes: tournament.tileTypes
    }, state.unlockedPowerUps))
    setCombo(0)
    setLevelCO2(0)
    setShowLevelComplete(false)
  }

  const handleTileClick = async (tile: Tile) => {
    if (isProcessing || !currentLevel) return

    if (!seen.includes(tile.type)) {
      setSeenTileTypes((current) => [...(current ?? []), tile.type])
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

    setMatchedTiles(matches)
    setShowBiomeEffect(true)

    const powerUpMatch = matches.find(m => m.isPowerUp)
    if (powerUpMatch) {
      setActivePowerUp(powerUpMatch.type)
      
      const powerUpMessages: Record<string, string> = {
        supernova: '☀️ SUPERNOVA! Massive energy burst!',
        tsunami: '🌊 TSUNAMI! Cleansing wave of change!',
        earthquake: '🏔️ EARTHQUAKE! Reshaping the landscape!',
        meteor: '☄️ METEOR IMPACT! Cosmic transformation!',
        phoenix: '🔥 PHOENIX! Rising from the ashes!'
      }
      
      toast.success(powerUpMessages[powerUpMatch.type] || 'POWER-UP ACTIVATED!', {
        duration: 3000
      })
    }

    const matchScore = matches.length * 50 * (combo + 1) * (powerUpMatch ? 3 : 1)
    const co2Reduction = matches.reduce((sum, match) => sum + TILE_INFO[match.type].co2Impact, 0)
    const pollutionReduction = matches.length * (powerUpMatch ? 15 : 5)

    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      score: (current?.score ?? 0) + matchScore,
      moves: (current?.moves ?? 0) + 1,
      pollution: Math.max(0, (current?.pollution ?? 100) - pollutionReduction),
      totalCO2Reduced: (current?.totalCO2Reduced ?? 0) + co2Reduction
    }))

    setLevelCO2(prev => prev + co2Reduction)
    setCombo(prev => prev + 1)

    if (matches.length >= 4 || powerUpMatch) {
      toast.success(`${powerUpMatch ? 'MEGA ' : ''}Amazing! ${matches.length} match combo!`)
    }

    await new Promise(resolve => setTimeout(resolve, powerUpMatch ? 1500 : 800))

    setMatchedTiles([])
    setShowBiomeEffect(false)
    if (powerUpMatch) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setActivePowerUp(null)
    }

    let newGrid = removeMatches(currentGrid, matches)
    newGrid = dropTiles(newGrid, currentLevel.gridSize)
    newGrid = fillEmpty(newGrid, currentLevel.gridSize, currentLevel, state.unlockedPowerUps)
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

    const currentState = gameState ?? DEFAULT_GAME_STATE
    const hasWon = currentState.score >= currentLevel.targetScore
    const hasLost = currentState.moves >= currentLevel.movesLimit && !hasWon
    const noMoves = !hasValidMoves(currentGrid, currentLevel.gridSize)

    if (hasWon) {
      if (isTournament && currentTournament) {
        const existingEntryIndex = tournaments.findIndex(
          t => t.tournamentId === currentTournament.id && t.userId === currentUserId
        )

        if (existingEntryIndex >= 0) {
          const existingEntry = tournaments[existingEntryIndex]
          if (currentState.score > existingEntry.score) {
            setTournamentEntries(current => {
              const updated = [...(current ?? [])]
              updated[existingEntryIndex] = {
                ...existingEntry,
                score: currentState.score,
                co2Reduced: levelCO2,
                completedAt: new Date().toISOString()
              }
              return updated
            })
            toast.success('🏆 New personal best in tournament!', { duration: 5000 })
          }
        } else {
          const addTournamentEntry = async () => {
            try {
              const user = await window.spark.user()
              if (!user) return

              setTournamentEntries(current => [
                ...(current ?? []),
                {
                  tournamentId: currentTournament.id,
                  userId: String(user.id),
                  username: user.login,
                  avatarUrl: user.avatarUrl,
                  score: currentState.score,
                  co2Reduced: levelCO2,
                  completedAt: new Date().toISOString(),
                  isOwner: user.isOwner
                }
              ])

              awardBadge({
                type: 'participant',
                tournamentName: currentTournament.name,
                tournamentId: currentTournament.id,
                earnedAt: new Date().toISOString()
              })

              setTimeout(() => {
                const sortedEntries = [...tournaments, {
                  tournamentId: currentTournament.id,
                  userId: String(user.id),
                  username: user.login,
                  avatarUrl: user.avatarUrl,
                  score: currentState.score,
                  co2Reduced: levelCO2,
                  completedAt: new Date().toISOString(),
                  isOwner: user.isOwner
                }].filter(e => e.tournamentId === currentTournament.id)
                  .sort((a, b) => b.score - a.score)

                const userRank = sortedEntries.findIndex(e => e.userId === String(user.id)) + 1

                if (userRank === 1) {
                  awardBadge({
                    type: 'champion',
                    tournamentName: currentTournament.name,
                    tournamentId: currentTournament.id,
                    rank: 1,
                    earnedAt: new Date().toISOString()
                  })
                } else if (userRank === 2) {
                  awardBadge({
                    type: 'runner-up',
                    tournamentName: currentTournament.name,
                    tournamentId: currentTournament.id,
                    rank: 2,
                    earnedAt: new Date().toISOString()
                  })
                } else if (userRank === 3) {
                  awardBadge({
                    type: 'third-place',
                    tournamentName: currentTournament.name,
                    tournamentId: currentTournament.id,
                    rank: 3,
                    earnedAt: new Date().toISOString()
                  })
                } else if (userRank <= 10) {
                  awardBadge({
                    type: 'top-10',
                    tournamentName: currentTournament.name,
                    tournamentId: currentTournament.id,
                    rank: userRank,
                    earnedAt: new Date().toISOString()
                  })
                }
              }, 100)
            } catch (error) {
              console.error('Failed to add tournament entry:', error)
            }
          }
          addTournamentEntry()
          toast.success('🎉 Tournament entry submitted!', { duration: 5000 })
        }
      } else if (isChallenge && currentChallenge) {
        const alreadyCompleted = completions.some(c => c.challengeId === currentChallenge.id)
        
        if (!alreadyCompleted) {
          const lastDate = state.lastChallengeDate
          const today = new Date().toISOString().split('T')[0]
          
          let isConsecutive = false
          if (lastDate) {
            const lastDateTime = new Date(lastDate + 'T00:00:00').getTime()
            const todayTime = new Date(today + 'T00:00:00').getTime()
            const daysDiff = Math.floor((todayTime - lastDateTime) / 86400000)
            isConsecutive = daysDiff === 1
          }
          
          const newStreak = isConsecutive ? (state.dailyChallengeStreak ?? 0) + 1 : 1
          
          setGameState((current) => ({
            ...(current ?? DEFAULT_GAME_STATE),
            unlockedPowerUps: [...new Set([...(current?.unlockedPowerUps ?? []), currentChallenge.rewardPowerUp])],
            dailyChallengeStreak: newStreak,
            lastChallengeDate: today
          }))

          setChallengeCompletions(current => [
            ...(current ?? []),
            {
              challengeId: currentChallenge.id,
              completedAt: new Date().toISOString(),
              score: currentState.score,
              co2Reduced: levelCO2
            }
          ])

          toast.success(`🎁 Unlocked ${TILE_INFO[currentChallenge.rewardPowerUp].name}!`, {
            duration: 5000
          })

          if (newStreak >= 7 && !badges.some(b => b.type === 'streak-master')) {
            setTimeout(() => {
              toast.success('🔥 STREAK MASTER BADGE EARNED! 7 days in a row!', {
                duration: 6000
              })
            }, 1500)
          } else if (isConsecutive) {
            toast.success(`🔥 ${newStreak} day streak! ${newStreak >= 7 ? 'Amazing!' : `${7 - newStreak} more for Streak Master badge!`}`, {
              duration: 4000
            })
          }
        }
      } else {
        setGameState((current) => ({
          ...(current ?? DEFAULT_GAME_STATE),
          completedLevels: (current?.completedLevels ?? []).includes(currentLevel.id)
            ? (current?.completedLevels ?? [])
            : [...(current?.completedLevels ?? []), currentLevel.id]
        }))
      }
      
      setShowLevelComplete(true)
      toast.success('Level Complete! 🎉')
    } else if (hasLost) {
      toast.error('Out of moves! Try again.')
      setTimeout(() => {
        if (isTournament) {
          startTournament()
        } else if (isChallenge) {
          startDailyChallenge()
        } else {
          startLevel(currentLevel.id)
        }
      }, 2000)
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
    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      currentLevel: 0
    }))
    setGrid([])
    setIsChallenge(false)
    setIsTournament(false)
    setCurrentChallenge(null)
    setCurrentTournament(null)
  }

  const awardBadge = (badge: PlayerBadge) => {
    const exists = badges.some(b => 
      b.type === badge.type && 
      b.tournamentId === badge.tournamentId
    )
    
    if (!exists) {
      setPlayerBadges(current => [...(current ?? []), badge])
      toast.success(`🏆 Badge Earned: ${badge.type}!`, { duration: 4000 })
    }
  }

  useEffect(() => {
    if (state.dailyChallengeStreak >= 7) {
      awardBadge({
        type: 'streak-master',
        detail: `${state.dailyChallengeStreak} day streak`,
        earnedAt: new Date().toISOString()
      })
    }

    if (state.totalCO2Reduced >= 100000) {
      awardBadge({
        type: 'eco-warrior',
        detail: `${(state.totalCO2Reduced / 1000).toFixed(1)}t CO₂ reduced`,
        earnedAt: new Date().toISOString()
      })
    }

    if (completions.length >= 25) {
      awardBadge({
        type: 'challenger',
        detail: `${completions.length} challenges completed`,
        earnedAt: new Date().toISOString()
      })
    }
  }, [state.dailyChallengeStreak, state.totalCO2Reduced, completions.length])

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
    const todayChallenge = getTodayChallenge()
    const isChallengeCompleted = completions.some(c => c.challengeId === todayChallenge.id)
    const activeTournament = getCurrentTournament()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {showDailyChallenge && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
              <DailyChallenge
                challenge={todayChallenge}
                streak={state.dailyChallengeStreak}
                isCompleted={isChallengeCompleted}
                onStart={startDailyChallenge}
                hasUnlockedReward={state.unlockedPowerUps.includes(todayChallenge.rewardPowerUp)}
              />
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => setShowDailyChallenge(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {showLeaderboard && (
          <Leaderboard
            entries={leaderboard}
            tournamentEntries={tournaments}
            currentUserId={currentUserId}
            onClose={() => setShowLeaderboard(false)}
          />
        )}

        {showTournament && (
          <TournamentView
            tournament={activeTournament}
            entries={tournaments}
            currentUserId={currentUserId}
            onStart={startTournament}
            onClose={() => setShowTournament(false)}
          />
        )}

        {showBadgeShowcase && (
          <BadgeShowcase
            onClose={() => setShowBadgeShowcase(false)}
            playerBadges={badges}
            stats={{
              totalCO2Reduced: state.totalCO2Reduced,
              challengesCompleted: completions.length,
              currentStreak: state.dailyChallengeStreak,
              tournamentsEntered: tournaments.filter(t => t.userId === currentUserId).length
            }}
          />
        )}

        <LevelSelect
          levels={LEVELS}
          completedLevels={state.completedLevels}
          onSelectLevel={startLevel}
          totalCO2Reduced={state.totalCO2Reduced}
          onOpenDailyChallenge={() => setShowDailyChallenge(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenTournament={() => setShowTournament(true)}
          onOpenBadgeShowcase={() => setShowBadgeShowcase(true)}
          unlockedPowerUps={state.unlockedPowerUps}
          currentStreak={state.dailyChallengeStreak}
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
      
      <BiomeBackgroundEffect 
        biome={currentLevel?.biome || 'forest'} 
        isActive={showBiomeEffect} 
      />

      <PowerUpAnimation
        type={activePowerUp as any}
        isActive={!!activePowerUp}
        onComplete={() => setActivePowerUp(null)}
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
                    matchedTiles={matchedTiles}
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
          onNextLevel={isTournament ? handleBackToMenu : isChallenge ? handleBackToMenu : handleNextLevel}
          onRestart={isTournament ? startTournament : isChallenge ? startDailyChallenge : () => startLevel(currentLevel.id)}
          isLastLevel={!isTournament && !isChallenge && currentLevel.id === LEVELS.length}
        />
      )}
    </div>
  )
}

export default App