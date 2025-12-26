import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Trophy, Crown, Medal, Fire, X, Calendar, Target, Clock } from '@phosphor-icons/react'
import { Tournament, TournamentEntry } from '@/lib/types'
import { getTournamentTimeRemaining } from '@/lib/tournamentData'
import { TournamentBadge } from './TournamentBadge'
import { generateTournamentBadge } from '@/lib/badgeUtils'

interface TournamentProps {
  tournament: Tournament
  entries: TournamentEntry[]
  currentUserId: string
  onStart: () => void
  onClose: () => void
}

export function TournamentView({ tournament, entries, currentUserId, onStart, onClose }: TournamentProps) {
  const sortedEntries = [...entries]
    .filter(e => e.tournamentId === tournament.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry, index) => ({ ...entry, rank: index + 1 }))

  const currentUserEntry = sortedEntries.find(e => e.userId === currentUserId)
  const hasParticipated = entries.some(e => e.tournamentId === tournament.id && e.userId === currentUserId)
  const timeRemaining = getTournamentTimeRemaining(tournament)

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-500" weight="fill" size={32} />
    if (rank === 2) return <Medal className="text-gray-400" weight="fill" size={28} />
    if (rank === 3) return <Medal className="text-amber-700" weight="fill" size={28} />
    return <Trophy className="text-primary" weight="fill" size={24} />
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black'
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black'
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
    return 'bg-gradient-to-r from-primary to-accent text-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X />
          </Button>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Trophy weight="fill" size={40} className="text-primary" />
              <div>
                <h2 className="text-3xl font-bold">{tournament.name}</h2>
                <p className="text-muted-foreground">{tournament.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                <Clock weight="fill" size={24} className="text-accent" />
                <div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                  <div className="font-semibold">{timeRemaining}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                <Target weight="fill" size={24} className="text-secondary" />
                <div>
                  <div className="text-sm text-muted-foreground">Target Score</div>
                  <div className="font-semibold">{tournament.targetScore.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                <Calendar weight="fill" size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Moves Limit</div>
                  <div className="font-semibold">{tournament.movesLimit}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-accent/10 rounded-lg border-2 border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Fire weight="fill" size={20} className="text-accent" />
                <span className="font-semibold text-sm">Special Rules</span>
              </div>
              <p className="text-sm">{tournament.specialRules}</p>
            </div>

            <div className="mt-6">
              <Button
                onClick={onStart}
                size="lg"
                className="w-full text-lg"
              >
                {hasParticipated ? 'Play Again & Improve Score' : 'Enter Tournament'}
              </Button>
              {currentUserEntry && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Your current rank: #{currentUserEntry.rank} with {currentUserEntry.score.toLocaleString()} points
                </p>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy weight="fill" className="text-primary" />
              Top 10 Rankings
            </h3>

            {sortedEntries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy size={48} weight="light" className="mx-auto mb-3 opacity-50" />
                <p>No entries yet. Be the first to compete!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedEntries.map((entry) => {
                  const prize = tournament.prizes.find(p => p.rank === entry.rank)
                  const isCurrentUser = entry.userId === currentUserId
                  const badge = generateTournamentBadge(entry.rank!, tournament.name, tournament.id)

                  return (
                    <motion.div
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: entry.rank! * 0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                        isCurrentUser
                          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(entry.rank!)}
                        </div>

                        <Avatar className="h-12 w-12 border-2 border-border">
                          <AvatarImage src={entry.avatarUrl} alt={entry.username} />
                          <AvatarFallback>{entry.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold truncate">
                              {entry.username}
                              {isCurrentUser && (
                                <span className="text-primary ml-2">(You)</span>
                              )}
                            </span>
                            {entry.isOwner && (
                              <Badge variant="secondary" className="text-xs">Creator</Badge>
                            )}
                            <TournamentBadge
                              type={badge.type}
                              tournamentName={tournament.name}
                              rank={entry.rank}
                              size="sm"
                            />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {entry.score.toLocaleString()} pts • {entry.co2Reduced.toLocaleString()} kg CO₂
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={`${getRankBadgeColor(entry.rank!)} font-bold px-3 py-1`}>
                          #{entry.rank}
                        </Badge>
                        {prize && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {prize.description.split(' - ')[1]}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Trophy weight="fill" size={20} className="text-accent" />
                Tournament Prizes
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                {tournament.prizes.slice(0, 5).map((prize) => (
                  <div key={prize.rank} className="text-center">
                    <div className="font-semibold">{prize.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {prize.description.split(' - ')[1]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Ranks 6-10 receive 3,000 - 1,000 CO₂ bonuses
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
