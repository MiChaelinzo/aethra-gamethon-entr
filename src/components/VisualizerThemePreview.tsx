import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { getVisualizerTheme, getThemeDescription } from '@/lib/visualizerThemes'
import { VisualizerStyle } from '@/lib/types'

interface VisualizerThemePreviewProps {
  biome: string
  style: VisualizerStyle
  biomeName: string
}

export function VisualizerThemePreview({ biome, style, biomeName }: VisualizerThemePreviewProps) {
  const theme = getVisualizerTheme(biome, style)
  const description = getThemeDescription(biome, style)

  const renderStylePreview = () => {
    switch (style) {
      case 'bars':
        return (
          <div className="flex items-end justify-center gap-1 h-24">
            {[0.3, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4].map((height, i) => (
              <motion.div
                key={i}
                className="w-4 rounded-t-full"
                style={{
                  background: `linear-gradient(to top, ${theme.gradient.start}, ${theme.gradient.middle}, ${theme.gradient.end})`,
                  boxShadow: `0 -2px 8px ${theme.glow}`,
                  height: `${height * 100}%`,
                }}
                animate={{
                  height: [`${height * 100}%`, `${Math.min(height * 120, 100)}%`, `${height * 100}%`],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )
      
      case 'waveform':
        return (
          <div className="relative h-24 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`preview-gradient-${biome}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={theme.gradient.start} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={theme.gradient.middle} stopOpacity="1" />
                  <stop offset="100%" stopColor={theme.gradient.end} stopOpacity="0.9" />
                </linearGradient>
              </defs>
              
              <motion.path
                d="M 0 50 Q 25 20, 50 40 T 100 50"
                fill={`url(#preview-gradient-${biome})`}
                opacity={0.6}
                animate={{
                  d: [
                    'M 0 50 Q 25 20, 50 40 T 100 50',
                    'M 0 50 Q 25 70, 50 60 T 100 50',
                    'M 0 50 Q 25 20, 50 40 T 100 50',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <motion.path
                d="M 0 50 Q 25 20, 50 40 T 100 50"
                fill="none"
                stroke={theme.accent}
                strokeWidth="2"
                opacity={0.8}
                animate={{
                  d: [
                    'M 0 50 Q 25 20, 50 40 T 100 50',
                    'M 0 50 Q 25 70, 50 60 T 100 50',
                    'M 0 50 Q 25 20, 50 40 T 100 50',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </div>
        )
      
      case 'circular':
        return (
          <div className="relative h-24 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${theme.gradient.end} 0%, ${theme.gradient.middle} 50%, transparent 100%)`,
                  boxShadow: `0 0 20px ${theme.glow}`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
                  const radius = 25
                  const barLength = 10 + (i % 3) * 5
                  const x1 = 50 + Math.cos(angle) * radius
                  const y1 = 50 + Math.sin(angle) * radius
                  const x2 = 50 + Math.cos(angle) * (radius + barLength)
                  const y2 = 50 + Math.sin(angle) * (radius + barLength)
                  const color = i % 3 === 0 ? theme.accent : i % 3 === 1 ? theme.primary : theme.secondary
                  
                  return (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 1 + i * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )
                })}
              </svg>
              
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${theme.gradient.middle}, ${theme.accent})`,
                  boxShadow: `0 0 15px ${theme.accent}`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        )
    }
  }

  const styleNames: Record<VisualizerStyle, string> = {
    bars: 'Bars',
    waveform: 'Waveform',
    circular: 'Circular'
  }

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">{biomeName}</h4>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {styleNames[style]}
          </span>
        </div>
        
        <div className="relative rounded-lg overflow-hidden bg-background/50">
          {renderStylePreview()}
        </div>
        
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          {description}
        </p>
        
        <div className="flex gap-2 items-center">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ 
              background: theme.primary,
              boxShadow: `0 0 8px ${theme.glow}`
            }}
          />
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ 
              background: theme.secondary,
              boxShadow: `0 0 8px ${theme.glow}`
            }}
          />
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ 
              background: theme.accent,
              boxShadow: `0 0 8px ${theme.glow}`
            }}
          />
          <span className="text-xs text-muted-foreground ml-auto">Theme Palette</span>
        </div>
      </div>
    </Card>
  )
}
