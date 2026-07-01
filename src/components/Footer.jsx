import { useTranslation } from 'react-i18next'

const socials = [
  { label: 'GitHub', href: '#', icon: '⌘' },
  { label: 'Dribbble', href: '#', icon: '◐' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'X', href: '#', icon: '𝕏' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-6xl px-5 py-10">
      <div className="glass flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-warm text-sm text-white">
            A
          </span>
          <span className="gradient-text">Aurora Vale</span>
        </div>
        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-sm transition hover:scale-110 hover:bg-accent/20"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p className="text-center text-xs opacity-60 sm:text-right">
          © {year} Aurora Vale. {t('footer.rights')}
          <br className="hidden sm:block" />
          {t('footer.made')}
        </p>
      </div>
    </footer>
  )
}
