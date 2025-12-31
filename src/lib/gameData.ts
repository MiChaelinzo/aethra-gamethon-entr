import { Level, TileInfo, TileType } from './types'

export const TILE_INFO: Record<TileType, TileInfo> = {
  tree: {
    type: 'tree',
    name: 'Reforestation',
    icon: 'Tree',
    emoji: '🌲',
    color: 'text-green-600',
    fact: 'A single mature tree absorbs about 48 pounds of CO2 per year and releases enough oxygen for 2 people annually. Global reforestation of 900 million hectares could capture 25% of atmospheric CO2 and provide habitat for 68% of threatened species. Trees also cool cities by up to 5°C, reduce air pollution by 60%, and prevent soil erosion that releases additional carbon.',
    co2Impact: 48
  },
  solar: {
    type: 'solar',
    name: 'Solar Power',
    icon: 'SolarPanel',
    emoji: '☀️',
    color: 'text-yellow-500',
    fact: 'Solar panels reduce carbon emissions by 80% compared to fossil fuels and generate zero pollution during operation. A typical 6kW home solar system offsets 3-4 tons of CO2 annually—equivalent to planting 100 trees. The sun provides enough energy in one hour to power Earth for an entire year. Solar installations have prevented 1.3 billion tons of CO2 since 2000 and create 3x more jobs per dollar invested than fossil fuels.',
    co2Impact: 3500
  },
  wind: {
    type: 'wind',
    name: 'Wind Energy',
    icon: 'Wind',
    emoji: '💨',
    color: 'text-blue-400',
    fact: 'One modern wind turbine can power 940 homes and prevent 4,000 tons of CO2 emissions yearly—equivalent to planting 100,000 trees or removing 900 cars from roads. Wind energy uses 99% less water than coal plants and creates zero air pollution. Offshore wind farms can coexist with marine ecosystems while generating 2x more power than land-based turbines. Global wind power has avoided 1.2 billion tons of CO2 annually.',
    co2Impact: 4000
  },
  recycle: {
    type: 'recycle',
    name: 'Recycling',
    icon: 'Recycle',
    emoji: '♻️',
    color: 'text-teal-500',
    fact: 'Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and prevents 1,400 pounds of CO2 emissions. Global recycling prevents 700 million tons of CO2 yearly—like removing 150 million cars. Recycling aluminum saves 95% of energy needed to produce new cans and can be recycled infinitely. If we recycled all global waste, we\'d cut emissions by 20% and save resources equivalent to 400 billion barrels of oil annually.',
    co2Impact: 700
  },
  water: {
    type: 'water',
    name: 'Ocean Cleanup',
    icon: 'Drop',
    emoji: '💧',
    color: 'text-cyan-500',
    fact: 'Healthy oceans absorb 30% of human CO2 emissions and produce 50% of Earth\'s oxygen—more than all forests combined. Ocean cleanup helps restore marine ecosystems that capture 2 billion tons of carbon yearly through phytoplankton and seagrass. Protecting 30% of oceans could safeguard 10 million species and store 4.8 billion tons of CO2 annually. Marine conservation also supports 3 billion people who depend on oceans for food and livelihood.',
    co2Impact: 2000
  },
  energy: {
    type: 'energy',
    name: 'Energy Efficiency',
    icon: 'Lightning',
    emoji: '⚡',
    color: 'text-purple-500',
    fact: 'LED bulbs use 75% less energy than incandescent and last 25 times longer. If every US home switched to LEDs, we\'d prevent 44 million tons of CO2 annually—enough to power 5 million homes. Energy-efficient appliances can cut home energy use by 30-50%, saving $500+ yearly. Smart thermostats reduce heating/cooling emissions by 23%. Global energy efficiency improvements could cut emissions by 40% by 2040 while saving $18 trillion.',
    co2Impact: 850
  },
  ice: {
    type: 'ice',
    name: 'Ice Crystal',
    icon: 'Snowflake',
    emoji: '❄️',
    color: 'text-cyan-300',
    fact: 'Arctic ice reflects 80% of sunlight back to space, cooling Earth\'s climate. Since 1979, we\'ve lost 13% of Arctic ice per decade—an area 3x the size of Texas. Ice loss creates a feedback loop: darker ocean absorbs more heat, accelerating warming by 50%. Preserving ice sheets prevents 3-6 meter sea level rise that would displace 410 million people. Polar regions store 68% of Earth\'s freshwater and regulate global weather patterns.',
    co2Impact: 1200
  },
  penguin: {
    type: 'penguin',
    name: 'Wildlife Protection',
    icon: 'Bird',
    emoji: '🐧',
    color: 'text-slate-700',
    fact: 'Arctic and Antarctic wildlife like penguins, polar bears, and seals are climate indicators—their populations reflect ecosystem health. Emperor penguin colonies have declined 50% due to ice loss. Protecting polar wildlife preserves food chains that support 5,000+ species and carbon-storing ecosystems. Marine mammals maintain ocean health by cycling nutrients that feed CO2-absorbing phytoplankton. Wildlife corridors prevent 465 million tons of CO2 emissions by maintaining forest connectivity.',
    co2Impact: 900
  },
  aurora: {
    type: 'aurora',
    name: 'Clean Air',
    icon: 'Sparkle',
    emoji: '✨',
    color: 'text-violet-400',
    fact: 'Pristine Arctic air is threatened by pollution traveling from industrial regions 3,000+ miles away. Air pollution kills 7 million people yearly and accelerates ice melting by depositing dark particles that absorb heat. Keeping polar regions clean prevents accelerated warming and preserves natural climate regulation. Clean air initiatives globally prevent 2.4 million premature deaths yearly and avoid $5 trillion in health costs while reducing CO2 by 1.2 billion tons annually.',
    co2Impact: 1500
  },
  orchid: {
    type: 'orchid',
    name: 'Rare Plants',
    icon: 'FlowerLotus',
    emoji: '🌺',
    color: 'text-pink-500',
    fact: 'Rainforests contain 50% of Earth\'s plant species despite covering only 6% of land. A single hectare holds 750 tree species and 1,500 flowering plants—more biodiversity than all of North America. These plants store 250 billion tons of carbon and produce 20% of global oxygen. 80% of our food originated from rainforest plants. Losing one plant species can collapse entire ecosystems, releasing stored carbon and eliminating potential medicines that could cure diseases.',
    co2Impact: 2500
  },
  jaguar: {
    type: 'jaguar',
    name: 'Biodiversity',
    icon: 'Cat',
    emoji: '🐆',
    color: 'text-amber-600',
    fact: 'Apex predators like jaguars maintain ecosystem balance by controlling herbivore populations that would otherwise overgraze and destroy carbon-storing forests. One rainforest acre supports 1,500 species, creating Earth\'s richest carbon-capturing system. Jaguars need 25-38 square miles of habitat, so protecting them safeguards millions of acres storing 200+ tons of carbon per acre. Rainforest biodiversity provides $125 billion in ecosystem services yearly including climate regulation, water purification, and crop pollination.',
    co2Impact: 1800
  },
  medicinal: {
    type: 'medicinal',
    name: 'Medicinal Plants',
    icon: 'Leaf',
    emoji: '🍃',
    color: 'text-emerald-600',
    fact: '70% of cancer-fighting drugs come from rainforest plants, yet we\'ve studied less than 1% of tropical species for medicinal properties. Rainforest medicines treat diabetes, heart disease, arthritis, and cancer, saving millions of lives. Preserving these ecosystems protects both human health and planetary climate—rainforests store 150 billion tons of carbon. We\'re losing potential cures for Alzheimer\'s, HIV, and other diseases at a rate of 137 species per day. Traditional Indigenous knowledge of 80,000+ medicinal plants is invaluable for climate adaptation.',
    co2Impact: 2200
  },
  supernova: {
    type: 'supernova',
    name: 'Solar Supernova',
    icon: 'SunHorizon',
    emoji: '☀️',
    color: 'text-yellow-400',
    fact: 'A supernova of renewable energy! This mega power-up represents the explosive potential of solar technology. Recent breakthroughs in perovskite solar cells achieve 33% efficiency (vs 20% traditional), and space-based solar could beam unlimited clean energy to Earth. This clears all adjacent tiles and delivers 10,000 kg of CO2 reduction—equivalent to 208 trees or removing 2 cars from roads for a year. Solar megaprojects are now cheaper than coal in 91% of the world.',
    co2Impact: 10000
  },
  tsunami: {
    type: 'tsunami',
    name: 'Ocean Wave',
    icon: 'Waves',
    emoji: '🌊',
    color: 'text-blue-500',
    fact: 'Ride the wave of change! This powerful tsunami represents the ocean\'s role as Earth\'s climate regulator and largest carbon sink. Oceans have absorbed 93% of excess heat from climate change, preventing catastrophic land temperature rises. This power clears an entire row/column and delivers 8,500 kg of CO2 reduction. Tidal and wave energy could provide 10% of global electricity needs. Protecting blue carbon ecosystems (mangroves, seagrass, salt marshes) stores carbon 40x faster than forests.',
    co2Impact: 8500
  },
  earthquake: {
    type: 'earthquake',
    name: 'Tectonic Shift',
    icon: 'Mountains',
    emoji: '🏔️',
    color: 'text-amber-700',
    fact: 'Shake up the status quo! This geological power represents transformative climate action—fundamental shifts in how we live. Natural rock weathering absorbs 0.3 billion tons of CO2 yearly; enhanced weathering could capture 2+ billion tons. This reshuffles the board strategically while planting 7,000 kg worth of carbon-capturing trees—equivalent to reforesting 0.5 acres. Mountains store 60% of Earth\'s freshwater and mountain ecosystems provide resources for 1.1 billion people while storing massive carbon reserves.',
    co2Impact: 7000
  },
  meteor: {
    type: 'meteor',
    name: 'Asteroid Impact',
    icon: 'Comet',
    emoji: '☄️',
    color: 'text-purple-600',
    fact: 'Impact for good! This cosmic power represents breakthrough climate technologies that change everything at once. Just as asteroids shaped Earth\'s evolution, climate innovation reshapes our future. This clears all tiles of one type and captures 9,500 kg of CO2—like removing 2,375 incandescent bulbs or planting 198 trees. Revolutionary carbon capture technologies now extract CO2 at $100/ton and falling. Space mining could provide resources without Earth extraction, eliminating mining emissions entirely.',
    co2Impact: 9500
  },
  phoenix: {
    type: 'phoenix',
    name: 'Phoenix Rebirth',
    icon: 'FireSimple',
    emoji: '🔥',
    color: 'text-orange-500',
    fact: 'Rise from the ashes! The phoenix symbolizes Earth\'s incredible resilience and ability to regenerate when given the chance. After the 1991 Mt. Pinatubo eruption cooled Earth by 0.5°C, ecosystems recovered. This transforms the entire board for optimal matches while offsetting 12,000 kg of CO2—equivalent to 250 trees or taking 3 cars off roads for a year. Nature-based solutions can provide 37% of climate mitigation needed by 2030. Regenerative agriculture can turn farms from carbon sources to carbon sinks.',
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
