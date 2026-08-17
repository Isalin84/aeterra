import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AmbientVideo from '../ui/AmbientVideo'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    /* data-hero — признак для хедера: поверх полноэкранного видео он переходит
       в светлый прозрачный вариант. Признак живёт в разметке, а не в списке
       маршрутов внутри хедера, поэтому разъехаться с вёрсткой не может. */
    <section className={styles.hero} data-hero="cinematic">
      <AmbientVideo
        className={styles.video}
        src="/assets_web/video/aeterra_hero_video.mp4"
        poster="/assets_web/video/posters/aeterra_hero_video.webp"
      />
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Молекулярный минимализм
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Красота в её<br />молекулярном<br />совершенстве
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Натуральные ингредиенты с научным обоснованием каждого.<br />
          Без компромиссов.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link to="/shop" className={styles.cta}>
            Открыть коллекцию
            <svg className={styles.ctaArrow} width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
              <path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <div className={styles.scroll}>
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
