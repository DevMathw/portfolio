import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import Reveal from '@/components/Reveal'
import { RevealGroup, RevealItem } from '@/components/RevealGroup'
import Magnetic from '@/components/Magnetic'

const Contact = () => {
  const [result, setResult] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult('Sending...')

    const formData = new FormData(event.target)
    formData.append('access_key', 'be8cc513-1865-41db-ae0a-feb2cabe9ce7')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      setResult('Form Submitted Successfully')
      event.target.reset()
    } else {
      setResult(data.message)
    }
  }

  return (
    <div
      id="contact"
      className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")]
      bg-no-repeat bg-center dark:bg-none'
    >
      <Reveal>
        <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto...
        </p>
      </Reveal>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <RevealGroup>
          <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
            <RevealItem>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white
                dark:bg-darkHover/30 dark:border-white/90"
              />
            </RevealItem>

            <RevealItem>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white
                dark:bg-darkHover/30 dark:border-white/90"
              />
            </RevealItem>
          </div>

          <RevealItem>
            <textarea
              rows="6"
              name="message"
              required
              placeholder="Enter your message"
              className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6
              dark:bg-darkHover/30 dark:border-white/90"
            />
          </RevealItem>

          <RevealItem>
            <div className="flex justify-center">
              <Magnetic>
                <button
                  type="submit"
                  className="py-3 px-8 flex items-center gap-2 bg-black/80 text-white 
                  rounded-full hover:bg-black duration-500 dark:bg-transparent dark:border-white/50"
                >
                  Submit now
                  <Image src={assets.right_arrow_white} alt="" className="w-4" />
                </button>
              </Magnetic>
            </div>
          </RevealItem>
        </RevealGroup>

        <p className="mt-4 text-center">{result}</p>
      </form>
    </div>
  )
}

export default Contact

