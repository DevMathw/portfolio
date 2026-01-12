import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = ({isDarkMode}) => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='' className='w-36 mx-auto mb-2'/>
        </div>

        <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>   
            <p>@ 2026 matt.dev. All rights reserved</p>
            <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
                <li><a target='_blank' href='https://instagram.com/greatstackdev'>Github</a></li>
                <li><a target='_blank' href='https://instagram.com/greatstackdev'>LinkedIn</a></li>
                <li><a target='_blank' href='https://instagram.com/greatstackdev'>Twitter</a></li>
                <li><a target='_blank' href='https://instagram.com/greatstackdev'>Instagram</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer
