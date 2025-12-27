import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { X, ArrowRight, ArrowLeft, Lightbulb, Target, Shuffle as ShuffleIcon, Trophy, Flame } from '@phosphor-icons/react'
  id: string


  isOpen: bo
  onComplete: (

  {
    title: 'Welcome 
    icon: <Lightbulb size={48} weight="fill" className="tex
 

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
    description: 'If y
  },
  }
    id: 'objective',
    title: 'Your Mission',
    id: 'shuffle',
    description: 'If you can\'t find any valid moves, click the Shuffl
    highlight: 'shuffl
  },
   
    description: 'Watc
    highlight: 'stats',
  },
    id: 'power-ups',
    description: 'Comp
    position: 'center'
  {
   
    icon: <Trophy s
  }

  const [currentStep, setCurrentStep] = useState(0)

    
   
  }, [isOpen])
  const handleNext = () => {
      setCurrentStep(currentStep + 1)
      handleComplete()
  }
  co
   
  }
  const handleComplete = () =
    onComplete()
  }
  const handleSkip = (
    
  }
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



















































































































