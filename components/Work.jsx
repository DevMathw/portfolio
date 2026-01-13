'use client'

import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Work = ({ isDarkMode }) => {
  return (
    <section id="work" className="w-full px-[12%] py-20 scroll-mt-24">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center text-5xl font-Ovo mb-6">
        Selected Work
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-14 font-Monda text-gray-600 dark:text-gray-300">
        A selection of projects that show my skills in full-stack development, including frontend interfaces, backend logic, and real-world problem solving.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {workData.map((project, index) => (
          <motion.article key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -6 }} className="group relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 dark:bg-darkHover cursor-pointer">
            <div className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${project.bgImage})` }}/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-500" />
            <div className="absolute bottom-0 w-full p-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-white text-xl font-semibold mb-1">
                {project.title}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex gap-3">
                <a href={project.demo || '#'} target="_blank" className="px-4 py-2 text-sm rounded-full bg-white text-black font-medium hover:bg-greenPrimary hover:text-white transition">
                  Live Demo
                </a>
                <a href={project.github || '#'} target="_blank" className="px-4 py-2 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition">
                  Code
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center mt-20">
        <a href="https://github.com/DevMathw" target="_blank" className="flex items-center gap-2 px-10 py-3 rounded-full border border-gray-400 text-gray-700 hover:bg-greenPrimary hover:text-white hover:border-greenPrimary dark:hover:bg-white dark:hover:text-black duration-500 dark:text-white dark:border-white">
          View more on GitHub
        </a>
      </motion.div>
    </section>
  )
}

export default Work


