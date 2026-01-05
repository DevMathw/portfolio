import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useReducer, useRef, useState } from 'react'


const Navbar = ({isDarkMode, setIsDarkMode}) => {

    const [isScroll, setIsScroll] = useState(false)
    const sideMenuRef = useRef()

    const openMenu = ()=>{
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }

    const closeMenu = ()=>{
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if(scrollY > 50){
                setIsScroll(true) 
            }
            else{
                setIsScroll(false) 
            }
        })
    }, [])


  return (
    <>

        <div className='hidden fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
            <Image src={assets.header_bg_color} alt='' className='w-full' />
        </div>

        <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center 
            justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shawdow-white/20" : ""}`}>
            <a href="#top">
                {/* <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt="" className='w-28 cursor-pointer mr-14'/> */}
            </a>
            
            <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full 
            px-12 py-3  ${isScroll ? "" : "bg-white shadow-[1px_1px_0_rgb(48_48_48_/_0.12)] bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"}`}>
                <li><a className='font-Monda hover:text-greenPrimary' href="#top">Inicio</a></li>
                <li><a className='font-Monda hover:text-greenPrimary' href="#about">Acerca de</a></li>
                <li><a className='font-Monda hover:text-greenPrimary' href="#work">Proyectos</a></li>
                <li><a className='font-Monda hover:text-greenPrimary' href="#contact">Contacto</a></li>
            </ul>

            <div className='flex items-center gap-4'>
                <button onClick={()=> setIsDarkMode(prev => !prev)}>
                    <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='' className='w-6' />
                </button>

                <button className='block md:hidden ml-3' onClick={openMenu} >
                    <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6' />
                </button>
            </div>

            {/* -- ----- mobile menu ----- -- */}

            <ul ref={sideMenuRef} className='flex md:hidden flex-col items-center gap-4 py-20 px-5 fixed -right-64 top-0 
                bottom-0 w-64 z-50 h-screen bg-white shadow-md trasition-duration-500 dark:bg-darkHover dark:text-white'>

                <div className='absolute right-6 top-6' onClick={closeMenu}>
                    <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer' />
                </div>

                <li><a className='font-Monda hover:text-greenPrimary' onClick={closeMenu} href="#top">Inicio</a></li>
                <li><a className='font-Monda hover:text-greenPrimary' onClick={closeMenu} href="#about">Acerca de</a></li>
                <li><a className='font-Monda hover:text-greenPrimary' onClick={closeMenu} href="#work">Proyectos</a></li>
                <li><a className='font-Monda hover:text-greenPrimary' onClick={closeMenu} href="#contact">Contacto</a></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
