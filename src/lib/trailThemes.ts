import { TrailTheme, TileType } from './types'

export interface TrailThemeConfig {
  id: TrailTheme
  name: string
  description: string
  colors: string[]
  particleShapes: ('circle' | 'square' | 'star' | 'diamond' | 'hexagon')[]
  particleSize: { min: number; max: number }
  particleSpeed: { min: number; max: number }
  particleLife: { min: number; max: number }
  glowIntensity: number
  rotationSpeed: { min: number; max: number }
  specialEffect?: 'spiral' | 'burst' | 'wave' | 'comet' | 'flame'
  requiredPowerUp?: TileType
  icon: string
}

export const TRAIL_THEMES: Record<TrailTheme, TrailThemeConfig> = {
  default: {
    id: 'default',
    name: 'Nature\'s Essence',
    description: 'A gentle trail of natural elements following your cursor',
    colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
    particleShapes: ['circle', 'square', 'star'],
    particleSize: { min: 4, max: 12 },
    particleSpeed: { min: 1, max: 3 },
    particleLife: { min: 40, max: 70 },
    glowIntensity: 2,
    rotationSpeed: { min: -5, max: 5 },
    icon: '🌿'
  },
  supernova: {
    id: 'supernova',
    name: 'Solar Supernova',
    description: 'Radiant solar energy bursting from your cursor like a cosmic explosion',
    colors: ['#fef08a', '#fde047', '#facc15', '#fbbf24', '#f59e0b', '#f97316', '#fb923c'],
    particleShapes: ['star', 'diamond', 'circle'],
    particleSize: { min: 6, max: 18 },
    particleSpeed: { min: 2, max: 5 },
    particleLife: { min: 50, max: 90 },
    glowIntensity: 4,
    rotationSpeed: { min: -15, max: 15 },
    specialEffect: 'burst',
    requiredPowerUp: 'supernova',
    icon: '☀️'
  },
  tsunami: {
    id: 'tsunami',
    name: 'Ocean Wave',
    description: 'Flowing waves of cleansing ocean water in your wake',
    colors: ['#0ea5e9', '#38bdf8', '#60a5fa', '#93c5fd', '#06b6d4', '#22d3ee', '#67e8f9'],
    particleShapes: ['circle', 'hexagon', 'diamond'],
    particleSize: { min: 5, max: 16 },
    particleSpeed: { min: 1.5, max: 4 },
    particleLife: { min: 60, max: 100 },
    glowIntensity: 3,
    rotationSpeed: { min: -8, max: 8 },
    specialEffect: 'wave',
    requiredPowerUp: 'tsunami',
    icon: '🌊'
  },
  earthquake: {
    id: 'earthquake',
    name: 'Tectonic Force',
    description: 'Powerful earth fragments tumbling behind your movements',
    colors: ['#78716c', '#a8a29e', '#d6d3d1', '#92400e', '#b45309', '#d97706', '#f59e0b'],
    particleShapes: ['square', 'diamond', 'hexagon'],
    particleSize: { min: 7, max: 20 },
    particleSpeed: { min: 0.5, max: 2.5 },
    particleLife: { min: 50, max: 80 },
    glowIntensity: 2.5,
    rotationSpeed: { min: -20, max: 20 },
    specialEffect: 'spiral',
    requiredPowerUp: 'earthquake',
    icon: '🏔️'
  },
  meteor: {
    id: 'meteor',
    name: 'Cosmic Impact',
    description: 'Streaking comet trails of stellar matter following your path',
    colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#e879f9', '#f0abfc', '#fae8ff', '#ddd6fe'],
    particleShapes: ['star', 'diamond', 'circle'],
    particleSize: { min: 5, max: 14 },
    particleSpeed: { min: 3, max: 6 },
    particleLife: { min: 70, max: 110 },
    glowIntensity: 5,
    rotationSpeed: { min: -12, max: 12 },
    specialEffect: 'comet',
    requiredPowerUp: 'meteor',
    icon: '☄️'
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix Flame',
    description: 'Eternal flames of rebirth and transformation dancing in your trail',
    colors: ['#dc2626', '#ef4444', '#f97316', '#fb923c', '#fbbf24', '#facc15', '#fef08a'],
    particleShapes: ['star', 'diamond', 'circle'],
    particleSize: { min: 6, max: 16 },
    particleSpeed: { min: 1, max: 3.5 },
    particleLife: { min: 45, max: 85 },
    glowIntensity: 4.5,
    rotationSpeed: { min: -10, max: 10 },
    specialEffect: 'flame',
    requiredPowerUp: 'phoenix',
    icon: '🔥'
  }
}

export function getAvailableThemes(unlockedPowerUps: TileType[]): TrailTheme[] {
  const themes: TrailTheme[] = ['default']
  
  Object.values(TRAIL_THEMES).forEach(theme => {
    if (theme.requiredPowerUp && unlockedPowerUps.includes(theme.requiredPowerUp)) {
      themes.push(theme.id)
    }
  })
  
  return themes
}

export function getThemeConfig(theme: TrailTheme): TrailThemeConfig {
  return TRAIL_THEMES[theme] || TRAIL_THEMES.default
}
