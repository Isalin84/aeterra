import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './NotFound.module.css'

const ease = [0.25, 0.1, 0.25, 1]

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.mark}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 32 32">
            <path d="M16 3 27.26 9.5v13L16 29 4.74 22.5v-13Z" />
            <circle cx="16" cy="16" r="1.9" />
          </svg>
        </motion.div>

        <motion.p
          className={styles.code}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          404
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
        >
          Этой страницы нет
        </motion.h1>

        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease }}
        >
          Возможно, адрес изменился или в ссылке опечатка. Коллекция и лаборатория на месте.
        </motion.p>

        <motion.nav
          className={styles.links}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease }}
        >
          <Link to="/shop" className={styles.primary}>В каталог</Link>
          <Link to="/" className={styles.secondary}>На главную</Link>
        </motion.nav>
      </div>
    </section>
  )
}
