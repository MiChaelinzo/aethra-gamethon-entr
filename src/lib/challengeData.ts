import { DailyChallenge, TileType } from './types'

export const CHALLENGE_TEMPLATES = [
  {
    name: 'Arctic Rescue',
    description: 'Save the melting ice caps with limited moves!',
    biome: 'tundra',
    gridSize: 7,
    targetScore: 1200,
    movesLimit: 15,
    specialCondition: 'Ice tiles worth double points',
    tileTypes: ['ice', 'penguin', 'aurora', 'wind'] as TileType[],
    rewardPowerUp: 'tsunami' as TileType
  },
  {
    name: 'Rainforest Rush',
    description: 'Clear deforestation at lightning speed!',
    biome: 'rainforest',
    gridSize: 8,
    targetScore: 1500,
    movesLimit: 18,
    specialCondition: 'Combo multiplier increased by 50%',
    tileTypes: ['orchid', 'jaguar', 'medicinal', 'tree'] as TileType[],
    rewardPowerUp: 'phoenix' as TileType
  },
  {
    name: 'Solar Storm',
    description: 'Harness maximum renewable energy!',
    biome: 'desert',
    gridSize: 7,
    targetScore: 1300,
    movesLimit: 16,
    specialCondition: 'Solar and wind tiles unlock chain reactions',
    tileTypes: ['solar', 'wind', 'energy', 'recycle'] as TileType[],
    rewardPowerUp: 'supernova' as TileType
  },
  {
    name: 'Ocean Depths',
    description: 'Clean the oceans in record time!',
    biome: 'ocean',
    gridSize: 8,
    targetScore: 1400,
    movesLimit: 17,
    specialCondition: 'Water tiles create wave effects',
    tileTypes: ['water', 'wind', 'recycle', 'tree'] as TileType[],
    rewardPowerUp: 'tsunami' as TileType
  },
  {
    name: 'City Transformation',
    description: 'Transform pollution into prosperity!',
    biome: 'city',
    gridSize: 9,
    targetScore: 1600,
    movesLimit: 20,
    specialCondition: 'All tile types available, harder matches',
    tileTypes: ['solar', 'recycle', 'energy', 'tree', 'wind'] as TileType[],
    rewardPowerUp: 'meteor' as TileType
  },
  {
    name: 'Forest Blitz',
    description: 'Plant as many trees as possible!',
    biome: 'forest',
    gridSize: 6,
    targetScore: 1100,
    movesLimit: 14,
    specialCondition: 'Tree tiles spawn more frequently',
    tileTypes: ['tree', 'water', 'recycle', 'energy'] as TileType[],
    rewardPowerUp: 'earthquake' as TileType
  },
  {
    name: 'Mega Mix Challenge',
    description: 'Ultimate test across all biomes!',
    biome: 'forest',
    gridSize: 10,
    targetScore: 2000,
    movesLimit: 25,
    specialCondition: 'Random biome tiles appear each turn',
    tileTypes: ['tree', 'solar', 'water', 'ice', 'orchid', 'wind'] as TileType[],
    rewardPowerUp: 'phoenix' as TileType
  }
]

export function generateDailyChallenge(date: Date): DailyChallenge {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const templateIndex = dayOfYear % CHALLENGE_TEMPLATES.length
  const template = CHALLENGE_TEMPLATES[templateIndex]
  
  const challengeDate = date.toISOString().split('T')[0]
  const expiresAt = new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString()
  
  return {
    id: `challenge-${challengeDate}`,
    date: challengeDate,
    name: template.name,
    description: template.description,
    biome: template.biome,
    gridSize: template.gridSize,
    targetScore: template.targetScore,
    movesLimit: template.movesLimit,
    specialCondition: template.specialCondition,
    tileTypes: template.tileTypes,
    rewardPowerUp: template.rewardPowerUp,
    expiresAt
  }
}

export function getTodayChallenge(): DailyChallenge {
  return generateDailyChallenge(new Date())
}

export function isChallengeActive(challenge: DailyChallenge): boolean {
  return new Date() < new Date(challenge.expiresAt)
}

export function getTimeUntilNextChallenge(): { hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const diff = tomorrow.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { hours, minutes, seconds }
}
