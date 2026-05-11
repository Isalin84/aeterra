import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import products from '../data/products.json'
import styles from './Advisor.module.css'

const questions = [
  {
    id: 'skinType',
    question: 'Как ведёт себя ваша кожа к середине дня?',
    options: [
      { label: 'Ощущается комфортно, без блеска и стянутости', value: 'normal' },
      { label: 'Блестит в Т-зоне, щёки нормальные', value: 'combination' },
      { label: 'Появляется блеск по всему лицу', value: 'oily' },
      { label: 'Чувствуется стянутость, иногда шелушение', value: 'dry' },
      { label: 'Кожа реагирует покраснением или зудом на новые средства', value: 'sensitive' },
    ],
  },
  {
    id: 'goal',
    question: 'Что сейчас важнее всего для вашей кожи?',
    options: [
      { label: 'Увлажнение и комфорт', value: 'hydration' },
      { label: 'Выравнивание тона и сияние', value: 'brightening' },
      { label: 'Борьба с морщинами и потерей упругости', value: 'renewal' },
      { label: 'Очищение пор и матирование', value: 'purifying' },
      { label: 'Успокоение и снижение чувствительности', value: 'balancing' },
    ],
  },
  {
    id: 'age',
    question: 'Ваша возрастная группа?',
    options: [
      { label: '18–24 года', value: 'young' },
      { label: '25–34 года', value: 'mid' },
      { label: '35–44 года', value: 'mature' },
      { label: '45+ лет', value: 'senior' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'Что описывает вашу кожу сейчас?',
    options: [
      { label: 'Часто бываю на улице, стресс + городская среда', value: 'stress' },
      { label: 'Работаю за компьютером большую часть дня', value: 'indoor' },
      { label: 'Активный образ жизни, спорт, много солнца', value: 'active' },
      { label: 'Хочу минимизировать уход, но результат должен быть', value: 'minimal' },
    ],
  },
  {
    id: 'ritual',
    question: 'Сколько шагов в вашем идеальном ритуале?',
    options: [
      { label: '1–2 шага, не хочу сложностей', value: 'simple' },
      { label: '3–4 шага — стандартный ритуал', value: 'standard' },
      { label: 'Люблю многоступенчатый уход', value: 'layered' },
    ],
  },
]

const recommendations = {
  'dry+renewal': ['pura', 'noctua', 'luminis'],
  'oily+purifying': ['terra', 'verde', 'probiome'],
  'combination+brightening': ['aurora', 'alba', 'verde'],
  'sensitive+balancing': ['clara', 'verde', 'noctua'],
  'normal+hydration': ['aurora', 'pura'],
  'dry+hydration': ['verde', 'noctua', 'luminis'],
  'normal+renewal': ['pura', 'aurora'],
  'oily+hydration': ['verde', 'probiome'],
  'combination+renewal': ['pura', 'aurora', 'alba'],
  'sensitive+renewal': ['noctua', 'clara'],
}

function getRecommendations(answers) {
  const key = `${answers.skinType}+${answers.goal}`
  const slugs = recommendations[key] || ['aurora', 'pura', 'verde']
  return products.filter(p => slugs.includes(p.slug))
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Advisor() {
  const [step, setStep] = useState(-1) // -1 = intro, 0-4 = questions, 5 = loading, 6 = result
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  const handleStart = () => {
    setStep(0)
    setSelected(null)
  }

  const handleSelect = (value) => {
    setSelected(value)
  }

  const handleNext = () => {
    if (selected === null) return
    const q = questions[step]
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)
    setSelected(null)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setStep(5)
      setTimeout(() => setStep(6), 2500)
    }
  }

  const recommended = step === 6 ? getRecommendations(answers) : []

  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div key="intro" className={styles.intro} {...fadeUp}>
              <img
                src="/assets_web/avatar/aeterra_avatar_ana.webp"
                alt="Ана" className={styles.avatar}
              />
              <span className={styles.eyebrow}>AI Advisor</span>
              <h1 className={styles.title}>Ваш персональный ритуал</h1>
              <p className={styles.sub}>
                5 вопросов — и я составлю ритуал ухода, который подходит именно вашей коже. Без лишнего. Только то, что нужно.
              </p>
              <button className={styles.startBtn} onClick={handleStart}>
                Начать
              </button>
            </motion.div>
          )}

          {step >= 0 && step < questions.length && (
            <motion.div key={`q${step}`} className={styles.question} {...fadeUp}>
              <div className={styles.progress}>
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className={styles.progressLabel}>{step + 1} / {questions.length}</span>
              </div>

              <h2 className={styles.questionText}>{questions[step].question}</h2>

              <div className={styles.options}>
                {questions[step].options.map(opt => (
                  <button
                    key={opt.value}
                    className={`${styles.option} ${selected === opt.value ? styles.optionSelected : ''}`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span className={styles.optionDot} />
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                className={styles.nextBtn}
                onClick={handleNext}
                disabled={selected === null}
              >
                {step === questions.length - 1 ? 'Получить результат' : 'Далее →'}
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="loading" className={styles.loading} {...fadeUp}>
              <div className={styles.loadingDots}>
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className={styles.dot}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
                  />
                ))}
              </div>
              <p className={styles.loadingText}>Анализирую ваши ответы...</p>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="result" className={styles.result} {...fadeUp}>
              <span className={styles.eyebrow}>Ваш результат</span>
              <h2 className={styles.resultTitle}>Ваш ритуал AETERRA</h2>
              <p className={styles.resultSub}>
                На основе ваших ответов я подобрала {recommended.length} средства, которые работают как система.
              </p>

              <div className={styles.resultGrid}>
                {recommended.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className={styles.resultCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                  >
                    <div className={styles.resultImg}>
                      <img src={`/${p.cardImage}`} alt={p.name} />
                    </div>
                    <div className={styles.resultInfo}>
                      <h3 className={styles.resultName}>{p.name}</h3>
                      <p className={styles.resultTagline}>{p.tagline}</p>
                      <span className={styles.resultPrice}>{p.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={styles.resultActions}>
                <Link to="/shop" className={styles.shopBtn}>Смотреть в каталоге →</Link>
                <button className={styles.retryBtn} onClick={() => { setStep(-1); setAnswers({}) }}>
                  Пройти снова
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
