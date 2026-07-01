import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const { t } = useTranslation()
  const email = t('contact.email')

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-5 py-24 sm:py-32">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2.5rem] p-10 text-center sm:p-16">
          <div className="aurora-bg pointer-events-none absolute inset-0 -z-10 opacity-70" />
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            {t('contact.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg opacity-75">
            {t('contact.subtitle')}
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-warm px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/30 transition hover:scale-105"
          >
            {t('contact.cta')} ✦
          </a>
          <p className="mt-6 text-sm opacity-60">{email}</p>
        </div>
      </Reveal>
    </section>
  )
}
