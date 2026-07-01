import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import { stats } from '../data.js'

export default function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 to-accent-warm/20 blur-2xl" />
            <div className="glass aspect-square w-full rounded-[2rem] p-1">
              <div className="grid h-full place-items-center rounded-[1.8rem] bg-gradient-to-br from-accent/10 via-transparent to-accent-warm/10">
                <div className="animate-float text-8xl">🧑‍🎨</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              {t('about.title')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed opacity-75">
              {t('about.body')}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.key} delay={0.15 + i * 0.1}>
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="gradient-text font-display text-3xl font-bold sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs opacity-70 sm:text-sm">
                    {t(`about.stats.${s.key}`)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
