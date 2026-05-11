import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'

const navLinks = [
  { to: '/story', label: 'История' },
  { to: '/shop', label: 'Каталог' },
  { to: '/lab', label: 'Лаборатория' },
  { to: '/sourcing', label: 'Карта поставок' },
  { to: '/inner-compass', label: 'Inner Compass' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src="/assets_web/brand/aeterra_logo_dark.webp" alt="AETERRA" />
        </Link>

        <nav className={styles.nav}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `${styles.drawerLink} ${isActive ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
