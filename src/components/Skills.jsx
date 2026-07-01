import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { skills, skillCopy } from '../data.js'

export default function Skills() {
  const { t, i18n } = useTranslation()
  const lang = skillCopy.design[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'en'

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          {t('skills.title')}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => {
          const copy = skillCopy[skill.key][lang]
          return (
            <Reveal key={skill.key} delay={0.05 * i}>
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
