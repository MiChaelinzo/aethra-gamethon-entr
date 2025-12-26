import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { TimeBasedStatistics } from '@/lib/types'
import { Clock, CalendarBlank, TrendUp, ChartBar, Flame } from '@phosphor-icons/react'

interface TimeBasedAnalyticsProps {
  statistics: TimeBasedStatistics
  selectedBiome?: string
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12
  const period = i < 12 ? 'AM' : 'PM'
  return `${hour}${period}`
})

export function TimeBasedAnalytics({ statistics, selectedBiome }: TimeBasedAnalyticsProps) {
  const filterBiomeData = (biomes: Record<string, number>) => {
    if (!selectedBiome) return biomes
    return Object.keys(biomes)
      .filter(biome => biome === selectedBiome)
      .reduce((acc, biome) => ({ ...acc, [biome]: biomes[biome] }), {})
  }
  
  const filteredHourlyStats = statistics.hourlyStats.map(hourStat => ({
    ...hourStat,
    biomes: filterBiomeData(hourStat.biomes),
    collisions: selectedBiome 
      ? (hourStat.biomes[selectedBiome] || 0)
      : hourStat.collisions
  }))
  
  const filteredDailyStats = statistics.dailyStats.map(dayStat => ({
    ...dayStat,
    biomes: filterBiomeData(dayStat.biomes),
    collisions: selectedBiome 
      ? (dayStat.biomes[selectedBiome] || 0)
      : dayStat.collisions
  }))
  
  const maxHourlyCollisions = Math.max(...filteredHourlyStats.map(h => h.collisions), 1)
  const maxDailyCollisions = Math.max(...filteredDailyStats.map(d => d.collisions), 1)
  
  const peakHour = filteredHourlyStats.reduce((max, curr) => 
    curr.collisions > max.collisions ? curr : max, filteredHourlyStats[0])
  
  const peakDay = filteredDailyStats.reduce((max, curr) => 
    curr.collisions > max.collisions ? curr : max, filteredDailyStats[0])
  
  const totalCollisions = filteredHourlyStats.reduce((sum, h) => sum + h.collisions, 0)

  const getBiomeColor = (biome: string): string => {
    const colors: Record<string, string> = {
      forest: '#10b981',
      ocean: '#3b82f6',
      desert: '#f59e0b',
      tundra: '#06b6d4',
      rainforest: '#84cc16',
      menu: '#8b5cf6'
    }
    return colors[biome] || '#6b7280'
  }

  return (
    <div className="space-y-6">
      {selectedBiome && (
        <Card className="p-4 bg-gradient-to-br from-accent/20 to-primary/10 border-accent/30">
          <p className="text-sm text-muted-foreground">
            Showing time trends for: <span className="font-bold text-foreground capitalize">{selectedBiome}</span>
          </p>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Flame size={24} weight="fill" className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak Hour</p>
              <p className="text-2xl font-bold">{HOUR_LABELS[peakHour.hour]}</p>
              <p className="text-xs text-muted-foreground">{peakHour.collisions} collisions</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <CalendarBlank size={24} weight="fill" className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak Day</p>
              <p className="text-2xl font-bold">{peakDay.dayName}</p>
              <p className="text-xs text-muted-foreground">{peakDay.collisions} collisions</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <TrendUp size={24} weight="fill" className="text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Collisions</p>
              <p className="text-2xl font-bold">{totalCollisions.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {selectedBiome ? `${selectedBiome} only` : 'All biomes'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={24} weight="fill" className="text-primary" />
          <h3 className="text-xl font-bold">Hourly Activity</h3>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground mb-2">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="text-center">
                {i * 2}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-24 gap-1">
            {filteredHourlyStats.map((hourStat) => {
              const height = (hourStat.collisions / maxHourlyCollisions) * 100
              const isPeak = hourStat.hour === peakHour.hour
              const topBiome = Object.entries(hourStat.biomes).sort(([, a], [, b]) => (b as number) - (a as number))[0]
              const biomeColor = topBiome ? getBiomeColor(topBiome[0]) : '#6b7280'

              return (
                <motion.div
                  key={hourStat.hour}
                  className="relative group"
                  initial={{ height: 0 }}
                  animate={{ height: 120 }}
                  transition={{ delay: hourStat.hour * 0.02 }}
                >
                  <div className="h-full flex flex-col justify-end">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: hourStat.hour * 0.02 + 0.2 }}
                      className={`rounded-t transition-all duration-200 ${
                        isPeak ? 'ring-2 ring-primary' : ''
                      }`}
                      style={{
                        height: `${height}%`,
                        backgroundColor: biomeColor,
                        minHeight: hourStat.collisions > 0 ? '4px' : '0px'
                      }}
                    />
                  </div>
                  
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <div className="bg-card border shadow-lg rounded-lg p-3 text-xs whitespace-nowrap min-w-[140px]">
                      <p className="font-bold mb-1">{HOUR_LABELS[hourStat.hour]}</p>
                      <p className="text-muted-foreground mb-2">
                        {hourStat.collisions} collision{hourStat.collisions !== 1 ? 's' : ''}
                      </p>
                      {isPeak && (
                        <p className="text-primary font-semibold mb-1">🔥 Peak Hour</p>
                      )}
                      <p className="text-muted-foreground">
                        Avg ×{hourStat.averageMultiplier.toFixed(1)}
                      </p>
                      {Object.keys(hourStat.biomes).length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="font-semibold mb-1">Biomes:</p>
                          {Object.entries(hourStat.biomes)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 3)
                            .map(([biome, count]) => (
                              <p key={biome} className="flex items-center gap-1">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getBiomeColor(biome) }}
                                />
                                <span className="capitalize">{biome}: {count as number}</span>
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getBiomeColor('forest') }} />
              <span>Forest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getBiomeColor('ocean') }} />
              <span>Ocean</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getBiomeColor('desert') }} />
              <span>Desert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getBiomeColor('tundra') }} />
              <span>Tundra</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: getBiomeColor('rainforest') }} />
              <span>Rainforest</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <CalendarBlank size={24} weight="fill" className="text-secondary" />
          <h3 className="text-xl font-bold">Weekly Activity</h3>
        </div>
        
        <div className="space-y-4">
          {filteredDailyStats.map((dayStat) => {
            const width = (dayStat.collisions / maxDailyCollisions) * 100
            const isPeak = dayStat.dayOfWeek === peakDay.dayOfWeek
            const topBiome = Object.entries(dayStat.biomes).sort(([, a], [, b]) => (b as number) - (a as number))[0]
            const biomeColor = topBiome ? getBiomeColor(topBiome[0]) : '#6b7280'

            return (
              <motion.div
                key={dayStat.dayOfWeek}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dayStat.dayOfWeek * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-semibold w-24 ${isPeak ? 'text-primary' : ''}`}>
                    {dayStat.dayName}
                    {isPeak && ' 🔥'}
                  </span>
                  <span className="text-muted-foreground">
                    {dayStat.collisions} collision{dayStat.collisions !== 1 ? 's' : ''}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ×{dayStat.averageMultiplier.toFixed(1)} avg
                  </span>
                </div>
                
                <div className="relative h-8 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ delay: dayStat.dayOfWeek * 0.1 + 0.2, duration: 0.5 }}
                    className={`h-full rounded-full ${isPeak ? 'ring-2 ring-primary' : ''}`}
                    style={{ backgroundColor: biomeColor }}
                  />
                  
                  {Object.entries(dayStat.biomes).length > 0 && (
                    <div className="absolute inset-0 flex items-center px-3 gap-2">
                      {Object.entries(dayStat.biomes)
                        .sort(([, a], [, b]) => (b as number) - (a as number))
                        .slice(0, 5)
                        .map(([biome, count]) => (
                          <div
                            key={biome}
                            className="flex items-center gap-1 text-xs bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white"
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getBiomeColor(biome) }}
                            />
                            <span className="capitalize">{biome}</span>
                            <span className="font-semibold">{count as number}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChartBar size={24} weight="fill" className="text-accent-foreground" />
          <h3 className="text-xl font-bold">Activity Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Most Active Time Range</p>
            <p className="text-lg font-bold">
              {HOUR_LABELS[peakHour.hour]} - {HOUR_LABELS[(peakHour.hour + 1) % 24]}
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Average Collisions</p>
            <p className="text-lg font-bold">
              {(totalCollisions / Math.max(filteredDailyStats.filter(d => d.collisions > 0).length, 1)).toFixed(1)} per day
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Busiest Day</p>
            <p className="text-lg font-bold">
              {peakDay.dayName}s
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Sessions Tracked</p>
            <p className="text-lg font-bold">
              {totalCollisions.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
