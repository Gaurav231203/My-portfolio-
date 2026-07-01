import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { skills, skillCopy } from '../data.js'

export default function Skills() {
  const { t, i18n } = useTranslation()
  const lang = skillCopy.frontend[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'en'

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          {t('skills.title')}
        </h2>
      </Reveal>
      <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {skills.map((skill, i) => {
          const copy = skillCopy[skill.key][lang]
          return (
            <Reveal
              key={skill.key}
              delay={0.05 * i}
              className="w-64 shrink-0 snap-start sm:w-72"
            >
              <TiltCard className="h-full rounded-3xl" glare={false}>
                <div className="glass h-full rounded-3xl p-6">
                  <div
                    className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${skill.gradient} text-2xl`}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold">{copy.title}</h3>
                  <p className="mt-2 text-sm opacity-70">{copy.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
