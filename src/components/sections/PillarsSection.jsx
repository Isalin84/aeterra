import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import styles from './PillarsSection.module.css'

/* Номеров 01/02/03 здесь больше нет. Чистота, Наука и Этика — не этапы
   процесса, а три равноправных принципа: нумерация обещала читателю порядок,
   которого в содержании нет. Плюс на светлом грунте она всё равно почти не
   читалась. Роль опознавательного знака взяли на себя бренд-иконки. */
const pillars = [
  {
    title: 'Чистота',
    heading: 'Минимум компонентов',
    text: 'Каждый ингредиент — с научным обоснованием и натуральным происхождением. Если он не нужен коже, его нет в составе.',
    icon: '/assets_web/brand/aeterra_icon_drop.webp',
  },
  {
    title: 'Наука',
    heading: 'Биотехнология на службе природы',
    text: 'Биотехнология здесь усиливает то, что уже умеет кожа. Каждая формула разработана вместе с дерматологами и биохимиками.',
    icon: '/assets_web/brand/aeterra_icon_molecule.webp',
  },
  {
    title: 'Этика',
    heading: 'Честность без исключений',
    text: 'Полная прозрачность состава и происхождения. Мы откажемся от поставщика, если он нарушит этические нормы — это уже случалось.',
    icon: '/assets_web/brand/aeterra_icon_leaf.webp',
  },
]

export default function PillarsSection() {
  return (
    <section className={styles.section}>
      {/* Раскладка «редакционный разворот»: заголовок закреплён в левой колонке
          и держит контекст, пока справа прокручиваются принципы. Прежняя
          диагональная лестница читалась как случайно разбросанные блоки —
          у элементов не было ни общей базовой линии, ни общего левого края. */}
      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <SectionTitle label="Философия" title="Наш фундамент" flush />
          <p className={styles.headNote}>
            Три принципа, из которых выводится каждое решение — от выбора поставщика
            до строки в составе.
          </p>
        </div>

        <div className={styles.list}>
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              className={styles.pillar}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={p.icon}
                alt=""
                aria-hidden="true"
                className={styles.icon}
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
              />
              <div className={styles.body}>
                <p className={styles.pillarTitle}>{p.title}</p>
                <h3 className={styles.heading}>{p.heading}</h3>
                <p className={styles.text}>{p.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
