import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Sparkle, Lock, Check } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { TrailTheme, TileType } from '../lib/types'
import { TRAIL_THEMES, getAvailableThemes } from '../lib/trailThemes'
import { ParticleThemePreview } from './ParticleThemePreview'
import { cn } from '../lib/utils'

interface ParticleThemeSwitcherProps {
  currentTheme: TrailTheme
  unlockedPowerUps: TileType[]
  onThemeChange: (theme: TrailTheme) => void
  isTrailEnabled: boolean
  onToggleTrail: (enabled: boolean) => void
}

export function ParticleThemeSwitcher({ 
  currentTheme, 
  unlockedPowerUps,
  onThemeChange,
  isTrailEnabled,
  onToggleTrail
}: ParticleThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<TrailTheme | null>(null)
  const availableThemes = getAvailableThemes(unlockedPowerUps)

  const handleThemeSelect = (theme: TrailTheme) => {
    if (availableThemes.includes(theme)) {
      onThemeChange(theme)
      if (!isTrailEnabled) {
        onToggleTrail(true)
      }
    }
  }

  const isThemeLocked = (theme: TrailTheme) => !availableThemes.includes(theme)
  const themeConfig = TRAIL_THEMES[currentTheme]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 group relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: isTrailEnabled ? 360 : 0 }}
            transition={{ duration: 2, repeat: isTrailEnabled ? Infinity : 0, ease: "linear" }}
          >
            <Sparkle 
              weight={isTrailEnabled ? "fill" : "regular"} 
              className={cn(
                "transition-colors",
                isTrailEnabled && "text-yellow-500"
              )}
            />
          </motion.div>
          <span>Particle Themes</span>
          {availableThemes.length > 1 && (
            <Badge variant="secondary" className="ml-1 px-1.5 text-xs">
              {availableThemes.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkle weight="fill" className="text-yellow-500" />
            Particle Trail Themes
          </DialogTitle>
          <DialogDescription>
            Choose a particle theme to customize your cursor trail. Unlock more themes by completing daily challenges!
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {Object.values(TRAIL_THEMES).map((theme) => {
              const isLocked = isThemeLocked(theme.id)
              const isCurrent = currentTheme === theme.id
              const isHovered = previewTheme === theme.id

              return (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={cn(
                      "relative overflow-hidden transition-all duration-300 cursor-pointer group",
                      isCurrent && "ring-2 ring-primary shadow-lg",
                      isLocked && "opacity-60",
                      !isLocked && "hover:shadow-xl hover:scale-[1.02]"
                    )}
                    onMouseEnter={() => !isLocked && setPreviewTheme(theme.id)}
                    onMouseLeave={() => setPreviewTheme(null)}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    <AnimatePresence>
                      {(isCurrent || isHovered) && !isLocked && (
                        <motion.div
                          className="absolute inset-0 opacity-10"
                          style={{
                            background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[Math.floor(theme.colors.length / 2)]}, ${theme.colors[theme.colors.length - 1]})`
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.15 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl">{theme.icon}</span>
                            <div>
                              <h3 className="font-semibold text-lg flex items-center gap-2">
                                {theme.name}
                                {isCurrent && (
                                  <Badge variant="default" className="text-xs">
                                    <Check className="w-3 h-3 mr-1" />
                                    Active
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {theme.description}
                              </p>
                            </div>
                          </div>
                          
                          <ParticleThemePreview
                            theme={theme.id}
                            width={240}
                            height={100}
                            isActive={isHovered || isCurrent}
                          />
                        </div>
                        {isLocked && (
                          <div className="flex flex-col items-center gap-1">
                            <Lock className="w-5 h-5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Locked</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Color Palette</span>
                          {theme.specialEffect && (
                            <Badge variant="outline" className="text-xs">
                              {theme.specialEffect} effect
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {theme.colors.map((color, idx) => (
                            <motion.div
                              key={idx}
                              className="relative"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div
                                className="w-8 h-8 rounded-lg border-2 border-border"
                                style={{ 
                                  backgroundColor: color,
                                  boxShadow: isHovered ? `0 0 15px ${color}` : `0 0 8px ${color}60`
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <span>Shapes:</span>
                          <span className="font-medium">{theme.particleShapes.length}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>Glow:</span>
                          <span className="font-medium">{theme.glowIntensity}x</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>Speed:</span>
                          <span className="font-medium">{theme.particleSpeed.max}</span>
                        </div>
                      </div>

                      {isLocked && theme.requiredPowerUp && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            <strong>Unlock:</strong> Complete a daily challenge that rewards <strong>{theme.requiredPowerUp}</strong> power-up
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="border-t pt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {availableThemes.length} of {Object.keys(TRAIL_THEMES).length} themes unlocked
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onToggleTrail(!isTrailEnabled)}
            >
              {isTrailEnabled ? 'Disable' : 'Enable'} Trail
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
