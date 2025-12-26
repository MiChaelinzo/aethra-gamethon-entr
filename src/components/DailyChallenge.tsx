import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Trophy, 
  Flame, 
  Clock, 
  Lightning,
  Sparkle
} from '@phosphor-icons/react'
import { DailyChallenge as DailyChallengeType } from '@/lib/types'
import { TILE_INFO } from '@/lib/gameData'

interface DailyChallengeProps {
  challenge: DailyChallengeType
  streak: number
  isCompleted: boolean
  onStart: () => void
  hasUnlockedReward: boolean
}

export function DailyChallenge({ 
  challenge, 
  streak, 
  isCompleted, 
  onStart,
  hasUnlockedReward 
}: DailyChallengeProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const expires = new Date(challenge.expiresAt)
      const diff = expires.getTime() - now.getTime()

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ hours, minutes, seconds })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [challenge.expiresAt])

  const rewardInfo = TILE_INFO[challenge.rewardPowerUp]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Trophy weight="fill" size={28} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold">Daily Challenge</h3>
                  {isCompleted && (
                    <Badge className="bg-green-500 text-white">
                      <Lightning weight="fill" size={14} className="mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock weight="bold" size={16} />
                  Expires in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </p>
              </div>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg border-2 border-orange-400 shadow-lg">
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
                  <Flame weight="fill" size={28} className="text-orange-500" />
                </motion.div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">{streak}</div>
                  <div className="text-xs text-orange-700 font-medium">Day Streak</div>
                </div>
              </div>
            )}
          </div>

          {streak > 0 && streak < 7 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame weight="fill" size={20} className="text-orange-500" />
                  <span className="font-bold text-orange-800">Streak Master Badge Progress</span>
                </div>
                <span className="text-sm font-bold text-orange-700">{streak}/7 days</span>
              </div>
              <Progress value={(streak / 7) * 100} className="h-3 mb-2" />
              <p className="text-xs text-orange-700">
                Complete {7 - streak} more consecutive daily challenge{7 - streak !== 1 ? 's' : ''} to earn the Epic Streak Master badge! 🔥
              </p>
            </div>
          )}

          {streak >= 7 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-400">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame weight="fill" size={32} className="text-orange-600" />
                </motion.div>
                <div className="flex-1">
                  <div className="font-bold text-orange-800 text-lg">🏆 Streak Master Status!</div>
                  <p className="text-sm text-orange-700">
                    You've completed {streak} consecutive days! Check your Badge Showcase! 🎉
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-xl font-bold mb-2">{challenge.name}</h4>
            <p className="text-muted-foreground mb-3">{challenge.description}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <Sparkle weight="fill" size={16} className="text-purple-500" />
              <span className="text-sm font-medium text-purple-700">
                {challenge.specialCondition}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-white/60 rounded-lg border border-purple-100">
              <div className="text-xs text-muted-foreground mb-1">Target Score</div>
              <div className="text-lg font-bold">{challenge.targetScore.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg border border-purple-100">
              <div className="text-xs text-muted-foreground mb-1">Moves Limit</div>
              <div className="text-lg font-bold">{challenge.movesLimit}</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg border border-purple-100">
              <div className="text-xs text-muted-foreground mb-1">Grid Size</div>
              <div className="text-lg font-bold">{challenge.gridSize}×{challenge.gridSize}</div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg border-2 border-amber-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-amber-900 mb-1">
                  🎁 Exclusive Reward
                </div>
                <div className="text-lg font-bold text-amber-700 flex items-center gap-2">
                  {rewardInfo.icon} {rewardInfo.name}
                  {hasUnlockedReward && (
                    <Badge variant="secondary" className="bg-green-200 text-green-800">
                      Unlocked!
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-amber-800 mt-1">
                  {hasUnlockedReward 
                    ? 'This power-up can now spawn in your games!' 
                    : 'Complete the challenge to unlock this rare power-up'}
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={onStart}
            disabled={isCompleted}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg"
          >
            {isCompleted ? '✓ Challenge Complete!' : 'Start Challenge'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
