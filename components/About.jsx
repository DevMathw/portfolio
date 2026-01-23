'use client'

import React from 'react'
import { motion } from 'framer-motion'
import DevOrb from '@/components/DevOrb'
import { infoList } from '@/assets/assets'
import { useLanguage } from '@/components/hooks/useLanguage'
import texts from '@/components/language/texts'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

const About = () => {
  const { lang } = useLanguage()
  const t = texts[lang].about

  return (
    <section id="about" className="w-full px-[12%] py-24 scroll-mt-24" aria-labelledby="about-title">
      <motion.h2 id="about-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center text-5xl font-Ovo mb-12">
        {t.title}
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex justify-center w-full lg:w-auto mb-16">
          <DevOrb />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex-1">
          <p className="max-w-3xl text-gray-700 dark:text-gray-300 font-Monda leading-relaxed mb-12">
            {t.description}
          </p>
          <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5" aria-label={t.skillsLabel}>
            {infoList.map(({ icon: Icon, title, percentage }, index) => (
              <motion.li key={index} variants={item} className="group flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={30} aria-hidden />
                </div>
                <div className="text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-sm font-medium">{title}</p>
                  <span className="text-xs opacity-60">
                    {percentage}% {t.experience}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}

export default About


