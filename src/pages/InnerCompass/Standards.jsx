import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../../components/ui/PageHero'
import styles from './InnerCompass.module.css'

const dontSay = [
  { bad: '«Омолаживающий»', good: '«Стимулирует синтез коллагена»' },
  { bad: '«Революционная формула»', good: '«Формула с бакухиолом — растительным аналогом ретинола»' },
  { bad: '«Подходит для всех»', good: '«Рекомендуем для сухой и нормальной кожи»' },
  { bad: '«Ваша кожа преобразится»', good: '«Клинические испытания показали снижение глубины морщин на 23% за 8 недель»' },
  { bad: '«Натуральный» (без уточнения)', good: '«Ингредиент натурального происхождения из [источник]»' },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Standards() {
  return (
    <div className={styles.innerPage}>
      <PageHero
        variant="dark"
        eyebrow="Стандарты совершенства"
        title="Как мы говорим"
        sub="Тон голоса, запрещённые формулировки и правила, по которым проверяется каждый текст бренда."
        image="/assets_web/compass/aeterra_compass_standards.webp"
        breadcrumb={
          <>
            <Link to="/inner-compass">Inner Compass</Link>
            <span>/</span>
            <span>Стандарты</span>
          </>
        }
      />

      <div className="container">
        <div className={styles.standards}>
          <motion.div className={styles.toneBlock} {...fadeUp}>
            <h2 className={styles.toneTitle}>Тон голоса AETERRA</h2>
            <p className={styles.toneText}>
              Мы — умный друг, который разбирается в химии кожи. Не врач (не ставим диагнозы). Не продавец (не давим на покупку). Не профессор (не читаем лекции).
            </p>
          </motion.div>

          {/* Таблица прокручивается внутри своей области: на узком экране её
              min-content шире вьюпорта, и без обёртки она тянула по горизонтали
              всю страницу (на 278px переполнение доходило до 103px) */}
          <motion.div className={styles.tableWrap} {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Не говорим</th>
                  <th>Говорим</th>
                </tr>
              </thead>
              <tbody>
                {dontSay.map((row, i) => (
                  <tr key={i}>
                    <td>{row.bad}</td>
                    <td>{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div className={styles.rule} {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
            <h3 className={styles.ruleTitle}>Правило эмпатичного профессионализма</h3>
            <p className={styles.ruleText}>
              Если продукт клиенту не подходит — скажите об этом прямо. Предложите альтернативу или честно признайте, что в нашей линейке нет подходящего решения. Доверие важнее одной продажи.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
