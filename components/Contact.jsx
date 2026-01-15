'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { RevealGroup, RevealItem } from '@/components/RevealGroup'

const MAX = {
  name: 150,
  email: 256,
  message: 500,
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!form.name.trim()) 
    {
      newErrors.name = 'Name is required'
    } 
    else if (form.name.length > MAX.name) 
    {
      newErrors.name = `Maximum ${MAX.name} characters`
    }

    if (!form.email.trim()) 
    {
      newErrors.email = 'Email is required'
    } 
    else if (!emailRegex.test(form.email)) 
    {
      newErrors.email = 'Invalid email format'
    } 
    else if (form.email.length > MAX.email)
    {
      newErrors.email = `Maximum ${MAX.email} characters`
    }

    if (!form.message.trim()) 
    {
      newErrors.message = 'Message is required'
    } 
    else if (form.message.length > MAX.message) 
    {
      newErrors.message = `Maximum ${MAX.message} characters`
    }

    return newErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)

    const formData = new FormData()
    formData.append('access_key', '11f94cd1-f520-49aa-b4ee-cfa4098d050c')
    formData.append('subject', 'New message from portfolio')
    formData.append('from_name', 'Portfolio Contact')
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('message', form.message)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) 
      {
        setSuccess(true)
        setForm({ name: '', email: '', message: '' })
        setErrors({})
        setSubmitted(false)
      }
    } 
    catch 
    {
      alert('Network error. Please try again later.')
    } 
    finally 
    {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <section id="contact" className="w-full px-[12%] py-20 scroll-mt-24"
    >
      <Reveal>
        <h2 className="text-center text-5xl font-Ovo">
          Let’s work together
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-14 font-Monda text-lg opacity-80">
          Have a project in mind or need help with a web solution?
          Feel free to reach out. I’m open to new opportunities.
        </p>
      </Reveal>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <RevealGroup>
          <RevealItem>
            <label htmlFor="name" className="block mb-2 font-Monda">
              Name
            </label>
            <input id="name" type="text" value={form.name} autoComplete="off" onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={submitted && !!errors.name} className={`w-full p-2 rounded-md border outline-none focus:ring-2 focus:ring-green700 dark:bg-darkHover/30 dark:border-white/80 ${submitted && errors.name ? 'border-red-500' : 'border-gray-400'}`}/>
            <div className="flex justify-between mt-1 text-xs opacity-60"> {submitted && errors.name && ( <span className="text-red-500">{errors.name}</span> )}
              <span>{form.name.length}/{MAX.name}</span>
            </div>
          </RevealItem>
          <RevealItem>
            <label htmlFor="email" className="block mb-2 mt-6 font-Monda">
              Email
            </label>
            <input id="email" type="email" value={form.email} autoComplete="off" onChange={(e) => setForm({ ...form, email: e.target.value }) } aria-invalid={submitted && !!errors.email} className={`w-full p-2 rounded-md border outline-none focus:ring-2 focus:ring-green700 dark:bg-darkHover/30 dark:border-white/80 ${submitted && errors.email ? 'border-red-500' : 'border-gray-400'}`} />
            <div className="flex justify-between mt-1 text-xs opacity-60">{submitted && errors.email && ( <span className="text-red-500">{errors.email}</span> )}
              <span>{form.email.length}/{MAX.email}</span>
            </div>
          </RevealItem>
          <RevealItem>
            <label htmlFor="message" className="block mb-2 mt-6 font-Monda">
              Message
            </label>
            <textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value }) } aria-invalid={submitted && !!errors.message} className={`w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-green700 dark:bg-darkHover/30 dark:border-white/80 ${submitted && errors.message ? 'border-red-500' : 'border-gray-400'}`}/>
            <div className="flex justify-between mt-1 text-xs opacity-60 d"> {submitted && errors.message && ( <span className="text-red-500">{errors.message}</span> )}
              <span>{form.message.length}/{MAX.message}</span>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`px-10 py-3 rounded-full font-Monda
                bg-black text-white transition
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black/90'}`}
              >
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </RevealItem>
        </RevealGroup>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-greenPrimary text-white px-8 py-4 rounded-full shadow-xl text-lg">
              Thanks! Your message has been sent 
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Contact



