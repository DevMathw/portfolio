'use client'

import React from 'react'
import { motion } from 'framer-motion'

const MobileNav = ({ sections, activeSection, onNavigate }) => {
    return (
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="relative flex gap-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-lg shadow-xl dark:bg-darkTheme/80">
                {sections.map(({ id, label, icon: Icon }) => {
                    const isActive = activeSection === id
                    return (
                        <button key={id} onClick={() => onNavigate(id)} aria-label={label} aria-current={isActive ? 'true' : undefined} className="relative flex flex-col items-center justify-center">
    
                        <motion.div animate={{ scale: isActive ? 1.15 : 1 }} transition={{ type: 'spring', stiffness: 300 }} className={`p-2 rounded-full transition-colors ${ isActive ? 'text-green400 dark:text-green400' : 'text-gray-600 dark:text-gray-300' }`}>
                            <Icon size={22} />
                        </motion.div>

                        <motion.span initial={{ opacity: 0, y: 6, scale: 0.95 }} whileHover={{ opacity: 1, y: 0, scale: 1 }} className="absolute -top-10 px-3 py-1 text-[11px] rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg pointer-events-none">
                            {label}
                        </motion.span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileNav