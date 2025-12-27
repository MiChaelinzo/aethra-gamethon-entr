import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { X, ArrowRight, ArrowLeft, Lightbulb, Target, Shuffle as ShuffleIcon, Trophy, Flame } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface TutorialStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: string
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left'
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
    description: 'Match 3 or more adjacent tiles (horizontally or vertically) to reduce pollution and earn points. Reach the target score before running out of moves!',
    icon: <Target size={48} weight="fill" className="text-primary" />,
    position: 'center'
  },
  {
    id: 'matching',
    title: 'How to Match',
    description: 'Click two adjacent tiles to swap them. If they create a match of 3+, they\'ll disappear and you\'ll score points. No match? The swap won\'t happen.',
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

  if (!isOpen) return null

  const currentStepData = TUTORIAL_STEPS[currentStep]
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl"
          >
            <Card className="relative overflow-hidden border-2 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="absolute top-4 right-4 z-10 hover:bg-destructive/10"
              >
                <X size={20} weight="bold" />
              </Button>

              <div className="p-8 pt-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <motion.div
                    key={currentStepData.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-full"
                  >
                    {currentStepData.icon}
                  </motion.div>

                  <motion.div
                    key={`content-${currentStepData.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <h2 className="text-3xl font-bold">{currentStepData.title}</h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </motion.div>

                  <div className="flex items-center gap-2 pt-4">
                    {TUTORIAL_STEPS.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          'h-2 rounded-full transition-all duration-300',
                          index === currentStep
                            ? 'w-8 bg-primary'
                            : index < currentStep
                            ? 'w-2 bg-primary/50'
                            : 'w-2 bg-muted'
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ArrowLeft size={18} weight="bold" />
                    Previous
                  </Button>

                  <span className="text-sm text-muted-foreground font-medium">
                    {currentStep + 1} of {TUTORIAL_STEPS.length}
                  </span>

                  <Button onClick={handleNext} className="gap-2">
                    {currentStep === TUTORIAL_STEPS.length - 1 ? (
                      <>
                        Start Playing
                        <Trophy size={18} weight="fill" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight size={18} weight="bold" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
