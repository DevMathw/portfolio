import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { RevealGroup, RevealItem } from '@/components/RevealGroup'
import Magnetic from '@/components/Magnetic'

const Work = ({ isDarkMode }) => {
  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
      
      <Reveal>
        <h2 className="text-center text-5xl font-Ovo">Portfolio</h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto...
        </p>
      </Reveal>

      {/* PROJECT GRID */}
      <RevealGroup>
        <div className="grid grid-cols-auto my-10 gap-5 dark:text-black">
          {workData.map((project, index) => (
            <RevealItem key={index}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{ backgroundImage: `url(${project.bgImage})` }}
                className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
              >
                <div
                  className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 
                  -translate-x-1/2 py-3 px-5 flex items-center justify-between 
                  duration-500 group-hover:bottom-7"
                >
                  <div>
                    <h2 className="font-semibold">{project.title}</h2>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>

                  <div
                    className="border border-full border-black w-9 aspect-square 
                    flex items-center justify-center shadow-[2px_2px_0_#000] 
                    group-hover:bg-lime-300 transition"
                  >
                    <Image src={assets.send_icon} alt="send icon" className="w-5" />
                  </div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>

      {/* SHOW MORE */}
      <div className="flex justify-center">
        <Magnetic>
          <a
            className="w-max flex items-center gap-2 text-gray-700 border-[0.5px] 
            border-gray-700 rounded-full py-3 px-10 my-20 hover:bg-lightHover 
            duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
          >
            Show more
            <Image
              src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold}
              alt="Right arrow"
              className="w-4"
            />
          </a>
        </Magnetic>
      </div>
    </div>
  )
}

export default Work

