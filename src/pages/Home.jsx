import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import PillarsSection from '../components/sections/PillarsSection'
import BestsellersSection from '../components/sections/BestsellersSection'
import QuoteSection from '../components/sections/QuoteSection'
import styles from './Home.module.css'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <BestsellersSection />

      {/* Тизер истории */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div className={styles.storyImg} {...fadeUp}>
              <img
                src="/assets_web/founders/aeterra_founders_together.webp"
                alt="Основатели AETERRA"
              />
            </motion.div>
            <motion.div
              className={styles.storyText}
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className={styles.storyEyebrow}>История бренда</span>
              <h2 className={styles.storyTitle}>Это началось с выгорания</h2>
              <p className={styles.storyBody}>
                Илья и Анна десять лет делали косметику для масс-маркета и однажды поняли, что так больше не могут. Уволились и уехали. Сначала Исландия, потом Амазония. Хотели понять, из чего складывается уход, за который не стыдно.
              </p>
              <Link to="/story" className={styles.storyLink}>Читать историю →</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  )
}
