import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './InnerCompass.module.css'

const cases = [
  {
    tag: 'Честность',
    title: 'Когда мы остановили выпуск продукта',
    text: 'В 2022 году наш поставщик нарушил экологические стандарты после нескольких лет безупречной работы. К тому моменту формула была готова, флаконы заполнены. Мы остановили всё. Слили партию. Нашли нового поставщика и переделали состав за четыре месяца. Убыток был существенным. По-другому мы поступить не могли.',
    lesson: 'Ценности — это то, что вы делаете, когда это дорого стоит.',
  },
  {
    tag: 'Прозрачность',
    title: 'Когда наш продукт не подошёл',
    text: 'Клиент купил NOCTUA Cream для жирной кожи, хотя на странице продукта чётко указано — для сухой и нормальной. Наш консультант предложил обмен на TERRA Mask. Клиент вернул деньги и ушёл. Мы не пытались его удержать. Через месяц он вернулся сам — с покупкой на 15 000 ₽.',
    lesson: null,
  },
  {
    tag: 'Качество',
    title: 'Партия, которую мы уничтожили',
    text: 'При контроле качества были обнаружены отклонения в pH одной партии PURA Serum — 0.3 единицы от нормы. Внешне это незаметно, клинически — скорее всего, несущественно. Мы всё равно уничтожили всю партию. 2 400 флаконов.',
    lesson: null,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Manifesto() {
  return (
    <div className={styles.innerPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/inner-compass">Inner Compass</Link>
          <span>/</span>
          <span>Манифест</span>
        </div>

        <motion.div
          className={styles.innerHero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.eyebrow}>Манифест в действии</span>
          <h1 className={styles.innerTitle}>Ценности в реальных ситуациях</h1>
        </motion.div>

        <div className={styles.cases}>
          {cases.map((c, i) => (
            <motion.div key={i} className={styles.caseCard} {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.1 }}>
              <span className={styles.caseTag}>{c.tag}</span>
              <h2 className={styles.caseTitle}>{c.title}</h2>
              <p className={styles.caseText}>{c.text}</p>
              {c.lesson && <p className={styles.caseLesson}>{c.lesson}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
