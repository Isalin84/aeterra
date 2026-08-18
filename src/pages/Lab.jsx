import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import articles from '../data/articles.json'
import styles from './Lab.module.css'

export default function Lab() {
  return (
    <div className={styles.page}>
      <PageHero
        variant="cinematic"
        eyebrow="Знания"
        title="Лаборатория знаний"
        sub="Дерматология, биохимия и честные ответы на вопросы, которые индустрия предпочитает обходить."
        video="/assets_web/video/aeterra_video_lab_science.mp4"
        poster="/assets_web/video/posters/aeterra_video_lab_science.webp"
        ariaLabel="Лаборатория AETERRA"
        sound
      />

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
              {article.image && (
                <Link
                  to={`/lab/${article.slug}`}
                  className={styles.cardImgWrap}
                  /* Обложка ведёт туда же, куда заголовок ниже. Для скринридера
                     это был бы второй безымянный дубль той же ссылки. */
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img src={article.image} alt="" className={styles.cardImg} loading="lazy" decoding="async" />
                </Link>
              )}
              {/* Общая обёртка текста: у первой статьи-разворота она встаёт
                  во вторую колонку сетки, у остальных — обычной колонкой */}
              <div className={styles.body}>
                <span className={styles.tag}>{article.tag}</span>
                <h2 className={styles.cardTitle}>
                  <Link to={`/lab/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className={styles.lead}>{article.lead}</p>
                <div className={styles.footer}>
                  <span className={styles.readTime}>{article.readTime}</span>
                  <Link to={`/lab/${article.slug}`} className={styles.readLink}>
                    Читать
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
