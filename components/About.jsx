'use client'

import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="w-full px-[12%] py-20 scroll-mt-24">
      <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center text-5xl font-Ovo mb-16">
        About me
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}mviewport={{ once: true }} transition={{ duration: 0.5 }} className="w-72 shrink-0">
          <Image src={assets.user_image} alt="Mateo Garcia – Fullstack Developer" priority className="rounded-3xl shadow-lg"/>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex-1">
          <p className="mb-10 max-w-3xl text-gray-700 dark:text-gray-300 font-Monda leading-relaxed">
            I’m a full-stack developer with 3 years of experience building modern web applications. 
            I work on both frontend and backend, creating clean user interfaces, reliable APIs, and scalable solutions.
            I enjoy solving real problems and turning ideas into simple, efficient products.
          </p>
          <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, }, },}} className="max-w-3xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mt-12">
            {infoList.map(({ icon: Icon, title, percentage }, index) => (
              <motion.li key={index} variants={{ hidden: { opacity: 0, y: 16 },show: { opacity: 1, y: 0 }, }} className="group flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={30} aria-hidden />
                </div>
                <div className="text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" >
                  <p className="text-sm font-medium">{title}</p>
                  <span className="text-xs opacity-60">
                    {percentage}% experience
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


