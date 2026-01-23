'use client'

import { workData } from '@/assets/assets'
import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/hooks/useLanguage'
import texts from '@/components/language/texts'

const Work = () => {
  const { lang } = useLanguage()
  const t = texts[lang].work

  return (
    <section id="work" className="w-full px-[12%] py-20 scroll-mt-24">
      <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center text-5xl font-Ovo mb-6">
        {t.title}
      </motion.h2>

      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-14 font-Monda text-gray-600 dark:text-gray-300">
        {t.description}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {workData.map((project, index) => (
          <motion.article key={index} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }} className="group relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-darkHover shadow-md hover:shadow-xl transition-shadow">
            <div className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"style={{ backgroundImage: `url(${project.bgImage})`,willChange: 'transform',}}/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-500" />
            <div className="absolute bottom-0 w-full p-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-white text-xl font-semibold mb-1">
                {project.title}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex gap-3">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-full bg-white text-black font-medium hover:bg-green700 hover:text-white transition">
                    {t.live}
                  </a>
                )}

                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition">
                    {t.code}
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center mt-20">
        <a href="https://github.com/DevMathw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-10 py-3 rounded-full border border-gray-400 text-gray-700 dark:text-white dark:border-white hover:bg-green700 hover:text-white hover:border-green700 dark:hover:bg-green400 dark:hover:text-black transition">
          {t.more}
        </a>
      </motion.div>
    </section>
  )
}

export default Work


