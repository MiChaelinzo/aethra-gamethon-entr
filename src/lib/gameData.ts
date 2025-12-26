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
  },
  ice: {
    type: 'ice',
    name: 'Ice Crystal',
    icon: 'Snowflake',
    color: 'text-cyan-300',
    fact: 'Arctic ice reflects 80% of sunlight back to space. Preserving ice sheets is crucial for regulating Earth\'s temperature and preventing feedback loops.',
    co2Impact: 1200
  },
  penguin: {
    type: 'penguin',
    name: 'Wildlife Protection',
    icon: 'Bird',
    color: 'text-slate-700',
    fact: 'Arctic and Antarctic wildlife like penguins and polar bears are indicators of ecosystem health. Protecting them preserves biodiversity and carbon sinks.',
    co2Impact: 900
  },
  aurora: {
    type: 'aurora',
    name: 'Clean Air',
    icon: 'Sparkle',
    color: 'text-violet-400',
    fact: 'The pristine Arctic air is threatened by pollution. Keeping polar regions clean prevents accelerated melting and preserves natural climate regulation.',
    co2Impact: 1500
  },
  orchid: {
    type: 'orchid',
    name: 'Rare Plants',
    icon: 'FlowerLotus',
    color: 'text-pink-500',
    fact: 'Rainforests contain 50% of Earth\'s plant species. A single hectare can hold 750 tree species—more than all of North America.',
    co2Impact: 2500
  },
  jaguar: {
    type: 'jaguar',
    name: 'Biodiversity',
    icon: 'Cat',
    color: 'text-amber-600',
    fact: 'Rainforest predators like jaguars maintain ecosystem balance. One rainforest acre supports 1,500 species, creating Earth\'s richest carbon-capturing system.',
    co2Impact: 1800
  },
  medicinal: {
    type: 'medicinal',
    name: 'Medicinal Plants',
    icon: 'Leaf',
    color: 'text-emerald-600',
    fact: '70% of cancer-fighting plants come from rainforests. Preserving these ecosystems protects both human health and planetary climate.',
    co2Impact: 2200
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
    movesLimit: 20,
    tileTypes: ['tree', 'water', 'recycle', 'energy']
  },
  {
    id: 2,
    name: 'Solar Frontier',
    biome: 'desert',
    description: 'Transform the wasteland with renewable solar energy.',
    gridSize: 7,
    targetScore: 800,
    movesLimit: 25,
    tileTypes: ['solar', 'wind', 'recycle', 'energy']
  },
  {
    id: 3,
    name: 'Ocean\'s Breath',
    biome: 'ocean',
    description: 'Clean the waters and restore marine life.',
    gridSize: 7,
    targetScore: 1000,
    movesLimit: 30,
    tileTypes: ['water', 'wind', 'recycle', 'tree']
  },
  {
    id: 4,
    name: 'Green Metropolis',
    biome: 'city',
    description: 'Transform the polluted city into a sustainable urban paradise.',
    gridSize: 8,
    targetScore: 1500,
    movesLimit: 35,
    tileTypes: ['solar', 'recycle', 'energy', 'tree', 'wind']
  },
  {
    id: 5,
    name: 'Frozen Wasteland',
    biome: 'tundra',
    description: 'Preserve the melting ice caps and protect arctic ecosystems.',
    gridSize: 8,
    targetScore: 1800,
    movesLimit: 38,
    tileTypes: ['ice', 'penguin', 'aurora', 'wind', 'energy']
  },
  {
    id: 6,
    name: 'Amazon Heart',
    biome: 'rainforest',
    description: 'Save the lungs of the Earth from deforestation and pollution.',
    gridSize: 9,
    targetScore: 2200,
    movesLimit: 40,
    tileTypes: ['orchid', 'jaguar', 'medicinal', 'tree', 'water']
  },
  {
    id: 7,
    name: 'Arctic Guardian',
    biome: 'tundra',
    description: 'Battle climate change in the frozen north with renewable solutions.',
    gridSize: 9,
    targetScore: 2500,
    movesLimit: 42,
    tileTypes: ['ice', 'aurora', 'penguin', 'solar', 'wind']
  },
  {
    id: 8,
    name: 'Canopy Revival',
    biome: 'rainforest',
    description: 'Restore biodiversity in the endangered tropical paradise.',
    gridSize: 10,
    targetScore: 3000,
    movesLimit: 45,
    tileTypes: ['orchid', 'medicinal', 'jaguar', 'tree', 'recycle']
  }
]

export const BIOME_GRADIENTS = {
  forest: 'from-green-900 via-green-700 to-green-500',
  desert: 'from-orange-900 via-yellow-700 to-yellow-400',
  ocean: 'from-blue-900 via-cyan-700 to-blue-400',
  city: 'from-gray-800 via-slate-600 to-blue-500',
  tundra: 'from-blue-950 via-cyan-800 to-blue-300',
  rainforest: 'from-emerald-900 via-green-700 to-lime-500'
}

export const POLLUTION_GRADIENT = 'from-gray-800 via-gray-600 to-gray-500'
