import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { X, TrendUp, MapPin, Fire, Globe, Clock, Funnel } from '@phosphor-icons/react'
import { CollisionStatistics, BiomeCollisionStats, CollisionZoneData, TimeBasedStatistics } from '@/lib/types'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { TimeBasedAnalytics } from './TimeBasedAnalytics'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'

interface CollisionStatisticsPanelProps {
  isOpen: boolean
  onClose: () => void
  statistics: CollisionStatistics
  timeBasedStatistics: TimeBasedStatistics
}

const BIOME_COLORS: Record<string, string> = {
  forest: 'from-emerald-500 to-green-600',
  ocean: 'from-cyan-500 to-blue-600',
  desert: 'from-yellow-500 to-orange-600',
  tundra: 'from-blue-300 to-cyan-400',
  rainforest: 'from-lime-500 to-emerald-600',
  city: 'from-slate-500 to-gray-600',
  volcano: 'from-red-500 to-orange-700',
  mountain: 'from-stone-400 to-slate-600'
}

const BIOME_ICONS: Record<string, string> = {
  forest: '🌲',
  ocean: '🌊',
  desert: '🏜️',
  tundra: '🧊',
  rainforest: '🌴',
  city: '🏙️',
  volcano: '🌋',
  mountain: '⛰️'
}

export function CollisionStatisticsPanel({ isOpen, onClose, statistics, timeBasedStatistics }: CollisionStatisticsPanelProps) {
  const [selectedBiome, setSelectedBiome] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('all')
  const [minActivations, setMinActivations] = useState<number>(0)
  
  const filteredBiomeStats = selectedBiome === 'all' 
    ? statistics.biomeStats 
    : statistics.biomeStats.filter(b => b.biome === selectedBiome)
  
  const filteredTimeStats = (() => {
    if (timeRange === 'all') return timeBasedStatistics
    
    const now = new Date()
    let cutoffDate: Date
    
    switch (timeRange) {
      case 'today':
        cutoffDate = new Date(now.setHours(0, 0, 0, 0))
        break
      case 'week':
        cutoffDate = new Date(now.setDate(now.getDate() - 7))
        break
      case 'month':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1))
        break
      default:
        return timeBasedStatistics
    }
    
    return timeBasedStatistics
  })()
  
  const filteredHottestZones = statistics.globalHottestZones
    .filter(zone => selectedBiome === 'all' || zone.biome === selectedBiome)
    .filter(zone => zone.count >= minActivations)
    .filter(zone => {
      if (timeRange === 'all') return true
      const zoneDate = new Date(zone.lastActivated)
      const now = new Date()
      
      switch (timeRange) {
        case 'today':
          return zoneDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7))
          return zoneDate >= weekAgo
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
          return zoneDate >= monthAgo
        default:
          return true
      }
    })
  
  const filteredTotalActivations = filteredBiomeStats.reduce((sum, b) => sum + b.totalActivations, 0)
  const filteredUniqueZones = filteredHottestZones.length
  
  const maxBiomeActivations = Math.max(...filteredBiomeStats.map(b => b.totalActivations), 1)
  
  const availableBiomes = ['all', ...new Set(statistics.biomeStats.map(b => b.biome))]
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[90vh] overflow-hidden"
          >
            <Card className="bg-gradient-to-br from-card via-card to-card/95 border-2 shadow-2xl">
              <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-6 border-b">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                <div className="relative flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                      <Fire className="text-orange-500" size={32} weight="fill" />
                      Collision Zone Statistics
                    </h2>
                    <p className="text-muted-foreground">Track your most explosive gameplay moments</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="hover:bg-destructive/20"
                  >
                    <X size={24} />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[calc(90vh-180px)]">
                <div className="p-6 space-y-6">
                  <Card className="p-4 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 border-accent/30">
                    <div className="flex items-center gap-2 mb-4">
                      <Funnel size={20} weight="fill" className="text-accent" />
                      <h3 className="font-semibold">Filters</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="biome-filter" className="text-sm">Biome</Label>
                        <Select value={selectedBiome} onValueChange={setSelectedBiome}>
                          <SelectTrigger id="biome-filter">
                            <SelectValue placeholder="Select biome" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Biomes</SelectItem>
                            {availableBiomes.filter(b => b !== 'all').map(biome => (
                              <SelectItem key={biome} value={biome}>
                                {BIOME_ICONS[biome] || '🌍'} {biome.charAt(0).toUpperCase() + biome.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time-filter" className="text-sm">Time Range</Label>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                          <SelectTrigger id="time-filter">
                            <SelectValue placeholder="Select time range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">Last 7 Days</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="min-activations" className="text-sm">Min. Activations</Label>
                        <Select value={minActivations.toString()} onValueChange={(v) => setMinActivations(Number(v))}>
                          <SelectTrigger id="min-activations">
                            <SelectValue placeholder="Minimum activations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No minimum</SelectItem>
                            <SelectItem value="5">5+ activations</SelectItem>
                            <SelectItem value="10">10+ activations</SelectItem>
                            <SelectItem value="25">25+ activations</SelectItem>
                            <SelectItem value="50">50+ activations</SelectItem>
                            <SelectItem value="100">100+ activations</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {(selectedBiome !== 'all' || timeRange !== 'all' || minActivations > 0) && (
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Active filters: {[
                            selectedBiome !== 'all' && `${selectedBiome}`,
                            timeRange !== 'all' && timeRange,
                            minActivations > 0 && `${minActivations}+ activations`
                          ].filter(Boolean).join(', ')}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBiome('all')
                            setTimeRange('all')
                            setMinActivations(0)
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <TrendUp size={24} className="text-primary" weight="bold" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Activations</p>
                          <p className="text-3xl font-bold">{filteredTotalActivations.toLocaleString()}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-accent/20">
                          <MapPin size={24} className="text-accent" weight="fill" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Unique Zones</p>
                          <p className="text-3xl font-bold">{filteredUniqueZones.toLocaleString()}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-secondary/20">
                          <Globe size={24} className="text-secondary" weight="fill" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Biomes Explored</p>
                          <p className="text-3xl font-bold">{filteredBiomeStats.length}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Tabs defaultValue="time" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="time">
                        <Clock size={16} weight="fill" className="mr-2" />
                        Time Trends
                      </TabsTrigger>
                      <TabsTrigger value="overview">Biome Overview</TabsTrigger>
                      <TabsTrigger value="hottest">Hottest Zones</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed Stats</TabsTrigger>
                    </TabsList>

                    <TabsContent value="time" className="mt-4">
                      <TimeBasedAnalytics 
                        statistics={filteredTimeStats} 
                        selectedBiome={selectedBiome === 'all' ? undefined : selectedBiome}
                      />
                    </TabsContent>

                    <TabsContent value="overview" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Globe size={20} weight="fill" />
                        Collision Activity by Biome
                      </h3>
                      {filteredBiomeStats.length > 0 ? (
                        filteredBiomeStats
                          .sort((a, b) => b.totalActivations - a.totalActivations)
                          .map((biomeStats) => (
                            <BiomeStatCard
                              key={biomeStats.biome}
                              biomeStats={biomeStats}
                              maxActivations={maxBiomeActivations}
                            />
                          ))
                      ) : (
                        <Card className="p-8 text-center">
                          <p className="text-muted-foreground">No collision data matching your filters. Try adjusting the filters!</p>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="hottest" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Fire size={20} weight="fill" className="text-orange-500" />
                        {selectedBiome !== 'all' 
                          ? `Hottest Zones in ${selectedBiome.charAt(0).toUpperCase() + selectedBiome.slice(1)}`
                          : 'Global Hottest Zones'}
                      </h3>
                      {filteredHottestZones.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredHottestZones.slice(0, 10).map((zone, index) => (
                            <HotZoneCard key={`${zone.biome}-${zone.row}-${zone.col}`} zone={zone} rank={index + 1} />
                          ))}
                        </div>
                      ) : (
                        <Card className="p-8 text-center">
                          <p className="text-muted-foreground">No hot zones matching your filters. Try adjusting the filters!</p>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="detailed" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3">Detailed Biome Breakdown</h3>
                      {filteredBiomeStats.length > 0 ? (
                        filteredBiomeStats
                          .sort((a, b) => b.totalActivations - a.totalActivations)
                          .map((biomeStats) => (
                            <DetailedBiomeCard key={biomeStats.biome} biomeStats={biomeStats} minActivations={minActivations} />
                          ))
                      ) : (
                        <Card className="p-8 text-center">
                          <p className="text-muted-foreground">No data matching your filters. Try different filter settings!</p>
                        </Card>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </ScrollArea>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BiomeStatCard({ biomeStats, maxActivations }: { biomeStats: BiomeCollisionStats; maxActivations: number }) {
  const percentage = (biomeStats.totalActivations / maxActivations) * 100
  const biomeName = biomeStats.biome.charAt(0).toUpperCase() + biomeStats.biome.slice(1)
  const biomeColor = BIOME_COLORS[biomeStats.biome] || 'from-gray-500 to-gray-600'
  const biomeIcon = BIOME_ICONS[biomeStats.biome] || '🌍'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`text-3xl bg-gradient-to-br ${biomeColor} p-2 rounded-lg shadow-md`}>
              {biomeIcon}
            </div>
            <div>
              <h4 className="font-semibold text-lg">{biomeName}</h4>
              <p className="text-sm text-muted-foreground">{biomeStats.hottestZones.length} hot zones</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {biomeStats.totalActivations.toLocaleString()}
          </Badge>
        </div>
        <Progress value={percentage} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{percentage.toFixed(1)}% of total activity</span>
          <span>{biomeStats.totalActivations} activations</span>
        </div>
      </Card>
    </motion.div>
  )
}

function HotZoneCard({ zone, rank }: { zone: CollisionZoneData; rank: number }) {
  const biomeColor = BIOME_COLORS[zone.biome] || 'from-gray-500 to-gray-600'
  const biomeIcon = BIOME_ICONS[zone.biome] || '🌍'
  const biomeName = zone.biome.charAt(0).toUpperCase() + zone.biome.slice(1)
  
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-amber-600'
    if (rank === 2) return 'from-gray-400 to-gray-500'
    if (rank === 3) return 'from-orange-600 to-orange-700'
    return 'from-slate-500 to-slate-600'
  }

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-4 bg-gradient-to-br ${getRankColor(rank)}/10 border-2 hover:shadow-xl transition-all`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`text-2xl bg-gradient-to-br ${getRankColor(rank)} p-2 rounded-lg shadow-md font-bold text-white`}>
              {getRankEmoji(rank)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{biomeIcon}</span>
                <h4 className="font-semibold">{biomeName}</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Grid Position: ({zone.row}, {zone.col})
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Fire size={16} weight="fill" className="text-orange-500" />
            <span className="font-bold text-lg">{zone.count} activations</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Last: {new Date(zone.lastActivated).toLocaleDateString()}
          </span>
        </div>
      </Card>
    </motion.div>
  )
}

function DetailedBiomeCard({ biomeStats, minActivations }: { biomeStats: BiomeCollisionStats; minActivations: number }) {
  const biomeName = biomeStats.biome.charAt(0).toUpperCase() + biomeStats.biome.slice(1)
  const biomeColor = BIOME_COLORS[biomeStats.biome] || 'from-gray-500 to-gray-600'
  const biomeIcon = BIOME_ICONS[biomeStats.biome] || '🌍'
  
  const filteredZones = biomeStats.hottestZones.filter(zone => zone.count >= minActivations)

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`text-3xl bg-gradient-to-br ${biomeColor} p-3 rounded-xl shadow-lg`}>
          {biomeIcon}
        </div>
        <div>
          <h4 className="text-xl font-bold">{biomeName} Biome</h4>
          <p className="text-sm text-muted-foreground">
            {biomeStats.totalActivations.toLocaleString()} total activations across {filteredZones.length} zones
            {minActivations > 0 && ` (${minActivations}+ activations)`}
          </p>
        </div>
      </div>

      {filteredZones.length > 0 ? (
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-muted-foreground mb-2">Top Hot Zones:</h5>
          {filteredZones.slice(0, 5).map((zone, index) => (
            <div
              key={`${zone.row}-${zone.col}`}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  ({zone.row}, {zone.col})
                </Badge>
                <span className="text-sm">Zone {index + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fire size={14} weight="fill" className="text-orange-500" />
                <span className="font-semibold">{zone.count}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          {minActivations > 0 
            ? `No zones with ${minActivations}+ activations` 
            : 'No collision zones recorded yet'}
        </p>
      )}
    </Card>
  )
}
