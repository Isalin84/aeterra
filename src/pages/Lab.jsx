import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import articles from '../data/articles.json'
import styles from './Lab.module.css'

export default function Lab() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Знания
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Лаборатория знаний
          </motion.h1>
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Дерматология. Биохимия. Честность.
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className={styles.tag}>{article.tag}</span>
              <h2 className={styles.cardTitle}>
                <Link to={`/lab/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className={styles.lead}>{article.lead}</p>
              <div className={styles.footer}>
                <span className={styles.readTime}>{article.readTime}</span>
                <Link to={`/lab/${article.slug}`} className={styles.readLink}>
                  Читать →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
