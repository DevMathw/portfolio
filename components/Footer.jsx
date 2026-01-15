'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="relative mt-24 border-t border-gray-200 dark:border-white/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">

          {/* Brand + Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="font-semibold text-xl tracking-wide">
              matt<span className="text-green700 dark:text-green400">.dev</span>
            </div>

            <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
              Full-stack developer focused on building clean, scalable, and
              accessible web applications.
            </p>

            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-5"
          >
            {[
              {
                href: 'https://github.com/DevMathw',
                label: 'GitHub',
                Icon: Github,
              },
              {
                href: 'https://www.linkedin.com/in/mateo-garcia-rodriguez-933135207/',
                label: 'LinkedIn',
                Icon: Linkedin,
              },
              {
                href: 'mailto:mateogarcia13.mg@gmail.com',
                label: 'Email',
                Icon: Mail,
              },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full
                  border border-gray-300 dark:border-white/30
                  text-gray-600 dark:text-gray-300
                  transition-all duration-300
                  group-hover:border-green700 dark:group-hover:border-green400
                  group-hover:text-green700 dark:group-hover:text-green400
                  group-hover:-translate-y-1"
                >
                  <Icon size={18} />
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


