import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TileInfo } from '@/lib/types'
import { Tree, Wind, Recycle, Drop, Lightning } from '@phosphor-icons/react'

interface EducationalCardProps {
  isOpen: boolean
  onClose: () => void
  tileInfo: TileInfo
}

const iconMap = {
  Tree,
  Wind,
  Recycle,
  Drop,
  Lightning,
  SolarPanel: () => (
    <svg viewBox="0 0 256 256" className="w-full h-full">
      <rect width="256" height="256" fill="none"/>
      <path d="M32,104H56a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V96A8,8,0,0,0,32,104Z" fill="currentColor"/>
      <path d="M104,104h24a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8V96A8,8,0,0,0,104,104Z" fill="currentColor"/>
      <path d="M200,64H176a8,8,0,0,0-8,8V96a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V72A8,8,0,0,0,200,64Z" fill="currentColor"/>
      <path d="M56,120H32a8,8,0,0,0-8,8v24a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V128A8,8,0,0,0,56,120Z" fill="currentColor"/>
      <path d="M128,120H104a8,8,0,0,0-8,8v24a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V128A8,8,0,0,0,128,120Z" fill="currentColor"/>
      <path d="M200,120H176a8,8,0,0,0-8,8v24a8,8,0,0,0,8,8h24a8,8,0,0,0,8-8V128A8,8,0,0,0,200,120Z" fill="currentColor"/>
      <line x1="48" y1="160" x2="48" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
      <line x1="116" y1="160" x2="116" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
      <line x1="188" y1="160" x2="188" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
      <line x1="24" y1="208" x2="208" y2="208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none"/>
    </svg>
  )
}

export function EducationalCard({ isOpen, onClose, tileInfo }: EducationalCardProps) {
  const IconComponent = iconMap[tileInfo.icon as keyof typeof iconMap]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 ${tileInfo.color}`}>
              <IconComponent />
            </div>
            <DialogTitle className="text-2xl">{tileInfo.name}</DialogTitle>
          </div>
          <DialogDescription className="educational-text text-base leading-relaxed pt-2">
            {tileInfo.fact}
          </DialogDescription>
        </DialogHeader>
        <div className="bg-primary/10 rounded-lg p-4 mt-4">
          <div className="text-sm font-semibold text-muted-foreground mb-1">
            Impact per Unit
          </div>
          <div className="text-2xl font-bold text-primary">
            {tileInfo.co2Impact.toLocaleString()} lbs CO₂
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
