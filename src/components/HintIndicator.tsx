import { motion, AnimatePresence } from 'framer-motion'


  gridSize: number
}
export function Hin

    x: col * tileSi
 




        className="absolute inset-0 pointer-events-non
        animate={{ opa
      >
    

            width: tileSize - 8,
          }}

              '0 0 10px rgba(99, 179, 130, 0.3)',

          
            duration:
            ease:
        />
        <motion.div
          style={{
            top: pos2.y + 4,
       
          animate={
            boxShadow: [
              '0 0
            ]
          transition={{
            repeat: Infinity,
            delay: 0.2
        />
        <svg
          style={{
            top: Math.mi
            height: isHorizontal ? tileSize : til
        >
            d={
             
            
            strokeWidth
            strokeDasharra
            initial={{ pathLe
              pathLength: [0,
            
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













































