import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={t('theme.toggle')}
      className="relative flex h-10 w-10 items-center justify-center rounded-full glass transition hover:scale-105"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
    </button>
  )
}
