import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Sparkle } from '@phosphor-icons/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { TrailTheme, TileType } from '../lib/types'
import { TRAIL_THEMES, getAvailableThemes } from '../lib/trailThemes'
import { ThemeSwitchBurst } from './ThemeSwitchBurst'
import { toast } from 'sonner'

interface MouseTrailControlProps {
  isEnabled: boolean
  intensity: 'low' | 'medium' | 'high'
  theme: TrailTheme
  unlockedPowerUps: TileType[]
  onToggle: (enabled: boolean) => void
  onIntensityChange: (intensity: 'low' | 'medium' | 'high') => void
  onThemeChange: (theme: TrailTheme) => void
}

export function MouseTrailControl({ 
  isEnabled, 
  intensity,
  theme,
  unlockedPowerUps,
  onToggle,
  onIntensityChange,
  onThemeChange
}: MouseTrailControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)
  const [burstTheme, setBurstTheme] = useState<TrailTheme>(theme)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const availableThemes = getAvailableThemes(unlockedPowerUps)

  const handleThemeChange = (newTheme: TrailTheme) => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setBurstTrigger(prev => prev + 1)
      setBurstTheme(newTheme)
    }
    onThemeChange(newTheme)
    
    const themeConfig = TRAIL_THEMES[newTheme]
    toast.success(`${themeConfig.icon} Switched to ${themeConfig.name}!`, {
      duration: 2000
    })
  }

  return (
    <>
      <ThemeSwitchBurst 
        theme={burstTheme} 
        trigger={burstTrigger}
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant={isEnabled ? "default" : "outline"}
          size="icon"
          className="relative"
        >
          <Sparkle className={isEnabled ? "animate-pulse" : ""} weight={isEnabled ? "fill" : "regular"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Particle Trail</h4>
            <p className="text-xs text-muted-foreground">
              Add magical particle effects that follow your cursor
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="trail-enabled" className="text-sm">
              Enable Trail
            </Label>
            <Switch
              id="trail-enabled"
              checked={isEnabled}
              onCheckedChange={onToggle}
            />
          </div>

          {isEnabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="trail-intensity" className="text-sm">
                  Intensity
                </Label>
                <Select value={intensity} onValueChange={(value) => onIntensityChange(value as 'low' | 'medium' | 'high')}>
                  <SelectTrigger id="trail-intensity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Subtle)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="high">High (Maximum)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trail-theme" className="text-sm">
                  Theme {availableThemes.length > 1 && `(${availableThemes.length} unlocked)`}
                </Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="trail-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TRAIL_THEMES).map(t => (
                      <SelectItem 
                        key={t.id} 
                        value={t.id}
                        disabled={!availableThemes.includes(t.id)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{t.icon}</span>
                          <span>{t.name}</span>
                          {!availableThemes.includes(t.id) && <span className="text-xs">🔒</span>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {TRAIL_THEMES[theme].description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {TRAIL_THEMES[theme].colors.slice(0, 8).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border border-border"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}60`
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              <strong>Tip:</strong> {isEnabled ? 'Complete daily challenges to unlock new trail themes!' : 'Lower intensity improves performance on slower devices'}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </>
  )
}
