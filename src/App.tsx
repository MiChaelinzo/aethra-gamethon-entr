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
import { ConfettiCelebration } from './components/ConfettiCelebration'
import { MusicControl } from './components/MusicControl'
import { MusicVisualizer } from './components/MusicVisualizer'
import { MouseTrail } from './components/MouseTrail'
import { MouseTrailControl } from './components/MouseTrailControl'
import { ParticleThemeSwitcher } from './components/ParticleThemeSwitcher'
import { ThemeSwitchBurst } from './components/ThemeSwitchBurst'
import { CollisionMultiplier } from './components/CollisionMultiplier'
import { HeatmapControl } from './components/HeatmapControl'
import { CollisionStatisticsPanel } from './components/CollisionStatisticsPanel'
import { TutorialOverlay } from './components/TutorialOverlay'
import { QuickHelp } from './components/QuickHelp'
import { UserProfile } from './components/UserProfile'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { ArrowLeft, Shuffle, ChartBar, Skull } from '@phosphor-icons/react'
import { Tile, GameState, TileInfo, DailyChallenge as DailyChallengeType, LeaderboardEntry, ChallengeCompletion, Tournament, TournamentEntry, PlayerBadge, VisualizerStyle, TrailTheme, CollisionZoneData, BiomeCollisionStats, CollisionStatistics, CollisionTimeEntry, TimeBasedStatistics, DifficultyMode } from './lib/types'
import { LEVELS, EXTREME_LEVELS, TILE_INFO, BIOME_GRADIENTS, POLLUTION_GRADIENT } from './lib/gameData'
import { TRAIL_THEMES } from './lib/trailThemes'
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
import { playSoundEffect } from './lib/soundEffects'
import { playBackgroundMusic, stopBackgroundMusic } from './lib/backgroundMusic'

const DEFAULT_GAME_STATE: GameState = {
  currentLevel: 0,
  score: 0,
  moves: 0,
  pollution: 100,
  completedLevels: [],
  totalCO2Reduced: 0,
  unlockedPowerUps: [],
  dailyChallengeStreak: 0,
  difficultyMode: 'normal',
  extremeCompletedLevels: []
}

function App() {
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<{login: string; avatarUrl: string; id: string} | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  
  const userKey = (key: string) => currentUserId ? `${key}-${currentUserId}` : key
  
  const [gameState, setGameState] = useKV<GameState>(userKey('ecorise-game-state'), DEFAULT_GAME_STATE)
  const [grid, setGrid] = useState<Tile[]>([])
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null)
  const [matchedTiles, setMatchedTiles] = useState<Tile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [combo, setCombo] = useState(0)
  const [showEducational, setShowEducational] = useState(false)
  const [currentTileInfo, setCurrentTileInfo] = useState<TileInfo | null>(null)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [levelCO2, setLevelCO2] = useState(0)
  const [seenTileTypes, setSeenTileTypes] = useKV<string[]>(userKey('ecorise-seen-tiles'), [])
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
  const [challengeCompletions, setChallengeCompletions] = useKV<ChallengeCompletion[]>(userKey('ecorise-challenges'), [])
  const [leaderboardEntries, setLeaderboardEntries] = useKV<LeaderboardEntry[]>('ecorise-leaderboard', [])
  const [tournamentEntries, setTournamentEntries] = useKV<TournamentEntry[]>('ecorise-tournaments', [])
  const [playerBadges, setPlayerBadges] = useKV<PlayerBadge[]>(userKey('ecorise-badges'), [])
  const [showStreakConfetti, setShowStreakConfetti] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useKV<boolean>(userKey('ecorise-music-playing'), true)
  const [visualizerStyle, setVisualizerStyle] = useKV<VisualizerStyle>(userKey('ecorise-visualizer-style'), 'bars')
  const [mouseTrailEnabled, setMouseTrailEnabled] = useKV<boolean>(userKey('ecorise-mouse-trail'), true)
  const [mouseTrailIntensity, setMouseTrailIntensity] = useKV<'low' | 'medium' | 'high'>(userKey('ecorise-trail-intensity'), 'medium')
  const [mouseTrailTheme, setMouseTrailTheme] = useKV<import('./lib/types').TrailTheme>(userKey('ecorise-trail-theme'), 'default')
  const [keyboardBurstTrigger, setKeyboardBurstTrigger] = useState(0)
  const [collisionMultipliers, setCollisionMultipliers] = useState<Array<{
    id: string
    multiplier: number
    collisionCount: number
    position: { x: number; y: number }
    timestamp: number
  }>>([])
  const [currentMultiplier, setCurrentMultiplier] = useState(1)
  const [heatmapEnabled, setHeatmapEnabled] = useKV<boolean>(userKey('ecorise-heatmap-enabled'), false)
  const [heatmapOpacity, setHeatmapOpacity] = useKV<number>(userKey('ecorise-heatmap-opacity'), 0.6)
  const [heatmapDecayRate, setHeatmapDecayRate] = useKV<number>(userKey('ecorise-heatmap-decay'), 0.95)
  const [collisionZonesData, setCollisionZonesData] = useKV<Record<string, CollisionZoneData>>(userKey('ecorise-collision-zones'), {})
  const [showStatisticsPanel, setShowStatisticsPanel] = useState(false)
  const [collisionTimeData, setCollisionTimeData] = useKV<CollisionTimeEntry[]>(userKey('ecorise-collision-time-data'), [])
  const [hasSeenTutorial, setHasSeenTutorial] = useKV<boolean>(userKey('ecorise-seen-tutorial'), false)
  const [showTutorial, setShowTutorial] = useState(false)

  const state = gameState ?? DEFAULT_GAME_STATE
  const seen = seenTileTypes ?? []
  const completions = challengeCompletions ?? []
  const leaderboard = leaderboardEntries ?? []
  const tournaments = tournamentEntries ?? []
  const badges = playerBadges ?? []
  const musicPlaying = isMusicPlaying ?? true
  const currentVisualizerStyle = visualizerStyle ?? 'bars'
  const trailEnabled = mouseTrailEnabled ?? true
  const trailIntensity = mouseTrailIntensity ?? 'medium'
  const trailTheme = mouseTrailTheme ?? 'default'
  const showHeatmap = heatmapEnabled ?? false
  const heatmapOpacityValue = heatmapOpacity ?? 0.6
  const heatmapDecayValue = heatmapDecayRate ?? 0.95
  
  const safeState = {
    ...state,
    completedLevels: state.completedLevels ?? [],
    extremeCompletedLevels: state.extremeCompletedLevels ?? [],
    unlockedPowerUps: state.unlockedPowerUps ?? [],
    dailyChallengeStreak: state.dailyChallengeStreak ?? 0,
    difficultyMode: state.difficultyMode ?? 'normal'
  }
  
  const currentLevelSet = safeState.difficultyMode === 'extreme' ? EXTREME_LEVELS : LEVELS
  
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
    : currentLevelSet.find(l => l.id === safeState.currentLevel)
  
  const isInGame = (safeState.currentLevel > 0 || isChallenge || isTournament) && currentLevel

  useEffect(() => {
    if (!hasSeenTutorial && !isInGame) {
      const timer = setTimeout(() => {
        setShowTutorial(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hasSeenTutorial, isInGame])

  useEffect(() => {
    if (currentLevel && grid.length === 0) {
      setGrid(generateGrid(currentLevel.gridSize, currentLevel, safeState.unlockedPowerUps))
    }
  }, [currentLevel])

  useEffect(() => {
    if (musicPlaying) {
      if (isInGame && currentLevel) {
        playBackgroundMusic(currentLevel.biome as any)
      } else {
        playBackgroundMusic('menu')
      }
    } else {
      stopBackgroundMusic()
    }

    return () => {
      stopBackgroundMusic()
    }
  }, [isInGame, currentLevel?.biome, musicPlaying])

  const handleToggleMusic = (playing: boolean) => {
    setIsMusicPlaying(playing)
  }

  useEffect(() => {
    if (collisionMultipliers.length > 0) {
      const timer = setTimeout(() => {
        setCollisionMultipliers([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [collisionMultipliers])

  const handleCollisionMultiplier = (multiplier: number, collisionCount: number, position: { x: number; y: number }) => {
    const id = `${Date.now()}-${Math.random()}`
    setCollisionMultipliers(prev => [
      ...prev,
      { id, multiplier, collisionCount, position, timestamp: Date.now() }
    ])
    
    setCurrentMultiplier(multiplier)

    if (currentLevel && collisionCount >= 2) {
      const row = Math.floor(position.y / 80)
      const col = Math.floor(position.x / 80)
      const zoneKey = `${currentLevel.biome}-${row}-${col}`
      
      setCollisionZonesData((current) => {
        const zones = { ...(current ?? {}) }
        if (zones[zoneKey]) {
          return {
            ...zones,
            [zoneKey]: {
              ...zones[zoneKey],
              count: zones[zoneKey].count + 1,
              lastActivated: new Date().toISOString()
            }
          }
        } else {
          return {
            ...zones,
            [zoneKey]: {
              row,
              col,
              count: 1,
              biome: currentLevel.biome,
              lastActivated: new Date().toISOString()
            }
          }
        }
      })

      const now = new Date()
      setCollisionTimeData((current) => [
        ...(current ?? []),
        {
          timestamp: now.toISOString(),
          hour: now.getHours(),
          dayOfWeek: now.getDay(),
          count: collisionCount,
          biome: currentLevel.biome,
          multiplier: multiplier
        }
      ])
    }

    if (multiplier >= 5) {
      playSoundEffect('collision-vortex')
    } else if (multiplier >= 3) {
      playSoundEffect('collision-spark')
    } else if (multiplier >= 2) {
      playSoundEffect('collision-burst')
    }

    if (multiplier >= 3) {
      toast.success(`🌟 COLLISION COMBO! ×${multiplier.toFixed(1)} multiplier!`, {
        duration: 2000
      })
    }
  }

  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await window.spark.user()
        if (user) {
          setCurrentUserId(String(user.id))
          setCurrentUser({
            login: user.login,
            avatarUrl: user.avatarUrl,
            id: String(user.id)
          })
        }
      } catch (error) {
        console.error('Failed to get user:', error)
      } finally {
        setIsLoadingUser(false)
      }
    }
    getUserId()
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault()
        setMouseTrailEnabled(current => !current)
        toast(trailEnabled ? 'Particle trail disabled' : 'Particle trail enabled', {
          icon: '✨'
        })
      }
      
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        const availableThemes = ['default', 'supernova', 'tsunami', 'earthquake', 'meteor', 'phoenix'].filter(
          t => t === 'default' || safeState.unlockedPowerUps.includes(t as any)
        )
        const currentIndex = availableThemes.indexOf(trailTheme)
        const nextIndex = (currentIndex + 1) % availableThemes.length
        const newTheme = availableThemes[nextIndex] as TrailTheme
        setMouseTrailTheme(newTheme as any)
        setKeyboardBurstTrigger(prev => prev + 1)
        const themeConfig = TRAIL_THEMES[newTheme]
        toast(`${themeConfig.icon} Switched to ${themeConfig.name}`, {
          icon: themeConfig.icon,
          duration: 2000
        })
      }
      
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault()
        setHeatmapEnabled(current => !current)
        toast(showHeatmap ? 'Collision heatmap disabled' : 'Collision heatmap enabled', {
          icon: '🔥'
        })
      }
      
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        setShowStatisticsPanel(true)
        toast('Opening collision statistics', {
          icon: '📊'
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [trailEnabled, trailTheme, safeState.unlockedPowerUps, showHeatmap])

  const computeCollisionStatistics = (): CollisionStatistics => {
    const zones = collisionZonesData ?? {}
    const zoneArray = Object.values(zones)
    
    const biomeMap = new Map<string, BiomeCollisionStats>()
    
    zoneArray.forEach(zone => {
      if (!biomeMap.has(zone.biome)) {
        biomeMap.set(zone.biome, {
          biome: zone.biome,
          totalActivations: 0,
          hottestZones: []
        })
      }
      
      const biomeStats = biomeMap.get(zone.biome)!
      biomeStats.totalActivations += zone.count
      biomeStats.hottestZones.push(zone)
    })
    
    biomeMap.forEach(stats => {
      stats.hottestZones.sort((a, b) => b.count - a.count)
      stats.hottestZones = stats.hottestZones.slice(0, 10)
    })
    
    const globalHottestZones = zoneArray
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
    
    const totalZonesActivated = zoneArray.reduce((sum, zone) => sum + zone.count, 0)
    
    return {
      totalZonesActivated,
      uniqueZones: zoneArray.length,
      biomeStats: Array.from(biomeMap.values()),
      globalHottestZones
    }
  }

  const computeTimeBasedStatistics = (): TimeBasedStatistics => {
    const timeData = collisionTimeData ?? []
    
    const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    const hourlyMap = new Map<number, { collisions: number; totalMultiplier: number; biomes: Map<string, number> }>()
    const dailyMap = new Map<number, { collisions: number; totalMultiplier: number; biomes: Map<string, number> }>()
    
    for (let i = 0; i < 24; i++) {
      hourlyMap.set(i, { collisions: 0, totalMultiplier: 0, biomes: new Map() })
    }
    
    for (let i = 0; i < 7; i++) {
      dailyMap.set(i, { collisions: 0, totalMultiplier: 0, biomes: new Map() })
    }
    
    timeData.forEach(entry => {
      const hourData = hourlyMap.get(entry.hour)!
      hourData.collisions += entry.count
      hourData.totalMultiplier += entry.multiplier
      hourData.biomes.set(entry.biome, (hourData.biomes.get(entry.biome) || 0) + entry.count)
      
      const dayData = dailyMap.get(entry.dayOfWeek)!
      dayData.collisions += entry.count
      dayData.totalMultiplier += entry.multiplier
      dayData.biomes.set(entry.biome, (dayData.biomes.get(entry.biome) || 0) + entry.count)
    })
    
    const hourlyStats = Array.from(hourlyMap.entries()).map(([hour, data]) => ({
      hour,
      collisions: data.collisions,
      averageMultiplier: data.collisions > 0 ? data.totalMultiplier / data.collisions : 0,
      biomes: Object.fromEntries(data.biomes)
    }))
    
    const dailyStats = Array.from(dailyMap.entries()).map(([dayOfWeek, data]) => ({
      dayOfWeek,
      dayName: DAY_NAMES[dayOfWeek],
      collisions: data.collisions,
      averageMultiplier: data.collisions > 0 ? data.totalMultiplier / data.collisions : 0,
      biomes: Object.fromEntries(data.biomes)
    }))
    
    const peakHourEntry = hourlyStats.reduce((max, curr) => 
      curr.collisions > max.collisions ? curr : max, hourlyStats[0])
    
    const peakDayEntry = dailyStats.reduce((max, curr) => 
      curr.collisions > max.collisions ? curr : max, dailyStats[0])
    
    const totalCollisions = timeData.reduce((sum, entry) => sum + entry.count, 0)
    const nonZeroHours = hourlyStats.filter(h => h.collisions > 0).length
    const nonZeroDays = dailyStats.filter(d => d.collisions > 0).length
    
    return {
      hourlyStats,
      dailyStats,
      peakHour: { hour: peakHourEntry.hour, collisions: peakHourEntry.collisions },
      peakDay: { dayOfWeek: peakDayEntry.dayOfWeek, dayName: peakDayEntry.dayName, collisions: peakDayEntry.collisions },
      totalCollisions,
      averageCollisionsPerHour: nonZeroHours > 0 ? totalCollisions / nonZeroHours : 0,
      averageCollisionsPerDay: nonZeroDays > 0 ? totalCollisions / nonZeroDays : 0
    }
  }

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
              streak: safeState.dailyChallengeStreak,
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
              streak: safeState.dailyChallengeStreak,
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
  }, [state.score, state.totalCO2Reduced, completions.length, safeState.dailyChallengeStreak])

  const startLevel = (levelId: number) => {
    const level = currentLevelSet.find(l => l.id === levelId)
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
    setGrid(generateGrid(level.gridSize, level, safeState.unlockedPowerUps))
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
    }, safeState.unlockedPowerUps))
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
    }, safeState.unlockedPowerUps))
    setCombo(0)
    setLevelCO2(0)
    setShowLevelComplete(false)
  }

  const handleTileClick = async (tile: Tile) => {
    if (isProcessing || !currentLevel) {
      return
    }

    if (!selectedTile) {
      setSelectedTile(tile)
      playSoundEffect('click')
      
      setCurrentTileInfo(TILE_INFO[tile.type])
      setShowEducational(true)
      
      if (!seen.includes(tile.type)) {
        setSeenTileTypes((current) => [...(current ?? []), tile.type])
      }
      return
    }

    if (selectedTile.id === tile.id) {
      setSelectedTile(null)
      playSoundEffect('click')
      return
    }

    if (!areAdjacent(selectedTile, tile)) {
      setSelectedTile(tile)
      playSoundEffect('click')
      setCurrentTileInfo(TILE_INFO[tile.type])
      setShowEducational(true)
      toast('Tiles must be adjacent (horizontally or vertically)', {
        duration: 2000
      })
      return
    }

    setIsProcessing(true)
    const swapped = swapTiles(grid, selectedTile, tile)
    const matches = findMatches(swapped, currentLevel.gridSize)

    if (matches.length === 0) {
      toast.error('No match found! This swap won\'t create 3+ matching tiles.', {
        duration: 3000
      })
      playSoundEffect('invalid')
      setSelectedTile(null)
      setIsProcessing(false)
      return
    }

    playSoundEffect('match')
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
      playSoundEffect('power-up')
      
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

    const baseScore = matches.length === 3 ? 100 : 
                      matches.length === 4 ? 200 :
                      matches.length === 5 ? 350 :
                      matches.length * 80
    
    const comboMultiplier = Math.min(1 + (combo * 0.3), 3)
    const powerUpMultiplier = powerUpMatch ? 2.5 : 1
    const collisionBonus = currentMultiplier > 1 ? currentMultiplier : 1
    
    const matchScore = Math.floor(baseScore * comboMultiplier * powerUpMultiplier * collisionBonus)
    
    const co2Reduction = matches.reduce((sum, match) => sum + TILE_INFO[match.type].co2Impact, 0)
    const pollutionReduction = matches.length * (powerUpMatch ? 15 : 5)

    if (currentMultiplier > 1) {
      toast.success(`×${currentMultiplier.toFixed(1)} collision bonus applied!`, {
        duration: 1500,
        icon: '⚡'
      })
    }

    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      score: (current?.score ?? 0) + matchScore,
      moves: (current?.moves ?? 0) + 1,
      pollution: Math.max(0, (current?.pollution ?? 100) - pollutionReduction),
      totalCO2Reduced: (current?.totalCO2Reduced ?? 0) + co2Reduction
    }))

    setLevelCO2(prev => prev + co2Reduction)
    setCombo(prev => prev + 1)
    setCurrentMultiplier(1)

    if (matches.length >= 4 || powerUpMatch) {
      toast.success(`${powerUpMatch ? 'MEGA ' : ''}Amazing! ${matches.length} match combo! +${matchScore} points`)
    } else if (combo > 0) {
      toast(`Combo ×${combo + 1}! +${matchScore} points`, {
        icon: '🔥'
      })
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
    newGrid = fillEmpty(newGrid, currentLevel.gridSize, currentLevel, safeState.unlockedPowerUps)
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
          
          const newStreak = isConsecutive ? (safeState.dailyChallengeStreak ?? 0) + 1 : 1
          
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
          
          playSoundEffect('power-up')

          if (newStreak >= 7 && !badges.some(b => b.type === 'streak-master')) {
            setTimeout(() => {
              setShowStreakConfetti(true)
              playSoundEffect('streak-master')
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
        const completedListKey = safeState.difficultyMode === 'extreme' ? 'extremeCompletedLevels' : 'completedLevels'
        setGameState((current) => ({
          ...(current ?? DEFAULT_GAME_STATE),
          [completedListKey]: (current?.[completedListKey] ?? []).includes(currentLevel.id)
            ? (current?.[completedListKey] ?? [])
            : [...(current?.[completedListKey] ?? []), currentLevel.id]
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
    const nextLevel = currentLevelSet.find(l => l.id === currentLevel!.id + 1)
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

  const handleDifficultyChange = (mode: DifficultyMode) => {
    setGameState((current) => ({
      ...(current ?? DEFAULT_GAME_STATE),
      difficultyMode: mode
    }))
  }

  const awardBadge = (badge: PlayerBadge) => {
    const exists = badges.some(b => 
      b.type === badge.type && 
      b.tournamentId === badge.tournamentId
    )
    
    if (!exists) {
      setPlayerBadges(current => [...(current ?? []), badge])
      
      if (badge.type === 'champion') {
        playSoundEffect('champion')
      } else if (badge.type === 'streak-master') {
        playSoundEffect('streak-master')
      } else {
        playSoundEffect('badge-unlock')
      }
      
      toast.success(`🏆 Badge Earned: ${badge.type}!`, { duration: 4000 })
      
      if (badge.type === 'streak-master') {
        setTimeout(() => {
          setShowStreakConfetti(true)
        }, 500)
      }
    }
  }

  useEffect(() => {
    const previousStreak = badges.some(b => b.type === 'streak-master')
    const previousEcoWarrior = badges.some(b => b.type === 'eco-warrior')
    const previousChallenger = badges.some(b => b.type === 'challenger')
    const previousExtremeMaster = badges.some(b => b.type === 'extreme-master')
    
    
    if (safeState.dailyChallengeStreak >= 7 && !previousStreak) {
      awardBadge({
        type: 'streak-master',
        detail: `${safeState.dailyChallengeStreak} day streak`,
        earnedAt: new Date().toISOString()
      })
    }

    if (state.totalCO2Reduced >= 100000 && !previousEcoWarrior) {
      awardBadge({
        type: 'eco-warrior',
        detail: `${(state.totalCO2Reduced / 1000).toFixed(1)}t CO₂ reduced`,
        earnedAt: new Date().toISOString()
      })
    }

    if (completions.length >= 25 && !previousChallenger) {
      awardBadge({
        type: 'challenger',
        detail: `${completions.length} challenges completed`,
        earnedAt: new Date().toISOString()
      })
    }

    if (safeState.extremeCompletedLevels.length >= 8 && !previousExtremeMaster) {
      awardBadge({
        type: 'extreme-master',
        detail: 'All 8 EXTREME levels conquered',
        earnedAt: new Date().toISOString()
      })
      toast.success('💀 EXTREME MASTER BADGE EARNED! You are a legend!', {
        duration: 8000
      })
      setTimeout(() => {
        setShowStreakConfetti(true)
      }, 500)
    }
  }, [safeState.dailyChallengeStreak, state.totalCO2Reduced, completions.length, safeState.extremeCompletedLevels.length])

  const progressPercent = currentLevel 
    ? Math.min((state.score / currentLevel.targetScore) * 100, 100)
    : 0

  const backgroundGradient = currentLevel
    ? BIOME_GRADIENTS[currentLevel.biome as keyof typeof BIOME_GRADIENTS]
    : POLLUTION_GRADIENT

  const gradientOpacity = currentLevel 
    ? Math.max(0.15, Math.min(0.4, progressPercent / 100 * 0.4))
    : 0.1

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Loading EcoRise...</h2>
          <p className="text-muted-foreground">Connecting with GitHub</p>
        </div>
      </div>
    )
  }

  if (!isInGame) {
    const todayChallenge = getTodayChallenge()
    const isChallengeCompleted = completions.some(c => c.challengeId === todayChallenge.id)
    const activeTournament = getCurrentTournament()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <ThemeSwitchBurst theme={trailTheme} trigger={keyboardBurstTrigger} />
        <MusicVisualizer isPlaying={musicPlaying} biome="menu" style={currentVisualizerStyle} />
        <MouseTrail isActive={trailEnabled} biome="menu" intensity={trailIntensity} theme={trailTheme} />
        
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-start gap-4">
          {currentUser && (
            <UserProfile
              user={currentUser}
              stats={{
                totalCO2Reduced: state.totalCO2Reduced,
                currentStreak: state.dailyChallengeStreak,
                completedLevels: (state.completedLevels?.length ?? 0) + (state.extremeCompletedLevels?.length ?? 0),
                badges: badges.length
              }}
            />
          )}
          
          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowStatisticsPanel(true)}
              className="bg-card/80 backdrop-blur-sm hover:bg-card"
              title="View Collision Statistics"
            >
              <ChartBar size={20} weight="fill" />
            </Button>
            <QuickHelp onOpenFullTutorial={() => setShowTutorial(true)} />
            <ParticleThemeSwitcher
              currentTheme={trailTheme}
              unlockedPowerUps={state.unlockedPowerUps}
              onThemeChange={setMouseTrailTheme}
              isTrailEnabled={trailEnabled}
              onToggleTrail={setMouseTrailEnabled}
            />
            <MouseTrailControl
              isEnabled={trailEnabled}
              intensity={trailIntensity}
              theme={trailTheme}
              unlockedPowerUps={state.unlockedPowerUps}
              onToggle={setMouseTrailEnabled}
              onIntensityChange={setMouseTrailIntensity}
              onThemeChange={setMouseTrailTheme}
            />
            <MusicControl 
              isPlaying={musicPlaying} 
              onToggle={handleToggleMusic}
              visualizerStyle={currentVisualizerStyle}
              onStyleChange={setVisualizerStyle}
            />
          </div>
        </div>

        <TutorialOverlay
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onComplete={() => setHasSeenTutorial(true)}
        />

        <div className="fixed bottom-4 right-4 z-40">
          <div className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-lg">
            <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
            <p><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Ctrl+P</kbd> Toggle particle trail</p>
            <p><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Ctrl+Shift+P</kbd> Cycle themes</p>
            <p><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Ctrl+H</kbd> Toggle collision heatmap</p>
            <p><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Ctrl+S</kbd> View collision statistics</p>
          </div>
        </div>

        <div className="pt-28 pb-4 px-4">
          <CollisionStatisticsPanel
            isOpen={showStatisticsPanel}
            onClose={() => setShowStatisticsPanel(false)}
            statistics={computeCollisionStatistics()}
            timeBasedStatistics={computeTimeBasedStatistics()}
          />

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
          levels={currentLevelSet}
          completedLevels={state.difficultyMode === 'extreme' ? (state.extremeCompletedLevels ?? []) : (state.completedLevels ?? [])}
          onSelectLevel={startLevel}
          totalCO2Reduced={state.totalCO2Reduced}
          onOpenDailyChallenge={() => setShowDailyChallenge(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenTournament={() => setShowTournament(true)}
          onOpenBadgeShowcase={() => setShowBadgeShowcase(true)}
          unlockedPowerUps={state.unlockedPowerUps ?? []}
          currentStreak={state.dailyChallengeStreak}
          difficultyMode={state.difficultyMode}
          onDifficultyChange={handleDifficultyChange}
        />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThemeSwitchBurst theme={trailTheme} trigger={keyboardBurstTrigger} />
      <MusicVisualizer isPlaying={musicPlaying} biome={currentLevel?.biome || 'menu'} style={currentVisualizerStyle} />
      <MouseTrail isActive={trailEnabled && !!isInGame} biome={currentLevel?.biome || 'menu'} intensity={trailIntensity} theme={trailTheme} />
      
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

      <ConfettiCelebration
        isActive={showStreakConfetti}
        onComplete={() => setShowStreakConfetti(false)}
        duration={5000}
        particleCount={100}
      />
      
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={handleBackToMenu}>
              <ArrowLeft className="mr-2" />
              Menu
            </Button>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-1 flex items-center justify-center gap-3">
                {currentLevel?.name}
                {currentLevel?.difficulty === 'extreme' && (
                  <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white animate-pulse">
                    <Skull weight="fill" size={16} className="mr-1" />
                    EXTREME
                  </Badge>
                )}
              </h2>
              <p className="text-sm text-muted-foreground">{currentLevel?.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowStatisticsPanel(true)}
                title="View Collision Statistics"
              >
                <ChartBar size={20} weight="fill" />
              </Button>
              <QuickHelp onOpenFullTutorial={() => setShowTutorial(true)} />
              <ParticleThemeSwitcher
                currentTheme={trailTheme}
                unlockedPowerUps={state.unlockedPowerUps}
                onThemeChange={setMouseTrailTheme}
                isTrailEnabled={trailEnabled}
                onToggleTrail={setMouseTrailEnabled}
              />
              <HeatmapControl
                isEnabled={showHeatmap}
                opacity={heatmapOpacityValue}
                decayRate={heatmapDecayValue}
                onToggle={setHeatmapEnabled}
                onOpacityChange={setHeatmapOpacity}
                onDecayRateChange={setHeatmapDecayRate}
              />
              <MusicControl 
                isPlaying={musicPlaying} 
                onToggle={handleToggleMusic}
                visualizerStyle={currentVisualizerStyle}
                onStyleChange={setVisualizerStyle}
              />
              <MouseTrailControl
                isEnabled={trailEnabled}
                intensity={trailIntensity}
                theme={trailTheme}
                unlockedPowerUps={state.unlockedPowerUps}
                onToggle={setMouseTrailEnabled}
                onIntensityChange={setMouseTrailIntensity}
                onThemeChange={setMouseTrailTheme}
              />
              <Button variant="outline" onClick={handleShuffle} disabled={isProcessing}>
                <Shuffle className="mr-2" />
                Shuffle
              </Button>
            </div>
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
                    onCollisionMultiplier={handleCollisionMultiplier}
                    combo={combo}
                    heatmapEnabled={showHeatmap}
                    heatmapOpacity={heatmapOpacityValue}
                    heatmapDecayRate={heatmapDecayValue}
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

      {collisionMultipliers.map((cm) => (
        <CollisionMultiplier
          key={cm.id}
          multiplier={cm.multiplier}
          position={cm.position}
          isActive={true}
          collisionCount={cm.collisionCount}
        />
      ))}

      {currentLevel && (
        <LevelComplete
          isOpen={showLevelComplete}
          score={state.score}
          targetScore={currentLevel.targetScore}
          co2Reduced={levelCO2}
          onNextLevel={isTournament ? handleBackToMenu : isChallenge ? handleBackToMenu : handleNextLevel}
          onRestart={isTournament ? startTournament : isChallenge ? startDailyChallenge : () => startLevel(currentLevel.id)}
          isLastLevel={!isTournament && !isChallenge && currentLevel.id === currentLevelSet[currentLevelSet.length - 1].id}
        />
      )}

      <CollisionStatisticsPanel
        isOpen={showStatisticsPanel}
        onClose={() => setShowStatisticsPanel(false)}
        statistics={computeCollisionStatistics()}
        timeBasedStatistics={computeTimeBasedStatistics()}
      />

      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={() => setHasSeenTutorial(true)}
      />
    </div>
  )
}

export default App
