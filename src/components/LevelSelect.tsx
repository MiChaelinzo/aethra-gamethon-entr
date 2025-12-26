import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy } from '@phosphor-icons/react'
import { Level } from '@/lib/types'
import { BIOME_GRADIENTS } from '@/lib/gameData'

interface LevelSelectProps {
  levels: Level[]
  completedLevels: number[]
  onSelectLevel: (levelId: number) => void
  totalCO2Reduced: number
}

export function LevelSelect({ levels, completedLevels, onSelectLevel, totalCO2Reduced }: LevelSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
          EcoRise
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Restore the Planet, One Match at a Time
        </p>
        
        {totalCO2Reduced > 0 && (
          <Card className="p-4 inline-block">
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
                `}
                onClick={() => !isLocked && onSelectLevel(level.id)}
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${BIOME_GRADIENTS[level.biome as keyof typeof BIOME_GRADIENTS]} opacity-10`}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Level {level.id}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-500">
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
                      <span className="font-semibold">{level.targetScore}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moves: </span>
                      <span className="font-semibold">{level.movesLimit}</span>
                    </div>
                  </div>
                  
                  {!isLocked && (
                    <Button className="w-full" size="lg">
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
