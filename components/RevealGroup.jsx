'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export const RevealGroup = ({ children }) => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
)

export const RevealItem = ({ children }) => (
  <motion.div variants={item}>{children}</motion.div>
)
