import { assets } from '@/assets/assets'
import { infoList } from '@/assets/assets'
import { skills } from '@/assets/assets'
import { toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = ({isDarkMode}) => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h2 className='text-center text-5xl font-Ovo'> About me</h2>

        <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
                <Image src={assets.user_image} alt='user' className='w-full rounded-3xl' />
            </div>
            <div className='flex-1'>
                <p className='mb-10 max-w-2xl font-Monda'>I'm 24-year-old web developer with 3 years of experience in programming. I enjoy technology and solving problems, and I like building web applications that are useful, easy to use, and nice to look at. My way of working combines technical skills with a strong wish to keep learning and improving.</p>
                <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                    {infoList.map(({icon, iconDark, title, percentage}, index)=>(
                        <li className='border-[0.5px] border-gray-200 rounded-xl p-6 hover:-translate-y-1 duration-500 
                        hover:shadow-black dark:border-white dark:hover:shadow-white' key={index}>
                            <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3' />
                            <h3 className='my-4 font-semibold text-gray-700 dark:text-white font-Monda'>{title}</h3>
                            <span className='text-gray-600 text-sm dark:text-white/80 font-Monda'>{percentage}%</span>
                            <div
                                className='bg-greenPrimary h-3 rounded-full'
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    </div>
  )
}

export default About
