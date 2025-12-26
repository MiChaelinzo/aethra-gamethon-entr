import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Medal, 
  Trophy, 
  Star,
  Lightning,
  Fire,
  Sparkle,
  X,
  Sparkle as SparkleIcon,
  Target,
  CalendarCheck,
  ChartBar
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { BADGE_CATALOG, BADGE_TIERS, getBadgesByCategory, BadgeInfo } from '@/lib/badgeData'
import { BadgeType, PlayerBadge } from '@/lib/types'

interface BadgeShowcaseProps {
  onClose: () => void
  playerBadges?: PlayerBadge[]
  stats?: {
    totalCO2Reduced: number
    challengesCompleted: number
    currentStreak: number
    tournamentsEntered: number
  }
}

export function BadgeShowcase({ onClose, playerBadges = [], stats }: BadgeShowcaseProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo | null>(null)
  const [filterCategory, setFilterCategory] = useState<'all' | 'tournament' | 'achievement' | 'streak' | 'milestone'>('all')

  const hasBadge = (type: BadgeType) => {
    return playerBadges.some(b => b.type === type)
  }

  const getBadgeIcon = (type: BadgeType) => {
    switch (type) {
      case 'champion': return Crown
      case 'runner-up': return Medal
      case 'third-place': return Medal
      case 'top-10': return Trophy
      case 'participant': return Star
      case 'streak-master': return Fire
      case 'eco-warrior': return Sparkle
      case 'challenger': return Lightning
    }
  }

  const filteredBadges = filterCategory === 'all' 
    ? BADGE_CATALOG 
    : getBadgesByCategory(filterCategory)

  const badgeProgress = {
    'eco-warrior': Math.min((stats?.totalCO2Reduced || 0) / 100000 * 100, 100),
    'challenger': Math.min((stats?.challengesCompleted || 0) / 25 * 100, 100),
    'streak-master': Math.min((stats?.currentStreak || 0) / 7 * 100, 100)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <SparkleIcon size={36} weight="fill" />
                Badge Showcase
              </h1>
              <p className="text-white/90 text-lg">
                Collect badges by completing challenges, tournaments, and milestones
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full h-12 w-12"
            >
              <X size={24} weight="bold" />
            </Button>
          </div>

          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkle size={20} weight="fill" />
                  <span className="text-sm font-medium">Badges Earned</span>
                </div>
                <div className="text-2xl font-bold">{playerBadges.length}/{BADGE_CATALOG.length}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target size={20} weight="fill" />
                  <span className="text-sm font-medium">CO₂ Reduced</span>
                </div>
                <div className="text-2xl font-bold">{(stats.totalCO2Reduced / 1000).toFixed(1)}t</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarCheck size={20} weight="fill" />
                  <span className="text-sm font-medium">Challenges</span>
                </div>
                <div className="text-2xl font-bold">{stats.challengesCompleted}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Fire size={20} weight="fill" />
                  <span className="text-sm font-medium">Streak</span>
                </div>
                <div className="text-2xl font-bold">{stats.currentStreak} days</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" onClick={() => setFilterCategory('all')}>
                All Badges
              </TabsTrigger>
              <TabsTrigger value="tournament" onClick={() => setFilterCategory('tournament')}>
                Tournament
              </TabsTrigger>
              <TabsTrigger value="achievement" onClick={() => setFilterCategory('achievement')}>
                Achievement
              </TabsTrigger>
              <TabsTrigger value="streak" onClick={() => setFilterCategory('streak')}>
                Streak
              </TabsTrigger>
              <TabsTrigger value="milestone" onClick={() => setFilterCategory('milestone')}>
                Milestone
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filterCategory} className="mt-6">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ChartBar size={24} weight="fill" />
                  Badge Rarity Tiers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {BADGE_TIERS.map(tier => (
                    <Card key={tier.name} className="relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10`} />
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${tier.color} ${tier.glow} shadow-lg`} />
                          {tier.name}
                        </CardTitle>
                        <CardDescription className="text-xs">{tier.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBadges.map(badge => {
                  const Icon = getBadgeIcon(badge.type)
                  const earned = hasBadge(badge.type)
                  const progress = badgeProgress[badge.type as keyof typeof badgeProgress]

                  return (
                    <motion.div
                      key={badge.type}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all h-full relative overflow-hidden ${
                          earned 
                            ? 'border-2 border-primary shadow-lg' 
                            : 'opacity-60 hover:opacity-80'
                        }`}
                        onClick={() => setSelectedBadge(badge)}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-5`} />
                        
                        {earned && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500 text-white">
                              ✓ Earned
                            </Badge>
                          </div>
                        )}

                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <motion.div
                              className={`
                                h-16 w-16 rounded-full 
                                bg-gradient-to-br ${badge.color}
                                flex items-center justify-center
                                shadow-lg
                                ${earned ? '' : 'grayscale'}
                              `}
                              animate={earned ? {
                                boxShadow: [
                                  '0 0 20px rgba(0,0,0,0.2)',
                                  '0 0 30px rgba(59, 130, 246, 0.4)',
                                  '0 0 20px rgba(0,0,0,0.2)'
                                ]
                              } : {}}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Icon size={32} weight="fill" className="text-white" />
                            </motion.div>

                            <div className="flex-1">
                              <CardTitle className="text-xl mb-1">{badge.name}</CardTitle>
                              <Badge 
                                variant="outline" 
                                className={`text-xs bg-gradient-to-r ${badge.color} text-white border-0`}
                              >
                                {badge.rarity}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {badge.description}
                          </p>

                          <Separator className="my-3" />

                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Target size={16} className="mt-0.5 text-primary flex-shrink-0" />
                              <p className="text-sm font-medium">{badge.howToEarn}</p>
                            </div>

                            {progress !== undefined && !earned && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-bold">{progress.toFixed(0)}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="max-w-2xl w-full bg-card rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-br ${selectedBadge.color} p-8 text-white relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                />
                
                <div className="relative z-10 flex items-center gap-6">
                  {(() => {
                    const Icon = getBadgeIcon(selectedBadge.type)
                    return (
                      <motion.div
                        className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-2xl"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Icon size={48} weight="fill" className="text-white" />
                      </motion.div>
                    )
                  })()}

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{selectedBadge.name}</h2>
                    <div className="flex gap-2">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {selectedBadge.rarity}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {selectedBadge.category}
                      </Badge>
                      {hasBadge(selectedBadge.type) && (
                        <Badge className="bg-green-500 text-white">
                          ✓ Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBadge(null)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Sparkle size={20} weight="fill" className="text-primary" />
                    Description
                  </h3>
                  <p className="text-muted-foreground">{selectedBadge.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Target size={20} weight="fill" className="text-primary" />
                    How to Earn
                  </h3>
                  <p className="mb-3 font-medium">{selectedBadge.howToEarn}</p>
                  
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-sm mb-2">Requirements:</p>
                    <ul className="space-y-1">
                      {selectedBadge.requirements.map((req, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedBadge.tips && selectedBadge.tips.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Lightning size={20} weight="fill" className="text-primary" />
                        Pro Tips
                      </h3>
                      <div className="space-y-2">
                        {selectedBadge.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3 bg-accent/10 rounded-lg p-3">
                            <span className="font-bold text-accent">💡</span>
                            <p className="text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {badgeProgress[selectedBadge.type as keyof typeof badgeProgress] !== undefined && 
                 !hasBadge(selectedBadge.type) && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-bold text-lg mb-3">Your Progress</h3>
                      <Progress 
                        value={badgeProgress[selectedBadge.type as keyof typeof badgeProgress]} 
                        className="h-3"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        {badgeProgress[selectedBadge.type as keyof typeof badgeProgress].toFixed(0)}% complete
                      </p>
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <Button onClick={() => setSelectedBadge(null)} className="flex-1">
                    Close
                  </Button>
                  {!hasBadge(selectedBadge.type) && (
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                      Start Working on This
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
