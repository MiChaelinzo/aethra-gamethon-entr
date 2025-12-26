import { PlayerBadge, TournamentEntry, LeaderboardEntry } from './types'

export function generateTournamentBadge(
  rank: number,
  tournamentName: string,
  tournamentId: string
): PlayerBadge {
  let type: PlayerBadge['type']
  
  if (rank === 1) {
    type = 'champion'
  } else if (rank === 2) {
    type = 'runner-up'
  } else if (rank === 3) {
    type = 'third-place'
  } else if (rank <= 10) {
    type = 'top-10'
  } else {
    type = 'participant'
  }

  return {
    type,
    tournamentName,
    tournamentId,
    rank,
    earnedAt: new Date().toISOString()
  }
}

export function generateStreakBadge(streak: number): PlayerBadge | null {
  if (streak < 7) return null
  
  return {
    type: 'streak-master',
    detail: `${streak} day streak`,
    earnedAt: new Date().toISOString()
  }
}

export function generateEcoWarriorBadge(co2Reduced: number): PlayerBadge | null {
  if (co2Reduced < 10000) return null
  
  return {
    type: 'eco-warrior',
    detail: `${(co2Reduced / 1000).toFixed(1)}K kg CO₂ reduced`,
    earnedAt: new Date().toISOString()
  }
}

export function generateChallengerBadge(challengesCompleted: number): PlayerBadge | null {
  if (challengesCompleted < 5) return null
  
  return {
    type: 'challenger',
    detail: `${challengesCompleted} challenges completed`,
    earnedAt: new Date().toISOString()
  }
}

export function calculatePlayerBadges(
  entry: LeaderboardEntry | TournamentEntry,
  tournamentEntries?: TournamentEntry[]
): PlayerBadge[] {
  const badges: PlayerBadge[] = []
  
  if ('challengesCompleted' in entry) {
    const challengeBadge = generateChallengerBadge(entry.challengesCompleted)
    if (challengeBadge) badges.push(challengeBadge)
    
    const streakBadge = generateStreakBadge(entry.streak)
    if (streakBadge) badges.push(streakBadge)
  }
  
  const ecoBadge = generateEcoWarriorBadge(entry.co2Reduced)
  if (ecoBadge) badges.push(ecoBadge)
  
  if (tournamentEntries) {
    const userTournaments = tournamentEntries.filter(t => t.userId === entry.userId)
    userTournaments.forEach(tournament => {
      if (tournament.rank && tournament.rank <= 10) {
        badges.push(generateTournamentBadge(
          tournament.rank,
          'Tournament',
          tournament.tournamentId
        ))
      }
    })
  }
  
  return badges.sort((a, b) => {
    const priority: Record<PlayerBadge['type'], number> = {
      'champion': 1,
      'runner-up': 2,
      'third-place': 3,
      'top-10': 4,
      'eco-warrior': 5,
      'streak-master': 6,
      'challenger': 7,
      'participant': 8
    }
    return priority[a.type] - priority[b.type]
  })
}

export function getBadgesByUser(
  userId: string,
  leaderboardEntries: LeaderboardEntry[],
  tournamentEntries: TournamentEntry[]
): PlayerBadge[] {
  const userLeaderboardEntry = leaderboardEntries.find(e => e.userId === userId)
  if (!userLeaderboardEntry) return []
  
  return calculatePlayerBadges(userLeaderboardEntry, tournamentEntries)
}
