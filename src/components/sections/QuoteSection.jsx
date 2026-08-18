import { motion } from 'framer-motion'
import styles from './QuoteSection.module.css'

export default function QuoteSection() {
  // theme-dark переопределяет токены текста и границ под тёмный фон —
  // класс был описан в tokens.css и до сих пор нигде не применялся
  return (
    <section className={`theme-dark ${styles.section}`}>
      <div className={styles.bg} />
      <div className={`container ${styles.content}`}>
        <motion.blockquote
          className={styles.quote}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className={styles.text}>
            «Природа уже создала совершенные механизмы регенерации. Наша работа — понять их и усилить.»
          </p>
          <footer className={styles.author}>— Анна, сооснователь AETERRA</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
