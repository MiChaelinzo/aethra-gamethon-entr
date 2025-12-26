import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Thermometer, Eye, EyeSlash } from '@phosphor-icons/react'

interface HeatmapControlProps {
  isEnabled: boolean
  opacity: number
  decayRate: number
  onToggle: (enabled: boolean) => void
  onOpacityChange: (opacity: number) => void
  onDecayRateChange: (rate: number) => void
}

export function HeatmapControl({
  isEnabled,
  opacity,
  decayRate,
  onToggle,
  onOpacityChange,
  onDecayRateChange
}: HeatmapControlProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className={isEnabled ? 'bg-accent/20 border-accent' : ''}
        >
          {isEnabled ? (
            <Thermometer weight="fill" className="text-accent" />
          ) : (
            <Thermometer />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Collision Heatmap</h4>
            <p className="text-xs text-muted-foreground">
              Visualize the most active collision zones over time
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="heatmap-toggle" className="text-sm">
              Show Heatmap
            </Label>
            <Switch
              id="heatmap-toggle"
              checked={isEnabled}
              onCheckedChange={onToggle}
            />
          </div>

          {isEnabled && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="opacity-slider" className="text-sm">
                    Opacity
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(opacity * 100)}%
                  </span>
                </div>
                <Slider
                  id="opacity-slider"
                  value={[opacity]}
                  onValueChange={([value]) => onOpacityChange(value)}
                  min={0.1}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="decay-slider" className="text-sm">
                    Decay Speed
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {decayRate === 0.99 ? 'Slow' : decayRate === 0.95 ? 'Medium' : 'Fast'}
                  </span>
                </div>
                <Slider
                  id="decay-slider"
                  value={[decayRate]}
                  onValueChange={([value]) => onDecayRateChange(value)}
                  min={0.90}
                  max={0.99}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="border-t pt-3">
                <h5 className="text-xs font-semibold mb-2">Legend</h5>
                <div className="grid grid-cols-5 gap-1 text-[10px]">
                  <div className="space-y-1">
                    <div className="h-4 rounded bg-blue-500/30 border border-blue-500/50" />
                    <span className="block text-center text-muted-foreground">Low</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 rounded bg-green-500/40 border border-green-500/50" />
                    <span className="block text-center text-muted-foreground">Mid</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 rounded bg-yellow-500/50 border border-yellow-500/50" />
                    <span className="block text-center text-muted-foreground">High</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 rounded bg-orange-500/60 border border-orange-500/50" />
                    <span className="block text-center text-muted-foreground">Hot</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 rounded bg-red-500/70 border border-red-500/50" />
                    <span className="block text-center text-muted-foreground">Max</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
