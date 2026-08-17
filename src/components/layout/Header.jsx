import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import styles from './Header.module.css'

const navLinks = [
  { to: '/story', label: 'История' },
  { to: '/shop', label: 'Каталог' },
  { to: '/lab', label: 'Лаборатория' },
  { to: '/sourcing', label: 'Карта поставок' },
  { to: '/inner-compass', label: 'Inner Compass' },
]

export default function Header() {
  // Начальное значение считаем сразу, а не через setState в эффекте: при заходе
  // на уже прокрученную страницу хедер иначе мигнул бы прозрачным
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef(null)

  /* Здесь решается только «мы наверху и меню закрыто». Нужен ли поверх этого
     светлый вариант, решает CSS по наличию [data-hero="cinematic"] в разметке
     страницы. Раньше на месте этого стоял список маршрутов, и он разошёлся с
     вёрсткой: на /lab, /story и /sourcing тёмный герой начинался на 72px ниже
     хедера, так что белые ссылки и логотип оказывались на белом фоне. */
  const atTop = !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Пока меню открыто: Esc закрывает, страница под ним не скроллится,
  // фокус возвращается на кнопку — иначе он остаётся в невидимой панели
  useEffect(() => {
    if (!menuOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        burgerRef.current?.focus()
      }
    }

    /* Закрываем прокрутку и на <html>, а не только на <body>: по спецификации
       overflow с body доходит до вьюпорта лишь пока у корня он visible, и
       iOS Safari это правило не соблюдает вовсе. */
    const root = document.documentElement
    const prev = { root: root.style.overflow, body: document.body.style.overflow }
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    return () => {
      root.style.overflow = prev.root
      document.body.style.overflow = prev.body
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      {/* Затемнение страницы вынесено из <header> и стоит его соседом.
          У хедера есть backdrop-filter, а элемент с фильтром становится
          контейнером для position: fixed внутри себя — скрим растягивался не по
          окну, а по полосе хедера с меню (72–405px вместо 72–812px). Ниже него
          страница оставалась и незатемнённой, и кликабельной: тап мимо меню
          открывал карточку товара вместо закрытия. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className={`${styles.header} ${atTop ? styles.atTop : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label="AETERRA — на главную">
            {/* Один файл на оба состояния: поверх видео логотип выбеливается фильтром.
                Готовый aeterra_logo_light.webp тут не годится — это квадрат 1254×1254
                с логотипом на залитом фоне, без прозрачности и с другой обрезкой,
                поэтому знак не совпал бы по размеру и месту. */}
            <img
              src="/assets_web/brand/aeterra_logo_dark.webp"
              alt="AETERRA"
              width="934"
              height="357"
            />
          </Link>

          <LayoutGroup>
            <nav className={styles.nav} aria-label="Основная навигация">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      <span className={styles.linkLabel}>{label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className={styles.navIndicator}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </LayoutGroup>

          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              className={styles.drawer}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) => `${styles.drawerLink} ${isActive ? styles.active : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
