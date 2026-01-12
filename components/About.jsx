'use client'

import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="w-full px-[12%] py-20 scroll-mt-24">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center text-5xl font-Ovo mb-16">
        About Me
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}className="w-72">
            <Image src={assets.user_image} alt="Mateo" className="rounded-3xl shadow-lg" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1">
          <p className="mb-10 max-w-2xl text-gray-700 dark:text-gray-300 font-Monda">
            I’m a frontend developer with 3 years of experience building modern,
            responsive web applications. I specialize in creating clean user
            interfaces, smooth interactions, and scalable frontend architectures.
            I enjoy turning complex problems into simple, intuitive solutions.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon: Icon, title, percentage }, index) => (
                <motion.li key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="border border-gray-200 dark:border-white/20 rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg transition">
                    <Icon size={28} aria-hidden="true"/>
                    <h3 className="mt-4 font-semibold font-Monda">{title}</h3>
                    <div className="mt-3 h-2 bg-gray-200 dark:bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-greenPrimary transition-all duration-700" style={{ width: `${percentage}%` }}/>
                    </div>
                    <span className="text-sm opacity-70">{percentage}%</span>
                </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default About


