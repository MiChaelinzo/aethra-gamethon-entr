import { useState } from 'react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { SpeakerHigh, SpeakerSlash, Waveform, Circle, ChartBar } from '@phosphor-icons/react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { setMusicVolume } from '@/lib/backgroundMusic'
import { VisualizerStyle } from '@/lib/types'

interface MusicControlProps {
  isPlaying: boolean
  onToggle: (playing: boolean) => void
  visualizerStyle: VisualizerStyle
  onStyleChange: (style: VisualizerStyle) => void
}

export function MusicControl({ isPlaying, onToggle, visualizerStyle, onStyleChange }: MusicControlProps) {
  const [volume, setVolume] = useState(100)

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0]
    setVolume(newVolume)
    setMusicVolume(newVolume / 100)
    
    if (newVolume === 0 && isPlaying) {
      onToggle(false)
    } else if (newVolume > 0 && !isPlaying) {
      onToggle(true)
    }
  }

  const handleToggle = () => {
    if (isPlaying) {
      onToggle(false)
    } else {
      if (volume === 0) {
        setVolume(100)
        setMusicVolume(1)
      }
      onToggle(true)
    }
  }

  const visualizerStyles: { value: VisualizerStyle; icon: any; label: string }[] = [
    { value: 'bars', icon: ChartBar, label: 'Bars' },
    { value: 'waveform', icon: Waveform, label: 'Waveform' },
    { value: 'circular', icon: Circle, label: 'Circular' },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
        >
          {isPlaying && volume > 0 ? (
            <SpeakerHigh className="h-5 w-5" />
          ) : (
            <SpeakerSlash className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Background Music</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Volume</label>
            <div className="flex items-center gap-3">
              <SpeakerSlash className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <SpeakerHigh className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-center text-muted-foreground">
              {volume}%
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Visualizer Style</label>
            <div className="grid grid-cols-3 gap-2">
              {visualizerStyles.map((style) => {
                const Icon = style.icon
                return (
                  <Button
                    key={style.value}
                    variant={visualizerStyle === style.value ? 'default' : 'outline'}
                    size="sm"
                    className="flex flex-col gap-1 h-auto py-2"
                    onClick={() => onStyleChange(style.value)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{style.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Music changes dynamically based on the level's biome theme
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
