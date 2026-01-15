'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <section id="top" className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <Image src={assets.profile_img} className="w-32 rounded-full shadow-md mb-6" priority alt="Mateo Garcia – Fullstack Developer"/>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-xl md:text-2xl font-Monda">
        Hi, I’m Mateo
      </motion.h1>
      <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="mt-3 text-lg sm:text-3xl lg:text-[36px] font-Monda max-w-3xl leading-tight text-gray-900 dark:text-gray-100">
        Fullstack Developer building{' '}
        <span className="font-semibold text-green-700 dark:text-green-400">
          modern web applications
        </span>
      </motion.h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex flex-col sm:flex-row gap-4 mt-8">
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-3 rounded-full bg-black text-white hover:bg-black/90 transition">
          Contact me
        </button>
        <a href="/cv_mat_en.pdf" download className="px-10 py-3 rounded-full border border-gray-400 hover:bg-green-700 hover:text-white hover:border-green-700 dark:hover:bg-green-400 dark:hover:text-black transition dark:text-white dark:border-white">
          Download CV
        </a>
      </motion.div>
    </section>
  )
}

export default Header

