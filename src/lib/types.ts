export type TileType = 'tree' | 'solar' | 'wind' | 'recycle' | 'water' | 'energy' | 'ice' | 'penguin' | 'aurora' | 'orchid' | 'jaguar' | 'medicinal' | 'supernova' | 'tsunami' | 'earthquake' | 'meteor' | 'phoenix'

export type BadgeType = 'champion' | 'runner-up' | 'third-place' | 'top-10' | 'participant' | 'streak-master' | 'eco-warrior' | 'challenger'

export type VisualizerStyle = 'bars' | 'waveform' | 'circular'

export type TrailTheme = 'default' | 'supernova' | 'tsunami' | 'earthquake' | 'meteor' | 'phoenix'

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
  unlockedPowerUps: TileType[]
  dailyChallengeStreak: number
  lastChallengeDate?: string
}

export interface DailyChallenge {
  id: string
  date: string
  name: string
  description: string
  biome: string
  gridSize: number
  targetScore: number
  movesLimit: number
  specialCondition: string
  tileTypes: TileType[]
  rewardPowerUp: TileType
  expiresAt: string
}

export interface PlayerBadge {
  type: 'champion' | 'runner-up' | 'third-place' | 'top-10' | 'participant' | 'streak-master' | 'eco-warrior' | 'challenger'
  tournamentName?: string
  tournamentId?: string
  rank?: number
  detail?: string
  earnedAt: string
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatarUrl: string
  score: number
  co2Reduced: number
  challengesCompleted: number
  streak: number
  isOwner?: boolean
  badges?: PlayerBadge[]
}

export interface ChallengeCompletion {
  challengeId: string
  completedAt: string
  score: number
  co2Reduced: number
}

export interface Tournament {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  biome: string
  gridSize: number
  targetScore: number
  movesLimit: number
  tileTypes: TileType[]
  prizes: TournamentPrize[]
  specialRules: string
}

export interface TournamentPrize {
  rank: number
  title: string
  badge: string
  description: string
}

export interface TournamentEntry {
  tournamentId: string
  userId: string
  username: string
  avatarUrl: string
  score: number
  co2Reduced: number
  completedAt: string
  rank?: number
  isOwner?: boolean
  badges?: PlayerBadge[]
}

export interface TileInfo {
  type: TileType
  name: string
  icon: string
  color: string
  fact: string
  co2Impact: number
}
