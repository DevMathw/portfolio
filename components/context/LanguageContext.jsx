'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import texts from '@/components/language/texts'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en')
  
  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved) setLang(saved)
  }, [])

  const changeLanguage = (newLang) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t: texts[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => useContext(LanguageContext)