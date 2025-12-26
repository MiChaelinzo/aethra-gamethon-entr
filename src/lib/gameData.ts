import { Level, TileInfo, TileType } from './types'

export const TILE_INFO: Record<TileType, TileInfo> = {
  tree: {
    type: 'tree',
    name: 'Reforestation',
    icon: 'Tree',
    color: 'text-green-600',
    fact: 'A single tree absorbs about 48 pounds of CO2 per year. Global reforestation could capture 25% of atmospheric CO2.',
    co2Impact: 48
  },
  solar: {
    type: 'solar',
    name: 'Solar Power',
    icon: 'SolarPanel',
    color: 'text-yellow-500',
    fact: 'Solar panels reduce carbon emissions by 80% compared to fossil fuels. A typical home solar system offsets 3-4 tons of CO2 annually.',
    co2Impact: 3500
  },
  wind: {
    type: 'wind',
    name: 'Wind Energy',
    icon: 'Wind',
    color: 'text-blue-400',
    fact: 'One wind turbine can power 940 homes and prevent 4,000 tons of CO2 emissions yearly—equivalent to planting 100,000 trees.',
    co2Impact: 4000
  },
  recycle: {
    type: 'recycle',
    name: 'Recycling',
    icon: 'Recycle',
    color: 'text-teal-500',
    fact: 'Recycling one ton of paper saves 17 trees and prevents 1,400 pounds of CO2 emissions. Global recycling prevents 700M tons CO2/year.',
    co2Impact: 700
  },
  water: {
    type: 'water',
    name: 'Ocean Cleanup',
    icon: 'Drop',
    color: 'text-cyan-500',
    fact: 'Healthy oceans absorb 30% of human CO2 emissions. Ocean cleanup helps restore marine ecosystems that capture billions of tons of carbon.',
    co2Impact: 2000
  },
  energy: {
    type: 'energy',
    name: 'Energy Efficiency',
    icon: 'Lightning',
    color: 'text-purple-500',
    fact: 'LED bulbs use 75% less energy than incandescent. If every US home switched, we\'d prevent 44M tons of CO2 annually.',
    co2Impact: 850
  }
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Awakening Forest',
    biome: 'forest',
    description: 'Restore the dying forest by planting trees and cleaning the air.',
    gridSize: 6,
    targetScore: 500,
    movesLimit: 20
  },
  {
    id: 2,
    name: 'Solar Frontier',
    biome: 'desert',
    description: 'Transform the wasteland with renewable solar energy.',
    gridSize: 7,
    targetScore: 800,
    movesLimit: 25
  },
  {
    id: 3,
    name: 'Ocean\'s Breath',
    biome: 'ocean',
    description: 'Clean the waters and restore marine life.',
    gridSize: 7,
    targetScore: 1000,
    movesLimit: 30
  },
  {
    id: 4,
    name: 'Green Metropolis',
    biome: 'city',
    description: 'Transform the polluted city into a sustainable urban paradise.',
    gridSize: 8,
    targetScore: 1500,
    movesLimit: 35
  }
]

export const BIOME_GRADIENTS = {
  forest: 'from-green-900 via-green-700 to-green-500',
  desert: 'from-orange-900 via-yellow-700 to-yellow-400',
  ocean: 'from-blue-900 via-cyan-700 to-blue-400',
  city: 'from-gray-800 via-slate-600 to-blue-500'
}

export const POLLUTION_GRADIENT = 'from-gray-800 via-gray-600 to-gray-500'
