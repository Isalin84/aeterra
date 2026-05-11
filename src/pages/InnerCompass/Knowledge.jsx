import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './InnerCompass.module.css'

const courses = [
  { num: '01', title: 'Основы косметической химии для консультантов', desc: 'pH, активные ингредиенты, INCI-состав. Базовая теория для уверенного диалога с клиентом.' },
  { num: '02', title: 'Типы кожи: диагностика и подбор ухода', desc: 'Как определить тип кожи, какие маркеры важны, как строить рекомендацию.' },
  { num: '03', title: 'Как читать INCI-состав: от простого к сложному', desc: 'Практика: разбор реальных составов, поиск маркетинговых мифов.' },
  { num: '04', title: 'Экологические стандарты и этика поставок', desc: 'Почему источник важен так же, как формула. Наши критерии выбора поставщиков.' },
  { num: '05', title: 'Тон голоса AETERRA: практические кейсы', desc: 'Разбор реальных ситуаций — как отвечать клиентам в сложных случаях.' },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Knowledge() {
  return (
    <div className={styles.innerPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/inner-compass">Inner Compass</Link>
          <span>/</span>
          <span>База знаний</span>
        </div>

        <motion.div
          className={styles.innerHero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow}>База знаний</span>
          <h1 className={styles.innerTitle}>Учимся вместе</h1>
        </motion.div>

        <div className={styles.courses}>
          {courses.map((c, i) => (
            <motion.div
              key={c.num}
              className={styles.course}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className={styles.courseNum}>Курс {c.num}</span>
              <h2 className={styles.courseTitle}>{c.title}</h2>
              <p className={styles.ruleText}>{c.desc}</p>
              <span className={styles.courseBadge}>Скоро</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
