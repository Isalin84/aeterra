import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
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

function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  )
}

function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  )
}

export default function Story() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !muted
      videoRef.current.muted = newMuted
      setMuted(newMuted)
    }
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay muted playsInline
          src="/assets_web/video/aeterra_video_founders_story.mp4"
        />
        <div className={styles.heroOverlay} />
        <button className={styles.soundBtn} onClick={toggleSound} aria-label={muted ? 'Включить звук' : 'Выключить звук'}>
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            История бренда
          </motion.span>
          <motion.h1
            className={`${styles.title} ${styles.titleLight}`}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Как это было на самом деле
          </motion.h1>
          <motion.p
            className={`${styles.sub} ${styles.subLight}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            История бренда без ретуши.
          </motion.p>
        </div>
      </div>

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
                  <img src={f.img} alt={f.name} />
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
