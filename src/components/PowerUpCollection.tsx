import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { TileType } from '@/lib/types'
import { TILE_INFO } from '@/lib/gameData'
import { Lock, Sparkle } from '@phosphor-icons/react'

interface PowerUpCollectionProps {
  unlockedPowerUps: TileType[]
}

const ALL_POWERUPS: TileType[] = ['supernova', 'tsunami', 'earthquake', 'meteor', 'phoenix']

export function PowerUpCollection({ unlockedPowerUps }: PowerUpCollectionProps) {
  return (
    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="flex items-center gap-2 mb-3">
        <Sparkle weight="fill" size={20} className="text-purple-600" />
        <h3 className="font-bold text-lg">Power-Up Collection</h3>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {ALL_POWERUPS.map(powerUp => {
          const isUnlocked = unlockedPowerUps.includes(powerUp)
          const info = TILE_INFO[powerUp]
          
          return (
            <div
              key={powerUp}
              className={`
                p-3 rounded-lg border-2 text-center transition-all
                ${isUnlocked 
                  ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300' 
                  : 'bg-gray-100 border-gray-300 opacity-50'
                }
              `}
              title={isUnlocked ? info.name : 'Complete daily challenges to unlock'}
            >
              {isUnlocked ? (
                <div className="text-3xl mb-1">{info.emoji}</div>
              ) : (
                <div className="text-2xl mb-1 text-gray-400">
                  <Lock size={24} className="mx-auto" />
                </div>
              )}
              <div className="text-xs font-medium truncate">
                {isUnlocked ? info.name.split(' ')[0] : '???'}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-3 text-xs text-center text-muted-foreground">
        {unlockedPowerUps.length} / {ALL_POWERUPS.length} unlocked
      </div>
    </Card>
  )
}
