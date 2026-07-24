import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categoryLabel } from '../../data/categoryLabels'
import styles from './ProductCard.module.css'

export default function ProductCard({ slug, name, tagline, price, cardImage, category, bestseller }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/shop/${slug}`} className={styles.imageWrap}>
        <motion.img
          src={`/${cardImage}`}
          alt={name}
          className={styles.image}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
        {bestseller && <span className={styles.badge}>Бестселлер</span>}
      </Link>
      <div className={styles.body}>
        <p className={styles.category}>{categoryLabel(category)}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{price.toLocaleString('ru-RU')} ₽</span>
          <Link to={`/shop/${slug}`} className={styles.link}>Смотреть →</Link>
        </div>
      </div>
    </motion.div>
  )
}
