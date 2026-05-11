import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const links = [
  { to: '/story', label: 'История' },
  { to: '/shop', label: 'Каталог' },
  { to: '/lab', label: 'Лаборатория' },
  { to: '/sourcing', label: 'Карта' },
  { to: '/inner-compass', label: 'Inner Compass' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <img src="/assets_web/brand/aeterra_logo_dark.webp" alt="AETERRA" className={styles.logo} />
          <p className={styles.slogan}>AETERRA — наука быть собой</p>
        </div>

        <nav className={styles.nav}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={styles.link}>{label}</Link>
          ))}
        </nav>

        <p className={styles.copy}>© 2026 AETERRA. Все права защищены.</p>
      </div>
    </footer>
  )
}
