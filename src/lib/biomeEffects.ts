import { TileType } from './types'

export interface ParticleConfig {
  count: number
  colors: string[]
  shapes: 'circle' | 'leaf' | 'snowflake' | 'star' | 'water' | 'lightning' | 'petal'
  duration: number
  spread: number
}

export const BIOME_EFFECTS: Record<TileType, ParticleConfig> = {
  tree: {
    count: 12,
    colors: ['#16a34a', '#22c55e', '#4ade80', '#86efac'],
    shapes: 'leaf',
    duration: 800,
    spread: 100
  },
  solar: {
    count: 15,
    colors: ['#eab308', '#facc15', '#fde047', '#fef08a'],
    shapes: 'star',
    duration: 700,
    spread: 120
  },
  wind: {
    count: 18,
    colors: ['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
    shapes: 'circle',
    duration: 900,
    spread: 150
  },
  recycle: {
    count: 10,
    colors: ['#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'],
    shapes: 'circle',
    duration: 700,
    spread: 90
  },
  water: {
    count: 20,
    colors: ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'],
    shapes: 'water',
    duration: 1000,
    spread: 110
  },
  energy: {
    count: 8,
    colors: ['#a855f7', '#c084fc', '#e9d5ff', '#faf5ff'],
    shapes: 'lightning',
    duration: 600,
    spread: 80
  },
  ice: {
    count: 14,
    colors: ['#67e8f9', '#a5f3fc', '#cffafe', '#ecfeff'],
    shapes: 'snowflake',
    duration: 1200,
    spread: 100
  },
  penguin: {
    count: 10,
    colors: ['#475569', '#94a3b8', '#cbd5e1', '#f1f5f9'],
    shapes: 'circle',
    duration: 800,
    spread: 95
  },
  aurora: {
    count: 16,
    colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
    shapes: 'star',
    duration: 1100,
    spread: 130
  },
  orchid: {
    count: 12,
    colors: ['#ec4899', '#f472b6', '#fb7185', '#fda4af'],
    shapes: 'petal',
    duration: 900,
    spread: 100
  },
  jaguar: {
    count: 10,
    colors: ['#d97706', '#f59e0b', '#fbbf24', '#fcd34d'],
    shapes: 'circle',
    duration: 750,
    spread: 90
  },
  medicinal: {
    count: 14,
    colors: ['#059669', '#10b981', '#34d399', '#6ee7b7'],
    shapes: 'leaf',
    duration: 850,
    spread: 105
  }
}

export const BIOME_ANIMATIONS: Record<string, string> = {
  forest: 'pulse-grow',
  desert: 'solar-burst',
  ocean: 'wave-ripple',
  city: 'tech-flash',
  tundra: 'ice-shatter',
  rainforest: 'vine-wrap'
}
