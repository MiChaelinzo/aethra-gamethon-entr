import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, Fire } from '@phosphor-icons/react'

interface GameStatsProps {
  score: number
  targetScore: number
  moves: number
  movesLimit: number
  pollution: number
  combo: number
}

export function GameStats({ score, targetScore, moves, movesLimit, pollution, combo }: GameStatsProps) {
  const scoreProgress = Math.min((score / targetScore) * 100, 100)
  const pollutionInverse = 100 - pollution
  
  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" weight="fill" size={24} />
            <span className="font-semibold">Score</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">{score}</span>
        </div>
        <Progress value={scoreProgress} className="h-2" />
        <div className="text-sm text-muted-foreground text-right">
          Target: {targetScore}
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fire className="text-orange-500" weight="fill" size={24} />
            <span className="font-semibold">Moves</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">{moves}/{movesLimit}</span>
        </div>
        <Progress 
          value={(moves / movesLimit) * 100} 
          className="h-2"
        />
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-green-500" weight="fill" size={24} />
            <span className="font-semibold">Health</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">{pollutionInverse}%</span>
        </div>
        <Progress 
          value={pollutionInverse} 
          className="h-2"
        />
      </Card>

      {combo > 1 && (
        <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500">
          <div className="flex items-center justify-center gap-2">
            <Fire className="text-orange-500" weight="fill" size={32} />
            <div className="text-center">
              <div className="text-3xl font-bold">{combo}x</div>
              <div className="text-sm font-semibold">COMBO!</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
