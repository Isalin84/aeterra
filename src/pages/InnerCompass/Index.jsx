import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../../components/ui/PageHero'
import styles from './InnerCompass.module.css'

/* Нумерация здесь оставлена намеренно: это порядок чтения внутреннего
   справочника — сначала ценности, затем как о них говорить, затем обучение.
   Раньше номера стояли в --color-border и на светлом фоне не читались. */
const sections = [
  {
    to: '/inner-compass/manifesto',
    num: '01',
    label: 'Манифест в действии',
    sub: 'Ценности в реальных ситуациях',
    note: 'Три случая, где принципы стоили нам денег',
    image: '/assets_web/compass/aeterra_compass_manifesto.webp',
  },
  {
    to: '/inner-compass/standards',
    num: '02',
    label: 'Стандарты совершенства',
    sub: 'Как мы говорим и что имеем в виду',
    note: 'Тон голоса, запрещённые формулировки, правила',
    image: '/assets_web/compass/aeterra_compass_standards.webp',
  },
  {
    to: '/inner-compass/knowledge',
    num: '03',
    label: 'База знаний',
    sub: 'Курсы для команды',
    note: 'Пять программ: от химии состава до сложных диалогов',
    image: '/assets_web/compass/aeterra_compass_knowledge.webp',
  },
]

export default function InnerCompassIndex() {
  return (
    <div className={styles.page}>
      <PageHero
        variant="cinematic"
        eyebrow="Внутренний навигатор"
        title="Inner Compass"
        sub="Здесь не корпоративные правила. Здесь то, во что мы верим, и то, как это применяется каждый день — включая случаи, когда это дорого стоило."
        video="/assets_web/video/aeterra_video_compass.mp4"
        poster="/assets_web/video/posters/aeterra_video_compass.webp"
        ariaLabel="Капля масла на гексагональном камне"
        sound
      />

      <div className="container">
        <div className={styles.links}>
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to={s.to} className={styles.sectionLink}>
                {/* alt пустой: название раздела идёт текстом рядом, внутри той
                    же ссылки — озвучивать дважды нет смысла */}
                <img
                  src={s.image}
                  alt=""
                  className={styles.sectionImg}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.sectionBody}>
                  <span className={styles.sectionNum} aria-hidden="true">{s.num}</span>
                  {/* h2, а не span: иначе ниже h1 на странице не остаётся
                      ни одного заголовка и по разделам нельзя пройти навигацией
                      по структуре */}
                  <h2 className={styles.sectionTitle}>{s.label}</h2>
                  <span className={styles.sectionSub}>{s.sub}</span>
                  <span className={styles.sectionNote}>{s.note}</span>
                </span>
                <svg
                  className={styles.arrow}
                  width="22" height="10" viewBox="0 0 22 10"
                  fill="none" aria-hidden="true"
                >
                  <path d="M0 5h19M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
