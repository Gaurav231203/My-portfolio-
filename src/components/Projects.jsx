import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { projectMeta } from '../data.js'

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          {t('projects.title')}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-bold sm:text-5xl">
          {t('projects.subtitle')}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {list.map((item, i) => {
          const meta = projectMeta[i] || projectMeta[0]
          return (
            <Reveal key={i} delay={0.05 * i}>
              <TiltCard className="h-full rounded-3xl">
                <article className="glass group relative h-full overflow-hidden rounded-3xl p-6">
                  <div
                    className={`mb-6 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-6xl shadow-inner`}
                  >
                    <span className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                      {meta.emoji}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm opacity-70">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                    →
                  </span>
                </article>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
