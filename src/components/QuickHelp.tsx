import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Question, Target, Shuffle as ShuffleIcon, Flame, Trophy, Lightbulb } from '@phosphor-icons/react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'

interface QuickHelpProps {
  onOpenFullTutorial: () => void
}

export function QuickHelp({ onOpenFullTutorial }: QuickHelpProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="bg-card/80 backdrop-blur-sm hover:bg-card"
        title="How to Play"
      >
        <Question size={20} weight="fill" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Lightbulb size={28} weight="fill" className="text-yellow-500" />
              Quick Help Guide
            </DialogTitle>
            <DialogDescription>
              Everything you need to know to master EcoRise
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <Card className="p-4 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target size={24} weight="fill" className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <strong>Click a tile</strong>, then <strong>click an adjacent tile</strong> to swap them</li>
                    <li>• Adjacent means <strong>next to each other horizontally or vertically</strong></li>
                    <li>• Diagonal tiles <strong>cannot</strong> be swapped</li>
                    <li>• Tiles must form a <strong>match of 3 or more</strong> to clear</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-accent/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Flame size={24} weight="fill" className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Why Won't My Tiles Swap?</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• The tiles must be <strong>adjacent</strong> (next to each other)</li>
                    <li>• The swap must create a <strong>match of 3+</strong> tiles</li>
                    <li>• If no match is created, the swap is <strong>invalid</strong></li>
                    <li>• Look for tiles that will match <strong>before</strong> you swap</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-secondary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <ShuffleIcon size={24} weight="bold" className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">No Valid Moves?</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Click the <strong>Shuffle button</strong> (top-right) to rearrange tiles</li>
                    <li>• The game will <strong>auto-shuffle</strong> if no moves are detected</li>
                    <li>• Take time to <strong>scan the board</strong> for matches</li>
                    <li>• Look for tiles that form <strong>L-shapes or T-shapes</strong></li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-purple-500/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Trophy size={24} weight="fill" className="text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pro Tips</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Match <strong>4+ tiles</strong> for bigger combo bonuses</li>
                    <li>• Chain reactions give <strong>combo multipliers</strong></li>
                    <li>• Complete <strong>daily challenges</strong> to unlock power-ups</li>
                    <li>• Power-up tiles create <strong>massive explosions</strong></li>
                    <li>• <strong>Plan ahead</strong> - you have limited moves!</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-orange-500/20 bg-orange-500/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Lightbulb size={24} weight="fill" className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Keyboard Shortcuts</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">Ctrl + P</Badge>
                      <span className="text-muted-foreground">Toggle particle trail</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">Ctrl + Shift + P</Badge>
                      <span className="text-muted-foreground">Cycle particle themes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">Ctrl + H</Badge>
                      <span className="text-muted-foreground">Toggle collision heatmap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono">Ctrl + S</Badge>
                      <span className="text-muted-foreground">View collision statistics</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button onClick={onOpenFullTutorial} className="flex-1">
                <Lightbulb className="mr-2" weight="fill" />
                View Full Tutorial
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
