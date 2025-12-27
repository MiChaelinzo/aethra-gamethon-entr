import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { X, ArrowRight, ArrowLeft, Lightbulb, Target, Shuffle as ShuffleIcon, Trophy, Flame } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface TutorialStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: string
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
}

interface TutorialOverlayProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to EcoRise! 🌍',
    description: 'A match-3 puzzle game where every move helps restore the planet. Learn eco-facts while reducing pollution and earning CO₂ reduction points!',
    icon: <Lightbulb size={48} weight="fill" className="text-yellow-500" />,
    position: 'center'
  },
  {
    id: 'objective',
    title: 'Your Mission',
    description: 'Match 3 or more identical tiles to reduce pollution and earn points. Reach your target score before running out of moves!',
    icon: <Target size={48} weight="fill" className="text-primary" />,
    position: 'center'
  },
  {
    id: 'how-to-play',
    title: 'How to Play',
    description: 'Click a tile, then click an adjacent tile to swap them. If they form a match of 3 or more, they\'ll clear and you\'ll score points!',
    icon: <ArrowRight size={48} weight="bold" className="text-accent" />,
    highlight: 'grid',
    position: 'center'
  },
  {
    id: 'adjacent',
    title: 'Adjacent Tiles Only',
    description: 'You can only swap tiles that are next to each other (horizontally or vertically). Diagonal swaps are not allowed.',
    icon: <ArrowRight size={48} weight="bold" className="text-blue-500" />,
    position: 'center'
  },
  {
    id: 'no-match',
    title: 'Valid Moves Only',
    description: 'If your swap doesn\'t create a match of 3 or more tiles, it won\'t work. Look for potential matches before swapping!',
    icon: <X size={48} weight="bold" className="text-destructive" />,
    position: 'center'
  },
  {
    id: 'combos',
    title: 'Chain Reactions',
    description: 'After clearing tiles, new ones drop down. If they create new matches automatically, you get combo bonuses!',
    icon: <Flame size={48} weight="fill" className="text-orange-500" />,
    position: 'center'
  },
  {
    id: 'shuffle',
    title: 'Stuck? Use Shuffle',
    description: 'If you can\'t find any valid moves, click the Shuffle button in the top-right to rearrange the board. Use this wisely!',
    icon: <ShuffleIcon size={48} weight="bold" className="text-secondary" />,
    highlight: 'shuffle',
    position: 'top'
  },
  {
    id: 'stats',
    title: 'Track Your Progress',
    description: 'Watch your score, remaining moves, and pollution levels on the stats panel. Plan your moves to reach the target!',
    icon: <Trophy size={48} weight="fill" className="text-accent" />,
    highlight: 'stats',
    position: 'right'
  },
  {
    id: 'power-ups',
    title: 'Unlock Power-Ups',
    description: 'Complete daily challenges to unlock special power-up tiles like Supernova and Tsunami. They create massive chain reactions!',
    icon: <Target size={48} weight="fill" className="text-purple-500" />,
    position: 'center'
  },
  {
    id: 'ready',
    title: 'You\'re Ready!',
    description: 'Start matching tiles, reduce pollution, and restore the planet. Remember: swipe adjacent tiles to create matches of 3+. Good luck!',
    icon: <Trophy size={48} weight="fill" className="text-primary" />,
    position: 'center'
  }
]

export function TutorialOverlay({ isOpen, onClose, onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setCurrentStep(0)
    }
  }, [isOpen])

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    onComplete()
    setTimeout(onClose, 300)
  }

  const handleSkip = () => {
    setIsVisible(false)
    onComplete()
    setTimeout(onClose, 300)
  }

  const step = TUTORIAL_STEPS[currentStep]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={handleSkip}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "fixed z-[101]",
              step.position === 'center' && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              step.position === 'top' && "top-24 left-1/2 -translate-x-1/2",
              step.position === 'bottom' && "bottom-24 left-1/2 -translate-x-1/2",
              step.position === 'left' && "left-24 top-1/2 -translate-y-1/2",
              step.position === 'right' && "right-24 top-1/2 -translate-y-1/2"
            )}
          >
            <Card className="w-[90vw] max-w-lg p-8 shadow-2xl border-2 border-primary/20">
              <div className="flex flex-col items-center text-center space-y-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSkip}
                  className="absolute top-2 right-2 rounded-full"
                >
                  <X size={20} />
                </Button>

                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                  {step.icon}
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold">{step.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {TUTORIAL_STEPS.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        index === currentStep
                          ? "w-8 bg-primary"
                          : index < currentStep
                          ? "w-2 bg-primary/50"
                          : "w-2 bg-border"
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between w-full gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2" />
                    Previous
                  </Button>
                  
                  <Badge variant="secondary" className="px-4 py-2">
                    {currentStep + 1} / {TUTORIAL_STEPS.length}
                  </Badge>

                  <Button
                    onClick={handleNext}
                    className="flex-1"
                  >
                    {currentStep === TUTORIAL_STEPS.length - 1 ? (
                      <>
                        Start Playing
                        <Trophy className="ml-2" weight="fill" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  Skip Tutorial
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
