import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Magnetic from '@/components/Magnetic'



const Header = () => {

    const { useEffect, useState, useMemo } = React;
    const useTypewriter = (text, speed = 100, pause = 500) => {
        const [index, setIndex] = useState(0);
        const [isDeleting, setIsDeleting] = useState(false);
    
        const displayText = useMemo(() => text.slice(0, index), [index]);
    
        useEffect(() => {
            let timeoutId;

            if (!isDeleting && index === text.length) {
                timeoutId = setTimeout(() => setIsDeleting(true), pause);
            } else if (isDeleting && index === 1) {
                timeoutId = setTimeout(() => setIsDeleting(false), pause);
            } else {
                timeoutId = setTimeout(() => {
                    setIndex((prevIndex) =>
                        isDeleting ? prevIndex - 1 : prevIndex + 1
                    );
                }, speed);
            }
    
            return () => clearTimeout(timeoutId);
        }, [index, isDeleting, text, speed, pause]);
    
        return displayText;
    };


    const text = useTypewriter("Crafting the future in code...", 100, 500);
    return (

        <div id='top' className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <Image src={assets.profile_img} alt='' className='rounded-full w-36' />
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-xl md:text-2xl mb-3 font-Monda"
            >
                Hi! I'm Mateo
                <Image src={assets.hand_icon} alt="" className="w-6" />
            </motion.h1>
            <h2 className='text-3xl sm:text-6xl lg:text-[48px] font-Monda'>
                {text}
            </h2>
            <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <Magnetic>
                    <a href="#contact" className='px-10 py-3 border border-white rounded-full bg-black 
                    text-white flex items-center gap-2 dark:bg-transparent '>
                        Contact me
                        <Image src={assets.right_arrow_white} alt='' className='w-4' />
                    </a>
                </Magnetic>
                <a href="/sample-resume.pdf" download className='px-10 py-3 border rounded-full border-gray-500 
                flex items-center gap-2 bg-white dark:text-black'>
                    Download CV
                    <Image src={assets.download_icon} alt='' className='w-4' />
                </a>
            </div>
        </div>     
    )
}

export default Header
