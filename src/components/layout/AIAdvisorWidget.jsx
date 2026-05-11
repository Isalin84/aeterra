import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './AIAdvisorWidget.module.css'

export default function AIAdvisorWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.panelHeader}>
              <img
                src="/assets_web/avatar/aeterra_avatar_ana.webp"
                alt="Ана"
                className={styles.avatar}
              />
              <div>
                <p className={styles.panelName}>Ана</p>
                <p className={styles.panelRole}>Персональный консультант</p>
              </div>
            </div>
            <p className={styles.panelText}>
              Привет. Я помогу подобрать ваш ритуал ухода — честно и без лишнего.
            </p>
            <Link
              to="/advisor"
              className={styles.panelCta}
              onClick={() => setOpen(false)}
            >
              Пройти диагностику →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={styles.trigger}
        onClick={() => setOpen(v => !v)}
        aria-label="Открыть консультанта"
      >
        <img
          src="/assets_web/avatar/aeterra_avatar_ana.webp"
          alt="Ана"
          className={styles.triggerImg}
        />
      </button>
    </div>
  )
}
