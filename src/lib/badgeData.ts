import { BadgeType } from './types'

export interface BadgeInfo {
  type: BadgeType
  name: string
  icon: string
  description: string
  howToEarn: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: 'tournament' | 'achievement' | 'streak' | 'milestone'
  requirements: string[]
  tips?: string[]
}

export const BADGE_CATALOG: BadgeInfo[] = [
  {
    type: 'champion',
    name: 'Tournament Champion',
    icon: '🥇',
    description: 'The ultimate achievement - proof of absolute dominance in tournament play.',
    howToEarn: 'Achieve 1st place in any weekly tournament',
    color: 'from-yellow-400 via-yellow-500 to-amber-600',
    rarity: 'legendary',
    category: 'tournament',
    requirements: [
      'Score higher than all other players',
      'Complete the tournament before it ends',
      'Meet or exceed the target score'
    ],
    tips: [
      'Focus on creating 4+ tile matches for power-ups',
      'Save your power-ups for critical moments',
      'Plan ahead to set up combo chains'
    ]
  },
  {
    type: 'runner-up',
    name: 'Silver Medalist',
    icon: '🥈',
    description: 'An impressive feat - you\'re among the elite competitors.',
    howToEarn: 'Achieve 2nd place in any weekly tournament',
    color: 'from-gray-300 via-gray-400 to-gray-500',
    rarity: 'epic',
    category: 'tournament',
    requirements: [
      'Finish in 2nd place overall',
      'Complete before tournament ends',
      'Reach the target score'
    ],
    tips: [
      'Maximize your combo multiplier',
      'Use the shuffle button strategically',
      'Focus on high CO₂ impact tiles'
    ]
  },
  {
    type: 'third-place',
    name: 'Bronze Achiever',
    icon: '🥉',
    description: 'Top-tier performance recognized with this distinguished bronze medal.',
    howToEarn: 'Achieve 3rd place in any weekly tournament',
    color: 'from-amber-600 via-amber-700 to-amber-800',
    rarity: 'epic',
    category: 'tournament',
    requirements: [
      'Finish in 3rd place overall',
      'Beat the target score',
      'Submit before deadline'
    ],
    tips: [
      'Practice the tournament biome beforehand',
      'Learn which tiles give the most points',
      'Time your moves carefully'
    ]
  },
  {
    type: 'top-10',
    name: 'Elite Competitor',
    icon: '🏆',
    description: 'Ranked among the top 10 players - a mark of consistent excellence.',
    howToEarn: 'Finish in the top 10 of any weekly tournament',
    color: 'from-purple-500 via-purple-600 to-indigo-600',
    rarity: 'rare',
    category: 'tournament',
    requirements: [
      'Place in positions 4-10',
      'Reach the minimum target score',
      'Complete during tournament period'
    ],
    tips: [
      'Complete daily challenges for power-up practice',
      'Study top player strategies',
      'Aim for consistent matches vs. risky plays'
    ]
  },
  {
    type: 'participant',
    name: 'Tournament Participant',
    icon: '⭐',
    description: 'Stepped up to the challenge - every journey begins with a single step.',
    howToEarn: 'Participate in any weekly tournament',
    color: 'from-blue-400 via-blue-500 to-blue-600',
    rarity: 'common',
    category: 'tournament',
    requirements: [
      'Complete a tournament attempt',
      'Submit a valid score',
      'Play during tournament period'
    ],
    tips: [
      'Don\'t worry about perfection - just play!',
      'Learn the mechanics as you go',
      'Every tournament makes you better'
    ]
  },
  {
    type: 'streak-master',
    name: 'Streak Master',
    icon: '🔥',
    description: 'Unwavering dedication - you show up every single day to save the planet.',
    howToEarn: 'Complete daily challenges for 7 consecutive days',
    color: 'from-orange-400 via-red-500 to-red-600',
    rarity: 'epic',
    category: 'streak',
    requirements: [
      'Complete 7 daily challenges in a row',
      'Don\'t miss a single day',
      'Each challenge must meet target score'
    ],
    tips: [
      'Set a daily reminder',
      'Complete challenges early in the day',
      'Challenges reset at midnight GMT'
    ]
  },
  {
    type: 'eco-warrior',
    name: 'Eco Warrior',
    icon: '♻️',
    description: 'A true environmental champion - your CO₂ reduction impact is extraordinary.',
    howToEarn: 'Reduce a total of 100,000 kg of CO₂ across all gameplay',
    color: 'from-green-400 via-emerald-500 to-teal-600',
    rarity: 'legendary',
    category: 'milestone',
    requirements: [
      'Accumulate 100,000 kg total CO₂ reduction',
      'Can be earned across all game modes',
      'Progress tracked permanently'
    ],
    tips: [
      'Power-ups give massive CO₂ bonuses',
      'Rainforest levels have high CO₂ tiles',
      'Daily challenges and tournaments count too'
    ]
  },
  {
    type: 'challenger',
    name: 'Challenge Master',
    icon: '⚡',
    description: 'Rising to every challenge - you\'ve proven your adaptability and skill.',
    howToEarn: 'Complete 25 daily challenges (doesn\'t need to be consecutive)',
    color: 'from-cyan-400 via-cyan-500 to-blue-600',
    rarity: 'rare',
    category: 'achievement',
    requirements: [
      'Complete 25 total daily challenges',
      'Can be done over any time period',
      'Each challenge must be completed successfully'
    ],
    tips: [
      'Check daily for new challenges',
      'Each challenge unlocks a unique power-up',
      'Practice makes perfect'
    ]
  },
  {
    type: 'extreme-master',
    name: 'Extreme Master',
    icon: '💀',
    description: 'Only the most skilled players can conquer all extreme difficulty levels - you are legendary.',
    howToEarn: 'Complete all 8 levels on EXTREME difficulty mode',
    color: 'from-red-600 via-orange-600 to-yellow-500',
    rarity: 'legendary',
    category: 'achievement',
    requirements: [
      'Complete all 8 EXTREME mode levels',
      'Each level has much higher target scores',
      'Fewer moves allowed per level',
      'Requires mastery of all game mechanics'
    ],
    tips: [
      'Master power-up combinations for maximum effect',
      'Plan multiple moves ahead',
      'Focus on collision multipliers',
      'Use the heatmap to identify hot zones',
      'Practice normal mode first to perfect strategy'
    ]
  }
]

export const BADGE_TIERS = [
  {
    name: 'Common',
    color: 'from-gray-400 to-gray-500',
    description: 'Starting achievements for new players',
    glow: 'shadow-gray-400/30'
  },
  {
    name: 'Rare',
    color: 'from-blue-400 to-purple-500',
    description: 'Earned through dedication and skill',
    glow: 'shadow-blue-400/40'
  },
  {
    name: 'Epic',
    color: 'from-purple-500 to-pink-600',
    description: 'Reserved for exceptional performances',
    glow: 'shadow-purple-500/50'
  },
  {
    name: 'Legendary',
    color: 'from-yellow-400 to-orange-600',
    description: 'The pinnacle of achievement',
    glow: 'shadow-yellow-400/60'
  }
]

export function getBadgesByCategory(category: BadgeInfo['category']): BadgeInfo[] {
  return BADGE_CATALOG.filter(badge => badge.category === category)
}

export function getBadgesByRarity(rarity: BadgeInfo['rarity']): BadgeInfo[] {
  return BADGE_CATALOG.filter(badge => badge.rarity === rarity)
}

export function getBadgeInfo(type: BadgeType): BadgeInfo | undefined {
  return BADGE_CATALOG.find(badge => badge.type === type)
}
