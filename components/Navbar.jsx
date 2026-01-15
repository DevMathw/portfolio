'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiHome, FiUser, FiBriefcase, FiMail } from 'react-icons/fi'
import MobileNav from '@/components/MobileNav'

const sections = [
  { id: 'top', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'work', label: 'Work', icon: FiBriefcase },
  { id: 'contact', label: 'Contact', icon: FiMail },
]

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50)

      sections.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 w-full px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition
        ${isScroll ? 'bg-white/70 backdrop-blur shadow dark:bg-darkTheme/70' : ''}`}
      >
        <div
          onClick={() => scrollToSection('top')}
          className="cursor-pointer font-bold text-xl tracking-wide hover:scale-105 transition"
        >
          matt<span className="text-greenPrimary">.</span>dev
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {sections.map(({ id, label }) => (
            <li
              key={id}
              onClick={() => scrollToSection(id)}
              className={`cursor-pointer font-Monda transition
              ${activeSection === id ? 'menu-active' : 'hover:text-greenPrimary'}`}
            >
              {label}
            </li>
          ))}
        </ul>

        <button onClick={() => setIsDarkMode((p) => !p)}>
          <Image
            src={isDarkMode ? assets.sun_icon : assets.moon_icon}
            alt="theme"
            className="w-6 transition-transform hover:rotate-180"
          />
        </button>
      </nav>

      {/* Mobile Bottom Nav */}
      <MobileNav
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </>
  )
}

export default Navbar



