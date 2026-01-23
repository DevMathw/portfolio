'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/hooks/useLanguage'
import texts from '@/components/language/texts'
import { FiChevronDown } from 'react-icons/fi'
import "flag-icons/css/flag-icons.min.css";

const LANGS = [
  { code: 'en', flag: 'us', ariaLabel: 'Change language to English' },
  { code: 'es', flag: 'es', ariaLabel: 'Cambiar idioma a Español' },
]

const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const t = texts[lang].languages

  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)} aria-label="Change language" className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 dark:border-white/40 hover:bg-gray-100 dark:hover:bg-white/10 transition">
        <span className={`fi fi-${lang === 'en' ? 'us' : 'es'} w-5 h-4 rounded-sm`} />
        <span className="text-sm font-medium">{lang.toUpperCase()}</span>
        <FiChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden bg-white dark:bg-darkTheme shadow-lg border border-gray-200 dark:border-white/10 z-50">
          {LANGS.map(({ code, flag, ariaLabel }) => (
            <button aria-label={ariaLabel} key={code} 
            onClick={() => {
                changeLanguage(code)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm
              hover:bg-gray-100 dark:hover:bg-white/10 transition
              ${lang === code ? 'font-semibold text-green700 dark:text-green400' : ''}`}
            >
              <span className={`fi fi-${flag} w-5 h-4 rounded-sm`} />
              {t[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher