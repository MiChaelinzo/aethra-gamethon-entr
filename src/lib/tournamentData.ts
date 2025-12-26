import { Tournament, TileType } from './types'

export const TOURNAMENT_PRIZES = [
  { rank: 1, title: '🥇 Champion', badge: 'champion', description: 'Ultimate Eco Warrior - 10,000 CO2 Bonus' },
  { rank: 2, title: '🥈 Runner-Up', badge: 'runner-up', description: 'Climate Hero - 7,500 CO2 Bonus' },
  { rank: 3, title: '🥉 3rd Place', badge: 'third-place', description: 'Green Guardian - 5,000 CO2 Bonus' },
  { rank: 4, title: '🏆 4th Place', badge: 'top-10', description: 'Elite Restorer - 4,000 CO2 Bonus' },
  { rank: 5, title: '🏆 5th Place', badge: 'top-10', description: 'Elite Restorer - 3,500 CO2 Bonus' },
  { rank: 6, title: '🏆 6th Place', badge: 'top-10', description: 'Elite Restorer - 3,000 CO2 Bonus' },
  { rank: 7, title: '🏆 7th Place', badge: 'top-10', description: 'Elite Restorer - 2,500 CO2 Bonus' },
  { rank: 8, title: '🏆 8th Place', badge: 'top-10', description: 'Elite Restorer - 2,000 CO2 Bonus' },
  { rank: 9, title: '🏆 9th Place', badge: 'top-10', description: 'Elite Restorer - 1,500 CO2 Bonus' },
  { rank: 10, title: '🏆 10th Place', badge: 'top-10', description: 'Elite Restorer - 1,000 CO2 Bonus' }
]

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const getWeekStart = (date: Date): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

const getWeekEnd = (date: Date): Date => {
  const start = getWeekStart(date)
  return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000)
}

export const getCurrentTournament = (): Tournament => {
  const now = new Date()
  const weekNum = getWeekNumber(now)
  const weekStart = getWeekStart(now)
  const weekEnd = getWeekEnd(now)
  
  const tournamentRotation = [
    {
      name: 'Rainforest Revival Championship',
      description: 'Save the lungs of our planet! Compete to restore the Amazon and other vital rainforests.',
      biome: 'rainforest',
      gridSize: 8,
      targetScore: 8000,
      movesLimit: 35,
      tileTypes: ['tree' as TileType, 'water' as TileType, 'orchid' as TileType, 'jaguar' as TileType, 'medicinal' as TileType, 'energy' as TileType],
      specialRules: 'Rainforest tiles worth 2x points!'
    },
    {
      name: 'Arctic Preservation Tournament',
      description: 'Protect the frozen frontier! Battle to save polar ecosystems from climate change.',
      biome: 'tundra',
      gridSize: 8,
      targetScore: 7500,
      movesLimit: 40,
      tileTypes: ['ice' as TileType, 'penguin' as TileType, 'aurora' as TileType, 'water' as TileType, 'wind' as TileType, 'solar' as TileType],
      specialRules: 'Ice combos trigger bonus cascades!'
    },
    {
      name: 'Ocean Clean-Up Challenge',
      description: 'Clear the seas! Compete to remove pollution and restore marine habitats.',
      biome: 'ocean',
      gridSize: 9,
      targetScore: 9000,
      movesLimit: 30,
      tileTypes: ['water' as TileType, 'energy' as TileType, 'wind' as TileType, 'recycle' as TileType, 'solar' as TileType],
      specialRules: 'Wave power-ups appear more frequently!'
    },
    {
      name: 'Global Reforestation Cup',
      description: 'Plant the future! Race to restore forests worldwide and capture carbon.',
      biome: 'forest',
      gridSize: 8,
      targetScore: 8500,
      movesLimit: 35,
      tileTypes: ['tree' as TileType, 'water' as TileType, 'solar' as TileType, 'wind' as TileType, 'recycle' as TileType, 'energy' as TileType],
      specialRules: 'Tree matches grant extra moves!'
    }
  ]
  
  const tournamentIndex = weekNum % tournamentRotation.length
  const template = tournamentRotation[tournamentIndex]
  
  return {
    id: `tournament-${now.getFullYear()}-W${weekNum}`,
    name: template.name,
    description: template.description,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    biome: template.biome,
    gridSize: template.gridSize,
    targetScore: template.targetScore,
    movesLimit: template.movesLimit,
    tileTypes: template.tileTypes,
    prizes: TOURNAMENT_PRIZES,
    specialRules: template.specialRules
  }
}

export const isTournamentActive = (tournament: Tournament): boolean => {
  const now = new Date()
  const start = new Date(tournament.startDate)
  const end = new Date(tournament.endDate)
  return now >= start && now <= end
}

export const getTournamentTimeRemaining = (tournament: Tournament): string => {
  const now = new Date()
  const end = new Date(tournament.endDate)
  const diff = end.getTime() - now.getTime()
  
  if (diff <= 0) return 'Ended'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days}d ${hours}h remaining`
  if (hours > 0) return `${hours}h ${minutes}m remaining`
  return `${minutes}m remaining`
}
