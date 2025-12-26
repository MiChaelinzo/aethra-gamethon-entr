import { motion } from 'framer-motion'
import { 
  Crown, 
  Medal, 
  Trophy, 
  Star,
  Lightning,
  Fire,
  Sparkle
} from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { BadgeType } from '@/lib/types'

export type { BadgeType }

interface TournamentBadgeProps {
  type: BadgeType
  tournamentName?: string
  rank?: number
  detail?: string
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
}

export function TournamentBadge({ 
  type, 
  tournamentName, 
  rank, 
  detail,
  size = 'md',
  showTooltip = true 
}: TournamentBadgeProps) {
  const getBadgeConfig = () => {
    switch (type) {
      case 'champion':
        return {
          icon: Crown,
          color: 'from-yellow-400 via-yellow-500 to-amber-600',
          borderColor: 'border-yellow-400',
          glowColor: 'shadow-yellow-500/50',
          label: '🥇 Champion',
          description: `1st Place${tournamentName ? ` - ${tournamentName}` : ''}`
        }
      case 'runner-up':
        return {
          icon: Medal,
          color: 'from-gray-300 via-gray-400 to-gray-500',
          borderColor: 'border-gray-400',
          glowColor: 'shadow-gray-400/50',
          label: '🥈 Runner-Up',
          description: `2nd Place${tournamentName ? ` - ${tournamentName}` : ''}`
        }
      case 'third-place':
        return {
          icon: Medal,
          color: 'from-amber-600 via-amber-700 to-amber-800',
          borderColor: 'border-amber-600',
          glowColor: 'shadow-amber-600/50',
          label: '🥉 Third Place',
          description: `3rd Place${tournamentName ? ` - ${tournamentName}` : ''}`
        }
      case 'top-10':
        return {
          icon: Trophy,
          color: 'from-purple-500 via-purple-600 to-indigo-600',
          borderColor: 'border-purple-500',
          glowColor: 'shadow-purple-500/50',
          label: '🏆 Top 10',
          description: `#${rank} Place${tournamentName ? ` - ${tournamentName}` : ''}`
        }
      case 'participant':
        return {
          icon: Star,
          color: 'from-blue-400 via-blue-500 to-blue-600',
          borderColor: 'border-blue-400',
          glowColor: 'shadow-blue-400/50',
          label: '⭐ Participant',
          description: tournamentName || 'Tournament Participant'
        }
      case 'streak-master':
        return {
          icon: Fire,
          color: 'from-orange-400 via-red-500 to-red-600',
          borderColor: 'border-orange-400',
          glowColor: 'shadow-orange-400/50',
          label: '🔥 Streak Master',
          description: detail || 'Daily Challenge Streak'
        }
      case 'eco-warrior':
        return {
          icon: Sparkle,
          color: 'from-green-400 via-emerald-500 to-teal-600',
          borderColor: 'border-green-400',
          glowColor: 'shadow-green-400/50',
          label: '♻️ Eco Warrior',
          description: detail || 'CO₂ Reduction Champion'
        }
      case 'challenger':
        return {
          icon: Lightning,
          color: 'from-cyan-400 via-cyan-500 to-blue-600',
          borderColor: 'border-cyan-400',
          glowColor: 'shadow-cyan-400/50',
          label: '⚡ Challenger',
          description: detail || 'Challenge Master'
        }
    }
  }

  const config = getBadgeConfig()
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 24
  }

  const badge = (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${sizeClasses[size]}
        rounded-full 
        bg-gradient-to-br ${config.color}
        border-2 ${config.borderColor}
        shadow-lg ${config.glowColor}
        flex items-center justify-center
        cursor-pointer
        relative
      `}
    >
      <Icon 
        size={iconSizes[size]} 
        weight="fill" 
        className="text-white drop-shadow-md"
      />
      
      <motion.div
        className="absolute inset-0 rounded-full bg-white/30"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )

  if (!showTooltip) {
    return badge
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <div className="font-bold">{config.label}</div>
            <div className="text-xs text-muted-foreground">{config.description}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface BadgeCollectionProps {
  badges: Array<{
    type: BadgeType
    tournamentName?: string
    rank?: number
    detail?: string
  }>
  size?: 'sm' | 'md' | 'lg'
  maxDisplay?: number
}

export function BadgeCollection({ badges, size = 'sm', maxDisplay = 5 }: BadgeCollectionProps) {
  const displayBadges = badges.slice(0, maxDisplay)
  const remainingCount = badges.length - maxDisplay

  return (
    <div className="flex items-center gap-1">
      {displayBadges.map((badge, index) => (
        <TournamentBadge
          key={index}
          type={badge.type}
          tournamentName={badge.tournamentName}
          rank={badge.rank}
          detail={badge.detail}
          size={size}
        />
      ))}
      {remainingCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`
                ${size === 'sm' ? 'h-6 w-6 text-xs' : size === 'md' ? 'h-8 w-8 text-sm' : 'h-12 w-12'}
                rounded-full 
                bg-muted 
                border-2 border-border
                flex items-center justify-center
                font-bold text-muted-foreground
                cursor-pointer
              `}>
                +{remainingCount}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs">
                {remainingCount} more badge{remainingCount > 1 ? 's' : ''}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
