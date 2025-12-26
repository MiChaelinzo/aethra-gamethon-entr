import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { X, TrendUp, MapPin, Fire, Globe } from '@phosphor-icons/react'
import { CollisionStatistics, BiomeCollisionStats, CollisionZoneData } from '@/lib/types'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'

interface CollisionStatisticsPanelProps {
  isOpen: boolean
  onClose: () => void
  statistics: CollisionStatistics
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

export function CollisionStatisticsPanel({ isOpen, onClose, statistics }: CollisionStatisticsPanelProps) {
  const maxBiomeActivations = Math.max(...statistics.biomeStats.map(b => b.totalActivations), 1)
  
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <TrendUp size={24} className="text-primary" weight="bold" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Activations</p>
                          <p className="text-3xl font-bold">{statistics.totalZonesActivated.toLocaleString()}</p>
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
                          <p className="text-3xl font-bold">{statistics.uniqueZones.toLocaleString()}</p>
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
                          <p className="text-3xl font-bold">{statistics.biomeStats.length}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Biome Overview</TabsTrigger>
                      <TabsTrigger value="hottest">Hottest Zones</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed Stats</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Globe size={20} weight="fill" />
                        Collision Activity by Biome
                      </h3>
                      {statistics.biomeStats.length > 0 ? (
                        statistics.biomeStats
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
                          <p className="text-muted-foreground">No collision data yet. Start playing to generate statistics!</p>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="hottest" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Fire size={20} weight="fill" className="text-orange-500" />
                        Global Hottest Zones
                      </h3>
                      {statistics.globalHottestZones.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {statistics.globalHottestZones.map((zone, index) => (
                            <HotZoneCard key={`${zone.biome}-${zone.row}-${zone.col}`} zone={zone} rank={index + 1} />
                          ))}
                        </div>
                      ) : (
                        <Card className="p-8 text-center">
                          <p className="text-muted-foreground">No hot zones detected yet. Create more collisions!</p>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="detailed" className="space-y-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3">Detailed Biome Breakdown</h3>
                      {statistics.biomeStats.length > 0 ? (
                        statistics.biomeStats
                          .sort((a, b) => b.totalActivations - a.totalActivations)
                          .map((biomeStats) => (
                            <DetailedBiomeCard key={biomeStats.biome} biomeStats={biomeStats} />
                          ))
                      ) : (
                        <Card className="p-8 text-center">
                          <p className="text-muted-foreground">Play more levels to unlock detailed statistics!</p>
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

function DetailedBiomeCard({ biomeStats }: { biomeStats: BiomeCollisionStats }) {
  const biomeName = biomeStats.biome.charAt(0).toUpperCase() + biomeStats.biome.slice(1)
  const biomeColor = BIOME_COLORS[biomeStats.biome] || 'from-gray-500 to-gray-600'
  const biomeIcon = BIOME_ICONS[biomeStats.biome] || '🌍'

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`text-3xl bg-gradient-to-br ${biomeColor} p-3 rounded-xl shadow-lg`}>
          {biomeIcon}
        </div>
        <div>
          <h4 className="text-xl font-bold">{biomeName} Biome</h4>
          <p className="text-sm text-muted-foreground">
            {biomeStats.totalActivations.toLocaleString()} total activations across {biomeStats.hottestZones.length} zones
          </p>
        </div>
      </div>

      {biomeStats.hottestZones.length > 0 ? (
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-muted-foreground mb-2">Top Hot Zones:</h5>
          {biomeStats.hottestZones.slice(0, 5).map((zone, index) => (
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
        <p className="text-sm text-muted-foreground text-center py-4">No collision zones recorded yet</p>
      )}
    </Card>
  )
}
