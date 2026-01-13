'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  const useTypewriter = (text, speed = 90, pause = 1200) => {
    const [index, setIndex] = useState(0)
    const [deleting, setDeleting] = useState(false)

    const display = useMemo(() => text.slice(0, index), [index])

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!deleting && index === text.length) 
        {
          setDeleting(true)
        } 
        else if (deleting && index === 0) 
        {
          setDeleting(false)
        }
        else 
        {
          setIndex((i) => (deleting ? i - 1 : i + 1))
        }
      }, deleting ? speed / 2 : speed)

      return () => clearTimeout(timeout)
    }, [index, deleting, text, speed])

    return display
  }

  const text = useTypewriter('Building clean and modern web solutions.')

  return (
    <section id="top" className="h-screen flex flex-col justify-center items-center text-center gap-6 px-6">
      <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: 'spring' }}>
        <Image src={assets.profile_img} className="w-36 rounded-full shadow-lg" priority alt="mat.dev profile"/>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl font-Monda flex items-center gap-2">
        Hi, I’m Mateo
      </motion.h1>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg sm:text-3xl lg:text-[36px] font-Monda max-w-3xl">
        {text}
        <span className="text-greenPrimary">|</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 mt-6">
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-3 rounded-full bg-black text-white hover:bg-black/90 transition">
          Contact me
        </button>
        <a href="/cv_mat_en.pdf" download className="px-10 py-3 rounded-full border border-gray-400 hover:bg-greenPrimary hover:text-white hover:border-greenPrimary dark:hover:bg-white dark:hover:text-black transition dark:text-white dark:border-white">
          Download CV
        </a>
      </motion.div>
    </section>
  )
}

export default Header


