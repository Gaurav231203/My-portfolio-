import { Suspense, lazy, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const Scene3D = lazy(() => import('./Scene3D.jsx'))

function useRotatingRole(roles) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    setIndex(0)
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles])
  return roles[index]
}

export default function Hero() {
  const { t } = useTranslation()
  const roles = t('hero.roles', { returnObjects: true })
  const role = useRotatingRole(Array.isArray(roles) ? roles : [String(roles)])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 md:grid-cols-2 md:gap-4">
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-accent"
          >
            {t('hero.greeting')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {t('hero.name')}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 h-9 text-2xl font-semibold sm:text-3xl"
          >
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="gradient-text inline-block"
            >
              {role}
            </motion.span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-md text-base opacity-70 md:mx-0 md:text-lg"
          >
            {t('hero.tagline')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-accent to-accent-warm px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:scale-105"
            >
              {t('hero.cta')}
            </a>
            <a
              href="#contact"
              className="rounded-full glass px-6 py-3 text-sm font-semibold transition hover:scale-105"
            >
              {t('hero.cta2')}
            </a>
          </motion.div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto h-[300px] w-full max-w-md sm:h-[380px] md:h-[460px]">
            <div className="absolute inset-0 -z-10 animate-float rounded-full bg-accent/20 blur-3xl" />
            <Suspense
              fallback={
                <div className="grid h-full place-items-center">
                  <div className="h-24 w-24 animate-float rounded-full bg-gradient-to-br from-accent to-accent-warm opacity-70 blur-sm" />
                </div>
              }
            >
              <Scene3D />
            </Suspense>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest opacity-60 sm:flex"
      >
        {t('hero.scroll')}
        <span className="flex h-8 w-5 justify-center rounded-full border border-current pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1 rounded-full bg-current"
          />
        </span>
      </motion.a>
    </section>
  )
}
