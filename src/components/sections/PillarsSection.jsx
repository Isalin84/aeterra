import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import styles from './PillarsSection.module.css'

const pillars = [
  {
    number: '01',
    title: 'Чистота',
    heading: 'Минимум компонентов',
    text: 'Каждый ингредиент — с научным обоснованием и натуральным происхождением. Если он не нужен коже, его нет в составе.',
  },
  {
    number: '02',
    title: 'Наука',
    heading: 'Биотехнология на службе природы',
    text: 'Мы не заменяем природные механизмы — мы усиливаем их. Каждая формула разработана совместно с дерматологами и биохимиками.',
  },
  {
    number: '03',
    title: 'Этика',
    heading: 'Честность без исключений',
    text: 'Полная прозрачность состава и происхождения. Мы откажемся от поставщика, если он нарушит этические нормы — это уже случалось.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

export default function PillarsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle label="Философия" title="Наш фундамент" />
        <div className={styles.grid}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              className={styles.pillar}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className={styles.number}>{p.number}</span>
              <div className={styles.divider} />
              <p className={styles.pillarTitle}>{p.title}</p>
              <h3 className={styles.heading}>{p.heading}</h3>
              <p className={styles.text}>{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
