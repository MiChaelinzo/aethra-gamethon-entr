import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { User, Trophy, Fire, Leaf } from '@phosphor-icons/react'

interface UserProfileProps {
  user: {
    login: string
    avatarUrl: string
    id: string
  }
  stats: {
    totalCO2Reduced: number
    currentStreak: number
    completedLevels: number
    badges: number
  }
}

export function UserProfile({ user, stats }: UserProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/90 backdrop-blur-sm border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={user.avatarUrl} alt={user.login} />
              <AvatarFallback>
                <User weight="fill" size={32} />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">@{user.login}</h3>
              <div className="flex items-center gap-3 text-sm">
                <Badge variant="secondary" className="gap-1">
                  <Leaf weight="fill" size={14} />
                  {(stats.totalCO2Reduced / 1000).toFixed(1)}t CO₂
                </Badge>
                {stats.currentStreak > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Fire weight="fill" size={14} />
                    {stats.currentStreak} day streak
                  </Badge>
                )}
                <Badge variant="secondary" className="gap-1">
                  <Trophy weight="fill" size={14} />
                  {stats.badges} badges
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
