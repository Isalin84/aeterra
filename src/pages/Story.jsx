import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import styles from './Story.module.css'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

const timeline = [
  { year: '2019', title: 'Точка остановки', text: 'Анна и Илья уходят из корпораций. Без плана, просто останавливаются. Первые три месяца они только задают вопросы. Главный из них - можно ли вообще сделать честную косметику.' },
  { year: '2020', title: 'Исландия', text: 'Первое путешествие — за ответом. Ледниковые поля, термальные источники, мох, который живёт при −20°C. Первое открытие: природа уже решила большинство задач, которые косметическая индустрия считает нерешёнными.' },
  { year: '2020', title: 'Амазония', text: 'Три недели в джунглях с ботаниками. Масло праксаши. Кактус опунции. Растения, которые миллионы лет развивали механизмы защиты кожи — своей собственной. Второе открытие: самые эффективные ингредиенты — самые скромные по виду.' },
  { year: '2021', title: 'Первая лаборатория', text: 'Аренда небольшой лаборатории. Первые формулы. Первые провалы. Принцип «чистого листа»: если компонент нельзя объяснить простым языком — его нет в составе.' },
  { year: '2022', title: 'Первый отказ', text: 'Поставщик нарушил экологические стандарты. Формула уже готова. Анна и Илья останавливают выпуск. Переделывают всё с нуля. Это заняло четыре месяца. Это было правильно.' },
  { year: '2024', title: 'AETERRA', text: 'На старте выходит манифест вместо рекламной кампании. Первые 500 наборов разбирают за 72 часа. Люди давно ждали честности.' },
]

const founders = [
  {
    name: 'Анна',
    role: 'Биохимик / Сооснователь',
    bio: 'Биохимик, специализация — трансдермальные системы доставки. Убеждена, что лучший ингредиент — тот, который кожа «узнаёт» как свой.',
    img: '/assets_web/founders/aeterra_ana_portrait_hero.webp',
  },
  {
    name: 'Илья',
    role: 'Фармаколог / Сооснователь',
    bio: 'Фармаколог, 12 лет в разработке активных веществ. Считает, что косметика должна быть объяснима так же чётко, как лекарство.',
    img: '/assets_web/founders/aeterra_elias_portrait.webp',
  },
]

export default function Story() {
  return (
    <div className={styles.page}>
      <PageHero
        variant="cinematic"
        eyebrow="История бренда"
        title="Как это было на самом деле"
        sub="Без ретуши: два выгоревших биохимика, четыре месяца переделок и один отказ от готовой формулы."
        video="/assets_web/video/aeterra_video_founders_story.mp4"
        poster="/assets_web/video/posters/aeterra_video_founders_story.webp"
        ariaLabel="Основатели AETERRA"
        sound
      />

      <div className="container">
        {/* Вступление */}
        <motion.div className={styles.intro} {...fadeUp}>
          <p>
            Илья и Анна — два биохимика с десятилетним опытом в индустрии. Они знали, как устроен масс-маркет изнутри: маркетинговые бюджеты, которые в 10 раз превышают затраты на разработку; составы, где 95% — вода и стабилизаторы; обещания, которые невозможно выполнить.
          </p>
          <p>
            В 2019 году оба оказались на грани выгорания. Больше всего изматывала бессмысленность того, чем они занимались.
          </p>
        </motion.div>

        {/* Таймлайн */}
        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={styles.timelineItem}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineBody}>
                <div className={styles.timelineDot} />
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineText}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Основатели */}
        <section className={styles.founders}>
          <motion.h2 className={styles.foundersTitle} {...fadeUp}>
            Основатели
          </motion.h2>
          <div className={styles.foundersGrid}>
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                className={styles.founder}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.founderImg}>
                  <img src={f.img} alt={f.name} loading="lazy" decoding="async" />
                </div>
                <div className={styles.founderInfo}>
                  <p className={styles.founderRole}>{f.role}</p>
                  <h3 className={styles.founderName}>{f.name}</h3>
                  <p className={styles.founderBio}>{f.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
