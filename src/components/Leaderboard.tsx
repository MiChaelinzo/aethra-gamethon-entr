import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame,
  Leaf,
  Lightning
} from '@phosphor-icons/react'
import { LeaderboardEntry, TournamentEntry } from '@/lib/types'
import { BadgeCollection } from './TournamentBadge'
import { PlayerProfile } from './PlayerProfile'
import { calculatePlayerBadges } from '@/lib/badgeUtils'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  tournamentEntries?: TournamentEntry[]
  currentUserId: string
  onClose: () => void
}

export function Leaderboard({ entries, tournamentEntries = [], currentUserId, onClose }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<'score' | 'co2' | 'challenges' | 'streak'>('score')
  const [selectedPlayer, setSelectedPlayer] = useState<LeaderboardEntry | null>(null)
  const [selectedPlayerRank, setSelectedPlayerRank] = useState<number>(0)

  const sortedEntries = [...entries].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score
      case 'co2':
        return b.co2Reduced - a.co2Reduced
      case 'challenges':
        return b.challengesCompleted - a.challengesCompleted
      case 'streak':
        return b.streak - a.streak
      default:
        return 0
    }
  })

  const currentUserRank = sortedEntries.findIndex(e => e.userId === currentUserId) + 1

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown weight="fill" size={24} className="text-yellow-500" />
    if (rank === 2) return <Medal weight="fill" size={24} className="text-gray-400" />
    if (rank === 3) return <Medal weight="fill" size={24} className="text-amber-700" />
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white'
    return 'bg-muted'
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {selectedPlayer && (
        <PlayerProfile
          entry={selectedPlayer}
          tournamentEntries={tournamentEntries}
          rank={selectedPlayerRank}
          isCurrentUser={selectedPlayer.userId === currentUserId}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
      
      {!selectedPlayer && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                <Trophy weight="fill" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Global Leaderboard</h2>
                <p className="text-sm text-muted-foreground">
                  Your rank: #{currentUserRank} out of {entries.length}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>

          <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)} className="mb-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="score" className="flex items-center gap-1">
                <Lightning size={16} />
                Score
              </TabsTrigger>
              <TabsTrigger value="co2" className="flex items-center gap-1">
                <Leaf size={16} />
                CO₂
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-1">
                <Trophy size={16} />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="streak" className="flex items-center gap-1">
                <Flame size={16} />
                Streak
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {sortedEntries.map((entry, index) => {
                const rank = index + 1
                const isCurrentUser = entry.userId === currentUserId
                const playerBadges = calculatePlayerBadges(entry, tournamentEntries)

                return (
                  <motion.div
                    key={entry.userId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`p-4 ${getRankBadge(rank)} ${
                        isCurrentUser ? 'ring-2 ring-indigo-500 shadow-lg' : ''
                      } cursor-pointer hover:scale-[1.02] transition-transform`}
                      onClick={() => {
                        setSelectedPlayer(entry)
                        setSelectedPlayerRank(rank)
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 flex items-center justify-center">
                          {getRankIcon(rank)}
                        </div>

                        <Avatar className="h-12 w-12 border-2 border-white">
                          <AvatarImage src={entry.avatarUrl} alt={entry.username} />
                          <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-lg">
                              {entry.username}
                            </span>
                            {isCurrentUser && (
                              <Badge className="bg-indigo-600 text-white">You</Badge>
                            )}
                            {entry.isOwner && (
                              <Badge className="bg-purple-600 text-white">Owner</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm mb-2">
                            {sortBy === 'score' && (
                              <span className="font-medium">
                                <Lightning size={14} className="inline mr-1" />
                                {formatNumber(entry.score)} pts
                              </span>
                            )}
                            {sortBy === 'co2' && (
                              <span className="font-medium">
                                <Leaf size={14} className="inline mr-1" />
                                {formatNumber(entry.co2Reduced)} kg CO₂
                              </span>
                            )}
                            {sortBy === 'challenges' && (
                              <span className="font-medium">
                                <Trophy size={14} className="inline mr-1" />
                                {entry.challengesCompleted} completed
                              </span>
                            )}
                            {sortBy === 'streak' && (
                              <span className="font-medium">
                                <Flame size={14} className="inline mr-1" />
                                {entry.streak} days
                              </span>
                            )}
                          </div>
                          {playerBadges.length > 0 && (
                            <div className="flex items-center gap-2">
                              <BadgeCollection badges={playerBadges} size="sm" maxDisplay={6} />
                            </div>
                          )}
                        </div>

                        <div className="text-right hidden md:block">
                          <div className="text-xs text-muted-foreground mb-1">Total Stats</div>
                          <div className="flex gap-3 text-xs">
                            <div>
                              <div className="font-bold">{formatNumber(entry.score)}</div>
                              <div className="text-muted-foreground">Score</div>
                            </div>
                            <div>
                              <div className="font-bold">{formatNumber(entry.co2Reduced)}</div>
                              <div className="text-muted-foreground">CO₂</div>
                            </div>
                            <div>
                              <div className="font-bold">{entry.streak}</div>
                              <div className="text-muted-foreground">Streak</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
