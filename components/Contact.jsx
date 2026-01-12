'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '@/components/Reveal'
import { RevealGroup, RevealItem } from '@/components/RevealGroup'

const MAX = {name: 150, email: 256, message: 500,}
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
      newErrors.name = `Max ${MAX.name} characters`
    }

    if (!form.email.trim()) 
    {
      newErrors.email = 'Email is required'
    } 
    else if (!emailRegex.test(form.email)) 
    {
      newErrors.email = 'Invalid email address'
    } 
    else if (form.email.length > MAX.email) 
    {
      newErrors.email = `Max ${MAX.email} characters`
    }

    if (!form.message.trim()) 
    {
      newErrors.message = 'Message is required'
    } 
    else if (form.message.length > MAX.message) 
    {
      newErrors.message = `Max ${MAX.message} characters`
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

      if (data.success) {
        setSuccess(true)
        setForm({ name: '', email: '', message: '' })
        setErrors({})
        setSubmitted(false)
      }
    } catch {
      alert('Network error, try again later.')
    } finally {
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
    <section id="contact" className="w-full px-[12%] py-20 scroll-mt-20 bg-none dark:bg-none">
      <Reveal>
        <h2 className="text-center text-5xl font-Ovo">Let’s work together</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-14 font-Monda text-lg opacity-80">Have a project in mind or just want to say hi? I’d love to hear from you</p>
      </Reveal>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <RevealGroup>
          <RevealItem>
            <label className="block mb-2 font-Monda">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full p-2 rounded-md border ${submitted && errors.name ? 'border-red-500' : 'border-gray-400'} outline-none focus:ring-2 focus:ring-greenPrimary dark:bg-darkHover/30 dark:border-white/80`}/>
            {submitted && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </RevealItem>
          <RevealItem>
            <label className="block mb-2 mt-4 font-Monda">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`w-full p-2 rounded-md border ${submitted && errors.email ? 'border-red-500' : 'border-gray-400'} outline-none focus:ring-2 focus:ring-greenPrimary dark:bg-darkHover/30 dark:border-white/80`}/>
            {submitted && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </RevealItem>
          <RevealItem>
            <label className="block mb-2 mt-4 font-Monda">Message</label>
            <textarea rows="4"value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`w-full p-4 rounded-md border ${submitted && errors.message ? 'border-red-500' : 'border-gray-400'} outline-none focus:ring-2 focus:ring-greenPrimary dark:bg-darkHover/30 dark:border-white/80`}/>
            {submitted && errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </RevealItem>
          <RevealItem>
            <div className="flex justify-center mt-6">
              <button type="submit" className="px-10 py-3 rounded-full flex items-center gap-2 bg-black text-white hover:bg-black/90 transition">
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </RevealItem>
        </RevealGroup>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-greenPrimary text-white px-8 py-4 rounded-full shadow-lg text-lg">
              Message sent successfully
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Contact




