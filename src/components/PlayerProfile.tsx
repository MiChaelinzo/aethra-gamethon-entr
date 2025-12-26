import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { 
  X, 
  Trophy, 
  Lightning, 
  Leaf, 
  Fire,
  Target,
  Crown
} from '@phosphor-icons/react'
import { LeaderboardEntry, TournamentEntry, PlayerBadge } from '@/lib/types'
import { TournamentBadge } from './TournamentBadge'
import { calculatePlayerBadges } from '@/lib/badgeUtils'

interface PlayerProfileProps {
  entry: LeaderboardEntry
  tournamentEntries: TournamentEntry[]
  rank: number
  isCurrentUser: boolean
  onClose: () => void
}

export function PlayerProfile({ 
  entry, 
  tournamentEntries, 
  rank, 
  isCurrentUser, 
  onClose 
}: PlayerProfileProps) {
  const playerBadges = calculatePlayerBadges(entry, tournamentEntries)
  
  const userTournaments = tournamentEntries
    .filter(t => t.userId === entry.userId && t.rank && t.rank <= 10)
    .sort((a, b) => a.rank! - b.rank!)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st'
    if (rank === 2) return 'nd'
    if (rank === 3) return 'rd'
    return 'th'
  }

  const getBadgesByCategory = () => {
    const categories = {
      tournament: playerBadges.filter(b => 
        ['champion', 'runner-up', 'third-place', 'top-10', 'participant'].includes(b.type)
      ),
      achievement: playerBadges.filter(b => 
        ['streak-master', 'eco-warrior', 'challenger'].includes(b.type)
      )
    }
    return categories
  }

  const badgeCategories = getBadgesByCategory()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X />
          </Button>

          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary shadow-lg">
                <AvatarImage src={entry.avatarUrl} alt={entry.username} />
                <AvatarFallback className="text-3xl">
                  {entry.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              {entry.username}
              {isCurrentUser && <Badge className="bg-indigo-600">You</Badge>}
              {entry.isOwner && <Badge className="bg-purple-600">Owner</Badge>}
            </h2>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Crown weight="fill" size={20} className="text-primary" />
              <span className="text-lg font-semibold">
                Rank #{rank} {getRankSuffix(rank)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
              <Lightning weight="fill" size={24} className="mx-auto mb-2 text-indigo-600" />
              <div className="text-2xl font-bold">{formatNumber(entry.score)}</div>
              <div className="text-xs text-muted-foreground">Total Score</div>
            </Card>

            <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
              <Leaf weight="fill" size={24} className="mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{formatNumber(entry.co2Reduced)}</div>
              <div className="text-xs text-muted-foreground">kg CO₂ Saved</div>
            </Card>

            <Card className="p-4 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
              <Fire weight="fill" size={24} className="mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">{entry.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </Card>

            <Card className="p-4 text-center bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
              <Target weight="fill" size={24} className="mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{entry.challengesCompleted}</div>
              <div className="text-xs text-muted-foreground">Challenges</div>
            </Card>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy weight="fill" className="text-primary" />
              Tournament Badges
            </h3>
            {badgeCategories.tournament.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground bg-muted/30">
                <Trophy size={32} weight="light" className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tournament badges yet</p>
              </Card>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {badgeCategories.tournament.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <TournamentBadge
                      type={badge.type}
                      tournamentName={badge.tournamentName}
                      rank={badge.rank}
                      size="lg"
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      {badge.rank && `#${badge.rank}`}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightning weight="fill" className="text-accent" />
              Achievement Badges
            </h3>
            {badgeCategories.achievement.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground bg-muted/30">
                <Lightning size={32} weight="light" className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No achievement badges yet</p>
              </Card>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {badgeCategories.achievement.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <TournamentBadge
                      type={badge.type}
                      detail={badge.detail}
                      size="lg"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {userTournaments.length > 0 && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy weight="fill" className="text-secondary" />
                  Tournament History
                </h3>
                <div className="space-y-2">
                  {userTournaments.slice(0, 5).map((tournament, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-3 flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className={`
                            h-10 w-10 rounded-full flex items-center justify-center
                            ${tournament.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600' : 
                              tournament.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                              tournament.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                              'bg-gradient-to-br from-purple-500 to-indigo-600'}
                          `}>
                            <span className="text-white font-bold">#{tournament.rank}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Tournament Entry</div>
                            <div className="text-xs text-muted-foreground">
                              {tournament.score.toLocaleString()} pts • {tournament.co2Reduced.toLocaleString()} kg CO₂
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {new Date(tournament.completedAt).toLocaleDateString()}
                        </Badge>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
