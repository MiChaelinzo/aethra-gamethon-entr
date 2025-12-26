import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trophy, Star } from '@phosphor-icons/react'

interface LevelCompleteProps {
  isOpen: boolean
  score: number
  targetScore: number
  co2Reduced: number
  onNextLevel: () => void
  onRestart: () => void
  isLastLevel: boolean
}

export function LevelComplete({ 
  isOpen, 
  score, 
  targetScore, 
  co2Reduced,
  onNextLevel, 
  onRestart,
  isLastLevel 
}: LevelCompleteProps) {
  const stars = score >= targetScore * 1.5 ? 3 : score >= targetScore * 1.2 ? 2 : 1

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Trophy className="text-yellow-500" weight="fill" size={64} />
          </div>
          <DialogTitle className="text-3xl text-center">
            Level Complete!
          </DialogTitle>
          <DialogDescription className="text-center space-y-4 pt-4">
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  size={40}
                  weight={i < stars ? 'fill' : 'regular'}
                  className={i < stars ? 'text-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
            
            <div className="space-y-2 pt-4">
              <div className="text-lg font-semibold">
                Score: <span className="text-primary">{score.toLocaleString()}</span>
              </div>
              <div className="educational-text text-base">
                You prevented <span className="font-bold text-primary">{co2Reduced.toLocaleString()} lbs</span> of CO₂ emissions!
              </div>
            </div>
            
            {score >= targetScore * 1.5 && (
              <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 text-sm font-semibold">
                🌟 Perfect! Maximum impact achieved!
              </div>
            )}
            
            {score < targetScore && (
              <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-3 text-sm">
                Every action counts! Try again to increase your impact.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onRestart} className="w-full">
            Replay Level
          </Button>
          {!isLastLevel && (
            <Button onClick={onNextLevel} className="w-full">
              Next Level
            </Button>
          )}
          {isLastLevel && (
            <Button onClick={onRestart} className="w-full">
              Play Again
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
