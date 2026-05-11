import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import articles from '../data/articles.json'
import styles from './LabArticle.module.css'

export default function LabArticle() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article) return <Navigate to="/lab" replace />

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/lab">Лаборатория</Link>
          <span>/</span>
          <span>{article.tag}</span>
        </div>

        {article.image && (
          <motion.div
            className={styles.heroImg}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img src={article.image} alt={article.title} />
          </motion.div>
        )}

        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className={styles.tag}>{article.tag}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.lead}>{article.lead}</p>
          <span className={styles.readTime}>{article.readTime} чтения</span>
        </motion.header>

        <motion.div
          className={styles.body}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {article.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        <div className={styles.more}>
          <h2 className={styles.moreTitle}>Читать далее</h2>
          <div className={styles.moreList}>
            {articles
              .filter(a => a.slug !== slug)
              .slice(0, 3)
              .map(a => (
                <Link key={a.slug} to={`/lab/${a.slug}`} className={styles.moreItem}>
                  <span className={styles.moreTag}>{a.tag}</span>
                  <span className={styles.moreItemTitle}>{a.title}</span>
                  <span className={styles.moreTime}>{a.readTime}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
