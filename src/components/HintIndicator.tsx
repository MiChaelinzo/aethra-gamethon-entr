import { motion, AnimatePresence } from 'framer-motion'
import { ValidMove } from '../lib/gameLogic'

interface HintIndicatorProps {
  hint: ValidMove | null
  isActive: boolean
  gridSize: number
}

export function HintIndicator({ hint, isActive, gridSize }: HintIndicatorProps) {
  if (!hint || !isActive) return null

  const tileSize = 80
  const gap = 8

  const getPosition = (row: number, col: number) => ({
    x: col * (tileSize + gap),
    y: row * (tileSize + gap)
  })

  const pos1 = getPosition(hint.tile1.row, hint.tile1.col)
  const pos2 = getPosition(hint.tile2.row, hint.tile2.col)

  const isHorizontal = hint.tile1.row === hint.tile2.row

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute bg-primary/20 border-2 border-primary rounded-lg"
            style={{
              left: pos1.x + 4,
              top: pos1.y + 4,
              width: tileSize - 8,
              height: tileSize - 8
            }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 10px rgba(99, 179, 130, 0.3)',
                '0 0 25px rgba(99, 179, 130, 0.6)',
                '0 0 10px rgba(99, 179, 130, 0.3)'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          <motion.div
            className="absolute bg-primary/20 border-2 border-primary rounded-lg"
            style={{
              left: pos2.x + 4,
              top: pos2.y + 4,
              width: tileSize - 8,
              height: tileSize - 8
            }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 10px rgba(99, 179, 130, 0.3)',
                '0 0 25px rgba(99, 179, 130, 0.6)',
                '0 0 10px rgba(99, 179, 130, 0.3)'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2
            }}
          />

          <svg
            className="absolute"
            style={{
              left: Math.min(pos1.x, pos2.x),
              top: Math.min(pos1.y, pos2.y),
              width: isHorizontal ? tileSize * 2 : tileSize,
              height: isHorizontal ? tileSize : tileSize * 2
            }}
          >
            <motion.path
              d={
                isHorizontal
                  ? `M ${tileSize / 2} ${tileSize / 2} L ${tileSize * 1.5} ${tileSize / 2}`
                  : `M ${tileSize / 2} ${tileSize / 2} L ${tileSize / 2} ${tileSize * 1.5}`
              }
              stroke="oklch(0.52 0.14 155)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg font-semibold"
            style={{
              top: Math.min(pos1.y, pos2.y) - 50
            }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            💡 Try this move! ({hint.matchCount} matches)
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
