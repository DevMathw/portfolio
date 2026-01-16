'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FaRocket, FaPuzzlePiece, FaUsers, FaBrain, FaClock, FaLightbulb } from 'react-icons/fa'

const icons = [
    FaRocket,
    FaPuzzlePiece,
    FaUsers,
    FaBrain,
    FaClock,
    FaLightbulb
]

export default function DevOrb() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="relative w-64 h-64 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-700 to-greenPrimary shadow-xl" />
      {icons.map((Icon, i) => {
        const angle = (360 / icons.length) * i
        return (
          <motion.div key={i} className="absolute" style={{ rotate: angle, transformOrigin: 'center 120px',}} animate={ reduceMotion ? {} : { rotate: angle + 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear', }} >
            <div className="w-10 h-10 rounded-full bg-white dark:bg-darkTheme shadow flex items-center justify-center">
              <Icon className="text-green700 dark:text-green400" size={22} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}