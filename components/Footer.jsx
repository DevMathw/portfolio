'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-gray-200 dark:border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center md:text-left">
            <div className="font-bold text-xl tracking-wide">
              matt.dev
              <span className="text-greenPrimary">.</span>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()}. All rights reserved.
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="flex gap-6">
            <a href="https://github.com/DevMathw" target="_blank" rel="noopener noreferrer" aria-label="GitHub"className="group">
              <Github size={22} className="text-gray-600 dark:text-gray-300 group-hover:text-greenPrimary transition-transform duration-300 group-hover:scale-110"/>
            </a>
            <a href="https://www.linkedin.com/in/mateo-garcia-rodriguez-933135207/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"className="group">
              <Linkedin size={22} className="text-gray-600 dark:text-gray-300 group-hover:text-greenPrimary transition-transform duration-300 group-hover:scale-110"/>
            </a>
            <a href="mailto:mateogarcia13.mg@gmail.com" aria-label="Email" className="group">
              <Mail size={22} className="text-gray-600 dark:text-gray-300 group-hover:text-greenPrimary transition-transform duration-300 group-hover:scale-110"/>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


