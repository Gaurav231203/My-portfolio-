import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { languages } from '../i18n/config.js'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current =
    languages.find((l) => l.code === i18n.resolvedLanguage) || languages[0]

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-2 rounded-full glass px-3 py-2 text-sm font-medium transition hover:scale-105"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl glass p-1.5"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  role="option"
                  aria-selected={lang.code === current.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-accent/10 ${
                    lang.code === current.code ? 'text-accent font-semibold' : ''
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  {lang.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
