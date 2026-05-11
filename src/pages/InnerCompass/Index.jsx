import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './InnerCompass.module.css'

const sections = [
  { to: '/inner-compass/manifesto', label: 'Манифест в действии', sub: 'Ценности в реальных ситуациях' },
  { to: '/inner-compass/standards', label: 'Стандарты совершенства', sub: 'Как мы говорим и что имеем в виду' },
  { to: '/inner-compass/knowledge', label: 'База знаний', sub: 'Курсы для команды' },
]

export default function InnerCompassIndex() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className={styles.eyebrow}>Внутренний навигатор</span>
          <h1 className={styles.title}>Inner Compass</h1>
          <p className={styles.sub}>
            Внутренний навигатор команды AETERRA. Здесь — не корпоративные правила. Здесь — то, во что мы верим и как это применяем каждый день.
          </p>
        </motion.div>

        <div className={styles.links}>
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link to={s.to} className={styles.sectionLink}>
                <div className={styles.sectionNum}>0{i + 1}</div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{s.label}</h2>
                  <p className={styles.sectionSub}>{s.sub}</p>
                </div>
                <span className={styles.arrow}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
