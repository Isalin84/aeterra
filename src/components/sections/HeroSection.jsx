import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src="/assets_web/video/aeterra_hero_video.mp4"
        poster="/assets_web/backgrounds/aeterra_bg_hero.webp"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Молекулярный минимализм
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Красота в её<br />молекулярном<br />совершенстве
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Натуральные ингредиенты. Научное обоснование каждого.<br />
          Никаких компромиссов.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link to="/shop" className={styles.cta}>Открыть коллекцию</Link>
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
