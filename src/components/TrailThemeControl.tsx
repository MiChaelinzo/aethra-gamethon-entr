import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Sparkle, Check, LockKey } from '@phosphor-icons/react'
import { TrailTheme, TileType } from '../lib/types'
import { TRAIL_THEMES, getAvailableThemes } from '../lib/trailThemes'

interface TrailThemeControlProps {
  currentTheme: TrailTheme
  unlockedPowerUps: TileType[]
  onThemeChange: (theme: TrailTheme) => void
}

export function TrailThemeControl({
  currentTheme,
  unlockedPowerUps,
  onThemeChange
}: TrailThemeControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const availableThemes = getAvailableThemes(unlockedPowerUps)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Sparkle className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 z-50"
            >
              <Card className="w-96 max-h-[600px] overflow-y-auto shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkle className="h-5 w-5" />
                    Trail Themes
                  </CardTitle>
                  <CardDescription>
                    Customize your cursor trail. Unlock new themes by collecting power-ups!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.values(TRAIL_THEMES).map(theme => {
                    const isAvailable = availableThemes.includes(theme.id)
                    const isActive = currentTheme === theme.id

                    return (
                      <motion.button
                        key={theme.id}
                        whileHover={isAvailable ? { scale: 1.02 } : undefined}
                        whileTap={isAvailable ? { scale: 0.98 } : undefined}
                        onClick={() => {
                          if (isAvailable) {
                            onThemeChange(theme.id)
                            setIsOpen(false)
                          }
                        }}
                        disabled={!isAvailable}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isActive
                            ? 'border-primary bg-primary/10'
                            : isAvailable
                            ? 'border-border hover:border-primary/50 bg-card'
                            : 'border-border bg-muted/50 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl">{theme.icon}</span>
                              <h3 className="font-semibold text-sm">{theme.name}</h3>
                              {isActive && (
                                <Check className="h-4 w-4 text-primary ml-auto flex-shrink-0" />
                              )}
                              {!isAvailable && (
                                <LockKey className="h-4 w-4 text-muted-foreground ml-auto flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {theme.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {theme.colors.slice(0, 6).map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-4 h-4 rounded-full border border-border"
                                  style={{ 
                                    backgroundColor: color,
                                    boxShadow: `0 0 8px ${color}40`
                                  }}
                                />
                              ))}
                            </div>
                            {!isAvailable && theme.requiredPowerUp && (
                              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
                                🔒 Complete daily challenges to unlock power-ups
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
