import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { VisualizerThemePreview } from './VisualizerThemePreview'
import { VisualizerStyle } from '@/lib/types'

interface VisualizerThemeShowcaseProps {
  isOpen: boolean
  onClose: () => void
}

const biomes = [
  { id: 'forest', name: 'Forest', description: 'Lush green ecosystems' },
  { id: 'ocean', name: 'Ocean', description: 'Deep blue marine worlds' },
  { id: 'desert', name: 'Desert', description: 'Warm arid landscapes' },
  { id: 'city', name: 'City', description: 'Urban neon environments' },
  { id: 'tundra', name: 'Tundra', description: 'Frozen polar regions' },
  { id: 'rainforest', name: 'Rainforest', description: 'Tropical dense jungles' },
  { id: 'menu', name: 'Menu', description: 'Neutral balanced tones' }
]

const visualizerStyles: VisualizerStyle[] = ['bars', 'waveform', 'circular']

export function VisualizerThemeShowcase({ isOpen, onClose }: VisualizerThemeShowcaseProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">🎨 Visualizer Theme Gallery</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Each biome features unique color palettes across all visualizer styles
          </p>
        </DialogHeader>
        
        <Tabs defaultValue="bars" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bars">Bars Style</TabsTrigger>
            <TabsTrigger value="waveform">Waveform Style</TabsTrigger>
            <TabsTrigger value="circular">Circular Style</TabsTrigger>
          </TabsList>
          
          {visualizerStyles.map((style) => (
            <TabsContent key={style} value={style} className="mt-4">
              <ScrollArea className="h-[60vh] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {biomes.map((biome) => (
                    <VisualizerThemePreview
                      key={`${biome.id}-${style}`}
                      biome={biome.id}
                      style={style}
                      biomeName={biome.name}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="border-t pt-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Theme Features:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• <strong>Bars:</strong> Rising columns with gradient fills and particle effects</li>
              <li>• <strong>Waveform:</strong> Flowing waves with dynamic stroke animations and glow filters</li>
              <li>• <strong>Circular:</strong> Radial bars with rotating rings and pulsing center</li>
              <li>• <strong>Biome-Specific:</strong> Each biome has carefully crafted color palettes that match its atmosphere</li>
              <li>• <strong>Audio-Reactive:</strong> All visualizers respond in real-time to music frequency data</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
