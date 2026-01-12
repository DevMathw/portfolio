'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const sections = ['top', 'about', 'work', 'contact']

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const sideMenuRef = useRef(null)

  const scrollToSection = (id) => 
  {
    const el = document.getElementById(id)
    if (el) 
    {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  const openMenu = () => 
  {
    sideMenuRef.current.style.transform = 'translateX(0)'
  }

  const closeMenu = () => 
  {
    sideMenuRef.current.style.transform = 'translateX(100%)'
  }

  useEffect(() => {
    const handleScroll = () => 
    {
      setIsScroll(window.scrollY > 50)

      sections.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        const rect = section.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) 
        {
          setActiveSection(id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${isScroll ? 'nav-scrolled' : ''}`}>
      <div onClick={() => scrollToSection('top')} className="cursor-pointer font-bold text-xl tracking-wide hover:scale-105 transition">
        matt.dev
        <span className="text-greenPrimary">.</span>
      </div>
      <ul className={`hidden md:flex items-center gap-8 rounded-full px-12 py-3 transition ${isScroll ? '' : 'bg-white/50 shadow-md backdrop-blur dark:bg-transparent dark:border dark:border-white/40'}`}>
        {sections.map((item) => (
          <li key={item} onClick={() => scrollToSection(item)} className={`cursor-pointer font-Monda hover:text-greenPrimary transition ${activeSection === item ? 'menu-active' : ''}`}>
            {item === 'top'
              ? 'Home'
              : item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <button onClick={() => setIsDarkMode((p) => !p)}>
          <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt="theme" className="w-6 transition-transform duration-500 hover:rotate-180"/>
        </button>
        <button className="block md:hidden" onClick={openMenu}>
          <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt="menu"className="w-6"/>
        </button>
      </div>
      <ul ref={sideMenuRef} className="fixed top-0 right-0 w-full h-screen bg-white dark:bg-darkTheme z-50 flex flex-col items-center gap-6 pt-24 shadow-lg transition-transform duration-500 translate-x-full">
        <div className="absolute top-6 right-6 cursor-pointer" onClick={closeMenu}>
          <Image src={isDarkMode ? assets.close_white : assets.close_black} alt="close" className="w-5"/>
        </div>
        {sections.map((item) => (
          <li key={item} onClick={() => scrollToSection(item)} className={`font-Monda text-lg cursor-pointer hover:text-greenPrimary transition ${activeSection === item ? 'menu-active' : ''}`} >
            {item === 'top'
              ? 'Home'
              : item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar


