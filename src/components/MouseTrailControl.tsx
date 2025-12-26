import { useState } from 'react'
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

interface MouseTrailControlProps {
  isEnabled: boolean
  intensity: 'low' | 'medium' | 'high'
  onToggle: (enabled: boolean) => void
  onIntensityChange: (intensity: 'low' | 'medium' | 'high') => void
}

export function MouseTrailControl({ 
  isEnabled, 
  intensity,
  onToggle,
  onIntensityChange
}: MouseTrailControlProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isEnabled ? "default" : "outline"}
          size="icon"
          className="relative"
        >
          <Sparkle className={isEnabled ? "animate-pulse" : ""} weight={isEnabled ? "fill" : "regular"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
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
          )}

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              <strong>Tip:</strong> Lower intensity improves performance on slower devices
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
