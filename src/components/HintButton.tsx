import { Button } from './ui/button'
import { Lightbulb } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface HintButtonProps {
  onClick: () => void
  disabled?: boolean
  hintsRemaining?: number
  showHintsCount?: boolean
}

export function HintButton({ 
  onClick, 
  disabled = false, 
  hintsRemaining, 
  showHintsCount = false 
}: HintButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled}
        className="relative bg-card/80 backdrop-blur-sm hover:bg-card group"
        title="Show hint for a valid move"
      >
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
        >
          <Lightbulb 
            size={20} 
            weight="fill" 
            className="mr-2 text-yellow-500 group-hover:text-yellow-400 transition-colors"
          />
        </motion.div>
        Hint
        {showHintsCount && hintsRemaining !== undefined && (
          <motion.span 
            className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded-full font-bold"
            key={hintsRemaining}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {hintsRemaining}
          </motion.span>
        )}
      </Button>
    </motion.div>
  )
}
