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
            <Image src={assets.user_image} alt="mat.dev about" priority className="rounded-3xl shadow-lg" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1">
          <p className="mb-10 max-w-3xl text-gray-700 dark:text-gray-300 font-Monda">
            I’m a full-stack developer with 3 years of experience building modern, responsive web applications. I work across both frontend and backend, focusing on clean user interfaces, robust APIs, and scalable architectures. I enjoy turning complex problems into simple, efficient, and intuitive solutions.
          </p>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="max-w-3xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mt-12"
          >
            {infoList.map(({ icon: Icon, title, percentage }, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl
                  bg-gray-100 dark:bg-white/10
                  transition-transform duration-300
                  group-hover:scale-110"
                >
                  <Icon size={30} aria-hidden />
                </div>

                {/* Hover info */}
                <div
                  className="text-center opacity-0 translate-y-2
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300"
                >
                  <p className="text-sm font-medium">{title}</p>
                  <span className="text-xs opacity-60">
                    {percentage}% experience
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
{/*
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
          </ul> */}
        </motion.div>
      </div>
    </section>
  )
}

export default About


