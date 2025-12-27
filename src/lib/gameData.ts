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
  },
  supernova: {
    type: 'supernova',
    name: 'Solar Supernova',
    icon: 'SunHorizon',
    color: 'text-yellow-400',
    fact: 'A supernova of renewable energy! This mega power-up clears all adjacent tiles and supercharges your restoration efforts with 10,000 kg of CO2 reduction.',
    co2Impact: 10000
  },
  tsunami: {
    type: 'tsunami',
    name: 'Ocean Wave',
    icon: 'Waves',
    color: 'text-blue-500',
    fact: 'Ride the wave of change! This powerful tsunami clears an entire row or column and restores ocean ecosystems, preventing 8,500 kg of CO2 emissions.',
    co2Impact: 8500
  },
  earthquake: {
    type: 'earthquake',
    name: 'Tectonic Shift',
    icon: 'Mountains',
    color: 'text-amber-700',
    fact: 'Shake up the status quo! This geological power reshuffles the board strategically and plants 7,000 kg worth of carbon-capturing trees.',
    co2Impact: 7000
  },
  meteor: {
    type: 'meteor',
    name: 'Asteroid Impact',
    icon: 'Comet',
    color: 'text-purple-600',
    fact: 'Impact for good! This cosmic power clears all tiles of a chosen type, creating space for new growth and capturing 9,500 kg of CO2.',
    co2Impact: 9500
  },
  phoenix: {
    type: 'phoenix',
    name: 'Phoenix Rebirth',
    icon: 'FireSimple',
    color: 'text-orange-500',
    fact: 'Rise from the ashes! The phoenix transforms the entire board, creating optimal matches and symbolizing Earth\'s renewal with 12,000 kg CO2 offset.',
    co2Impact: 12000
  }
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Awakening Forest',
    biome: 'forest',
    description: 'Restore the dying forest by planting trees and cleaning the air.',
    gridSize: 6,
    targetScore: 1200,
    movesLimit: 15,
    tileTypes: ['tree', 'water', 'recycle', 'energy'],
    difficulty: 'normal'
  },
  {
    id: 2,
    name: 'Solar Frontier',
    biome: 'desert',
    description: 'Transform the wasteland with renewable solar energy.',
    gridSize: 7,
    targetScore: 2000,
    movesLimit: 18,
    tileTypes: ['solar', 'wind', 'recycle', 'energy'],
    difficulty: 'normal'
  },
  {
    id: 3,
    name: 'Ocean\'s Breath',
    biome: 'ocean',
    description: 'Clean the waters and restore marine life.',
    gridSize: 7,
    targetScore: 2800,
    movesLimit: 20,
    tileTypes: ['water', 'wind', 'recycle', 'tree'],
    difficulty: 'normal'
  },
  {
    id: 4,
    name: 'Green Metropolis',
    biome: 'city',
    description: 'Transform the polluted city into a sustainable urban paradise.',
    gridSize: 8,
    targetScore: 4000,
    movesLimit: 22,
    tileTypes: ['solar', 'recycle', 'energy', 'tree', 'wind'],
    difficulty: 'normal'
  },
  {
    id: 5,
    name: 'Frozen Wasteland',
    biome: 'tundra',
    description: 'Preserve the melting ice caps and protect arctic ecosystems.',
    gridSize: 8,
    targetScore: 5200,
    movesLimit: 24,
    tileTypes: ['ice', 'penguin', 'aurora', 'wind', 'energy'],
    difficulty: 'normal'
  },
  {
    id: 6,
    name: 'Amazon Heart',
    biome: 'rainforest',
    description: 'Save the lungs of the Earth from deforestation and pollution.',
    gridSize: 9,
    targetScore: 6800,
    movesLimit: 26,
    tileTypes: ['orchid', 'jaguar', 'medicinal', 'tree', 'water'],
    difficulty: 'normal'
  },
  {
    id: 7,
    name: 'Arctic Guardian',
    biome: 'tundra',
    description: 'Battle climate change in the frozen north with renewable solutions.',
    gridSize: 9,
    targetScore: 8500,
    movesLimit: 28,
    tileTypes: ['ice', 'aurora', 'penguin', 'solar', 'wind'],
    difficulty: 'normal'
  },
  {
    id: 8,
    name: 'Canopy Revival',
    biome: 'rainforest',
    description: 'Restore biodiversity in the endangered tropical paradise.',
    gridSize: 10,
    targetScore: 10500,
    movesLimit: 30,
    tileTypes: ['orchid', 'medicinal', 'jaguar', 'tree', 'recycle'],
    difficulty: 'normal'
  }
]

export const EXTREME_LEVELS: Level[] = [
  {
    id: 101,
    name: 'Inferno Forest',
    biome: 'forest',
    description: 'EXTREME: Save the forest from catastrophic wildfires with limited moves!',
    gridSize: 6,
    targetScore: 5000,
    movesLimit: 12,
    tileTypes: ['tree', 'water', 'recycle', 'energy'],
    difficulty: 'extreme'
  },
  {
    id: 102,
    name: 'Solar Apocalypse',
    biome: 'desert',
    description: 'EXTREME: Harness solar power in a scorched wasteland with brutal targets!',
    gridSize: 7,
    targetScore: 8500,
    movesLimit: 14,
    tileTypes: ['solar', 'wind', 'recycle', 'energy'],
    difficulty: 'extreme'
  },
  {
    id: 103,
    name: 'Tsunami Crisis',
    biome: 'ocean',
    description: 'EXTREME: Restore the devastated ocean against impossible odds!',
    gridSize: 7,
    targetScore: 12000,
    movesLimit: 16,
    tileTypes: ['water', 'wind', 'recycle', 'tree'],
    difficulty: 'extreme'
  },
  {
    id: 104,
    name: 'Megacity Meltdown',
    biome: 'city',
    description: 'EXTREME: Transform a collapsing urban hellscape with precision moves!',
    gridSize: 8,
    targetScore: 18000,
    movesLimit: 18,
    tileTypes: ['solar', 'recycle', 'energy', 'tree', 'wind'],
    difficulty: 'extreme'
  },
  {
    id: 105,
    name: 'Arctic Armageddon',
    biome: 'tundra',
    description: 'EXTREME: Stop the polar ice caps from vanishing in this brutal challenge!',
    gridSize: 8,
    targetScore: 24000,
    movesLimit: 20,
    tileTypes: ['ice', 'penguin', 'aurora', 'wind', 'energy'],
    difficulty: 'extreme'
  },
  {
    id: 106,
    name: 'Rainforest Requiem',
    biome: 'rainforest',
    description: 'EXTREME: The Amazon is dying—save it with masterful strategy!',
    gridSize: 9,
    targetScore: 32000,
    movesLimit: 22,
    tileTypes: ['orchid', 'jaguar', 'medicinal', 'tree', 'water'],
    difficulty: 'extreme'
  },
  {
    id: 107,
    name: 'Polar Extinction',
    biome: 'tundra',
    description: 'EXTREME: Face the ultimate arctic challenge with crushing difficulty!',
    gridSize: 9,
    targetScore: 42000,
    movesLimit: 24,
    tileTypes: ['ice', 'aurora', 'penguin', 'solar', 'wind'],
    difficulty: 'extreme'
  },
  {
    id: 108,
    name: 'Biodiversity Collapse',
    biome: 'rainforest',
    description: 'EXTREME: The hardest challenge—restore a dying rainforest ecosystem!',
    gridSize: 10,
    targetScore: 55000,
    movesLimit: 26,
    tileTypes: ['orchid', 'medicinal', 'jaguar', 'tree', 'recycle'],
    difficulty: 'extreme'
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
