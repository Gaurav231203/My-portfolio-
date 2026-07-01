import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { id: 'home', href: '#home' },
  { id: 'about', href: '#about' },
  { id: 'projects', href: '#projects' },
  { id: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled ? 'glass mx-3' : 'mx-3 bg-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-warm text-white">
            G
          </span>
          <span className="gradient-text">Gaurav</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium opacity-80 transition hover:bg-accent/10 hover:opacity-100"
              >
                {t(`nav.${l.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <div className="relative h-4 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 block h-0.5 w-5 rounded bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-3 block h-0.5 w-5 rounded bg-current"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl glass p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium transition hover:bg-accent/10"
                  >
                    {t(`nav.${l.id}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
