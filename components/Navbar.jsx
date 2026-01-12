import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/Magnetic'


const SECTIONS = ['top', 'about', 'work', 'contact']

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const sideMenuRef = useRef()

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  // Smooth scroll without href
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50)

      // Scroll spy
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i])
        if (section && window.scrollY >= section.offsetTop - 120) {
          setActiveSection(SECTIONS[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (id) =>
    `font-Monda cursor-pointer transition ${
      activeSection === id
        ? 'text-greenPrimary menu-active'
        : 'hover:text-greenPrimary'
    }`

  return (
    <>
      <div className="hidden fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>

      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50
        ${isScroll ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme' : ''}`}
      >
        {/* Logo */}
        <div onClick={() => scrollToSection('top')} className="cursor-pointer">
          {/* logo here */}
        </div>

        {/* Desktop menu */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
          ${isScroll ? '' : 'bg-white bg-opacity-50 shadow dark:border dark:border-white/50 dark:bg-transparent'}`}
        >
          <li onClick={() => scrollToSection('top')} className={linkClass('top')}>
            <Magnetic>Home</Magnetic>
          </li>
          <li onClick={() => scrollToSection('about')} className={linkClass('about')}>
            <Magnetic>About</Magnetic>
          </li>
          <li onClick={() => scrollToSection('work')} className={linkClass('work')}>
            <Magnetic>Projects</Magnetic>
          </li>
          <li onClick={() => scrollToSection('contact')} className={linkClass('contact')}>
            <Magnetic>Contact</Magnetic>
          </li>
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode((p) => !p)}>
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt=""
              className="w-6"
            />
          </button>

          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt=""
              className="w-6"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col items-center gap-4 py-20 px-5 fixed -right-64 top-0
          bottom-0 w-64 z-50 h-screen bg-white shadow-md transition-transform dark:bg-darkHover dark:text-white"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt=""
              className="w-5 cursor-pointer"
            />
          </div>

          <li onClick={() => scrollToSection('top')} className={linkClass('top')}>
            Home
          </li>
          <li onClick={() => scrollToSection('about')} className={linkClass('about')}>
            About
          </li>
          <li onClick={() => scrollToSection('work')} className={linkClass('work')}>
            Projects
          </li>
          <li onClick={() => scrollToSection('contact')} className={linkClass('contact')}>
            Contact
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar

