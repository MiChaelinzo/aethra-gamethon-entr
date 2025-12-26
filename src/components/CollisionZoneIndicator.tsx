import { motion, AnimatePresence } from 'framer-motion'

interface CollisionZone {
  id: string
  gridX: number
  gridY: number
  intensity: number
  timestamp: number
}

interface CollisionZoneIndicatorProps {
  zones: CollisionZone[]
  gridSize: number
  cellSize: number
}

export function CollisionZoneIndicator({ zones, gridSize, cellSize }: CollisionZoneIndicatorProps) {
  const hasHighIntensityZones = zones.some(z => z.intensity >= 5)

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hasHighIntensityZones && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-pink-500/5 to-transparent rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                '0 0 0px rgba(236, 72, 153, 0)',
                '0 0 80px rgba(236, 72, 153, 0.3)',
                '0 0 0px rgba(236, 72, 153, 0)',
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {zones.map((zone) => {
          const left = (zone.gridX / gridSize) * 100
          const top = (zone.gridY / gridSize) * 100
          const size = (cellSize / gridSize) * 100
          
          const getColorByIntensity = (intensity: number) => {
            if (intensity >= 5) return 'from-purple-500/60 via-pink-500/60 to-red-500/60'
            if (intensity >= 3) return 'from-orange-500/50 via-yellow-500/50 to-red-500/50'
            if (intensity >= 2) return 'from-blue-500/40 via-cyan-500/40 to-teal-500/40'
            return 'from-green-500/30 via-emerald-500/30 to-lime-500/30'
          }

          const getBorderColor = (intensity: number) => {
            if (intensity >= 5) return '#ec4899'
            if (intensity >= 3) return '#f59e0b'
            if (intensity >= 2) return '#06b6d4'
            return '#14b8a6'
          }

          const getSecondaryColor = (intensity: number) => {
            if (intensity >= 5) return '#8b5cf6'
            if (intensity >= 3) return '#ef4444'
            if (intensity >= 2) return '#3b82f6'
            return '#10b981'
          }

          return (
            <motion.div
              key={zone.id}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}%`,
                height: `${size}%`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`w-full h-full rounded-lg bg-gradient-to-br ${getColorByIntensity(zone.intensity)} shadow-lg`}>
                <motion.div
                  className="w-full h-full rounded-lg border-4"
                  style={{
                    borderColor: getBorderColor(zone.intensity)
                  }}
                  animate={{
                    borderColor: [
                      getBorderColor(zone.intensity),
                      getSecondaryColor(zone.intensity),
                      getBorderColor(zone.intensity),
                    ],
                    boxShadow: [
                      `0 0 20px ${getBorderColor(zone.intensity)}`,
                      `0 0 40px ${getSecondaryColor(zone.intensity)}`,
                      `0 0 20px ${getBorderColor(zone.intensity)}`,
                    ]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{
                    background: `radial-gradient(circle, ${
                      zone.intensity >= 5 ? 'rgba(236, 72, 153, 0.4)' : 
                      zone.intensity >= 3 ? 'rgba(245, 158, 11, 0.4)' :
                      zone.intensity >= 2 ? 'rgba(6, 182, 212, 0.4)' :
                      'rgba(20, 184, 166, 0.4)'
                    } 0%, transparent 70%)`
                  }}
                />

                {zone.intensity >= 2 && (
                  <>
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: [0.8, 1.5],
                        opacity: [0.8, 0],
                        rotate: [0, zone.intensity >= 5 ? 360 : 180]
                      }}
                      transition={{
                        duration: zone.intensity >= 5 ? 0.5 : 0.6,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      style={{
                        background: zone.intensity >= 5 
                          ? `conic-gradient(from 0deg, transparent, ${getBorderColor(zone.intensity)}, ${getSecondaryColor(zone.intensity)}, transparent)`
                          : `conic-gradient(from 0deg, transparent, ${getBorderColor(zone.intensity)}, transparent)`,
                        borderRadius: '50%'
                      }}
                    />
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-white font-bold"
                      style={{ 
                        fontSize: zone.intensity >= 5 ? '2rem' : '1.5rem',
                        textShadow: '0 0 10px rgba(0,0,0,0.5)'
                      }}
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [1, 0.7, 1],
                        rotate: zone.intensity >= 5 ? [0, 360] : 0
                      }}
                      transition={{
                        duration: zone.intensity >= 5 ? 1 : 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {zone.intensity >= 5 ? '⚡' : zone.intensity >= 3 ? '✨' : zone.intensity >= 2 ? '💥' : ''}
                    </motion.div>
                  </>
                )}

                {zone.intensity >= 5 && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(${i * 45}deg, transparent 40%, ${getBorderColor(zone.intensity)} 50%, transparent 60%)`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.075,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
