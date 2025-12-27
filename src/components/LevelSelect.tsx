import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Ranking, CalendarDots, Sword, Sparkle, Flame, Skull } from '@phosphor-icons/react'
import { Level, TileType, DifficultyMode } from '@/lib/types'
import { BIOME_GRADIENTS } from '@/lib/gameData'
import { PowerUpCollection } from './PowerUpCollection'

interface LevelSelectProps {
  levels: Level[]
  completedLevels: number[]
  onSelectLevel: (levelId: number) => void
  totalCO2Reduced: number
  onOpenDailyChallenge?: () => void
  onOpenLeaderboard?: () => void
  onOpenTournament?: () => void
  onOpenBadgeShowcase?: () => void
  unlockedPowerUps?: TileType[]
  currentStreak?: number
  difficultyMode?: DifficultyMode
  onDifficultyChange?: (mode: DifficultyMode) => void
}

export function LevelSelect({ 
  levels, 
  completedLevels, 
  onSelectLevel, 
  totalCO2Reduced,
  onOpenDailyChallenge,
  onOpenLeaderboard,
  onOpenTournament,
  onOpenBadgeShowcase,
  unlockedPowerUps = [],
  currentStreak = 0,
  difficultyMode = 'normal',
  onDifficultyChange
}: LevelSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-4xl w-full"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
          EcoRise
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Restore the Planet, One Match at a Time
        </p>

        {onDifficultyChange && (
          <div className="mb-6">
            <Card className="p-2 inline-flex gap-2 mb-4">
              <Button
                variant={difficultyMode === 'normal' ? 'default' : 'ghost'}
                onClick={() => onDifficultyChange('normal')}
                className="gap-2"
              >
                <Sparkle weight="fill" size={18} />
                Normal Mode
              </Button>
              <Button
                variant={difficultyMode === 'extreme' ? 'default' : 'ghost'}
                onClick={() => onDifficultyChange('extreme')}
                className={`gap-2 ${difficultyMode === 'extreme' ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700' : ''}`}
              >
                <Skull weight="fill" size={18} />
                EXTREME MODE
              </Button>
            </Card>
            
            {difficultyMode === 'extreme' && (
              <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <Skull className="text-red-600 flex-shrink-0 mt-1" weight="fill" size={28} />
                  <div>
                    <h3 className="text-lg font-bold text-red-900 mb-2">🔥 EXTREME MODE ACTIVATED 🔥</h3>
                    <p className="text-sm text-red-800 mb-2">
                      Target scores are 3-5x higher and you get fewer moves! Only for master players.
                    </p>
                    <p className="text-xs text-red-700 font-semibold">
                      💀 Complete all 8 levels to earn the legendary <span className="text-red-900">EXTREME MASTER</span> badge!
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {onOpenTournament && (
            <Button 
              onClick={onOpenTournament}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg animate-pulse"
            >
              <Sword weight="fill" size={20} className="mr-2" />
              Weekly Tournament
            </Button>
          )}
          
          {onOpenDailyChallenge && (
            <Button 
              onClick={onOpenDailyChallenge}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <CalendarDots weight="fill" size={20} className="mr-2" />
              Daily Challenge
            </Button>
          )}
          
          {onOpenLeaderboard && (
            <Button 
              onClick={onOpenLeaderboard}
              size="lg"
              variant="outline"
              className="border-2"
            >
              <Ranking weight="fill" size={20} className="mr-2" />
              Leaderboard
            </Button>
          )}

          {onOpenBadgeShowcase && (
            <Button 
              onClick={onOpenBadgeShowcase}
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Sparkle weight="fill" size={20} className="mr-2" />
              Badge Collection
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {totalCO2Reduced > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Trophy className="text-yellow-500" weight="fill" size={32} />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Total Impact</div>
                  <div className="text-2xl font-bold text-primary">
                    {totalCO2Reduced.toLocaleString()} lbs CO₂
                  </div>
                </div>
              </div>
            </Card>
          )}

          {difficultyMode === 'extreme' && (
            <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400">
              <div className="flex items-center gap-3">
                <Skull className="text-red-600" weight="fill" size={32} />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Extreme Progress</div>
                  <div className="text-2xl font-bold text-red-600">
                    {completedLevels.length} / 8 Complete
                  </div>
                </div>
              </div>
            </Card>
          )}

          {currentStreak > 0 && (
            <Card className={`p-4 ${currentStreak >= 7 ? 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-400' : ''}`}>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame className="text-orange-500" weight="fill" size={32} />
                </motion.div>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Challenge Streak</div>
                  <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                    {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                    {currentStreak >= 7 && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Streak Master!
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {unlockedPowerUps.length > 0 && (
            <PowerUpCollection unlockedPowerUps={unlockedPowerUps} />
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
        {levels.map((level, index) => {
          const isCompleted = completedLevels.includes(level.id)
          const isLocked = index > 0 && !completedLevels.includes(levels[index - 1].id)
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`
                  p-6 relative overflow-hidden transition-all
                  ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl cursor-pointer'}
                  ${level.difficulty === 'extreme' ? 'border-2 border-red-500' : ''}
                `}
                onClick={() => !isLocked && onSelectLevel(level.id)}
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${BIOME_GRADIENTS[level.biome as keyof typeof BIOME_GRADIENTS]} opacity-10`}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        Level {level.id}
                        {level.difficulty === 'extreme' && (
                          <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs animate-pulse">
                            <Skull weight="fill" size={12} className="mr-1" />
                            EXTREME
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                    </div>
                    {isCompleted && (
                      <Badge className={level.difficulty === 'extreme' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-green-500'}>
                        <Trophy size={16} weight="fill" />
                      </Badge>
                    )}
                    {isLocked && (
                      <Badge variant="secondary">Locked</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {level.description}
                  </p>
                  
                  <div className="flex gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Target: </span>
                      <span className={`font-semibold ${level.difficulty === 'extreme' ? 'text-red-600' : ''}`}>
                        {level.targetScore.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moves: </span>
                      <span className={`font-semibold ${level.difficulty === 'extreme' ? 'text-red-600' : ''}`}>
                        {level.movesLimit}
                      </span>
                    </div>
                  </div>
                  
                  {!isLocked && (
                    <Button 
                      className={`w-full ${level.difficulty === 'extreme' ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700' : ''}`}
                      size="lg"
                    >
                      <Play weight="fill" className="mr-2" />
                      {isCompleted ? 'Play Again' : 'Start'}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
