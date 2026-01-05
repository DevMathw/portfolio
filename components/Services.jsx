import { assets } from '@/assets/assets'
import {serviceData} from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Services = () => {
  return (
    <div id='services' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h2 className='text-center text-5xl font-Ovo'>Servicios</h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Monda'>Como desarrollador, proporciono una variedad de servicios centrados en la creación de soluciones digitales 
            de excelente calidad, desde la creación y desarrollo de interfaces de usuario sensibles y cautivadoras, hasta la puesta en marcha de sistemas backend sólidos con 
            autenticación segura y bases de datos eficaces.</p>
        <div className='grid grid-cols-auto gap-6 my-10'>
            {serviceData.map(({icon, title, description,link}, index)=>(
                <div key={index} className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black 
                 hover:-translate-y-1 duration-500 dark:hover:shadow-white'>
                    <Image src={icon} alt='' className='w-10' />
                    <h3 className='text-lg my-4 text-gray-700 dark:text-white font-Monda'>{title}</h3>
                    <p className='text-sm text-gray-600 leading-5 dark:text-white/80 font-Monda'>{description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Services
