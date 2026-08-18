import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categoryLabel } from '../../data/categoryLabels'
import styles from './ProductCard.module.css'

export default function ProductCard({ slug, name, tagline, price, cardImage, category, bestseller }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Одна ссылка на всю карточку вместо двух на один адрес: раньше скринридер
          объявлял каждый товар дважды, а «Смотреть →» звучало без контекста */}
      <Link to={`/shop/${slug}`} className={styles.link}>
        <span className={styles.frame}>
          {/* alt пустой намеренно: название товара идёт текстом ниже внутри той же
              ссылки, и озвучивать его дважды — лишний шум для скринридера */}
          <img
            src={`/${cardImage}`}
            alt=""
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
          {bestseller && <span className={styles.badge}>Бестселлер</span>}
        </span>

        <span className={styles.body}>
          <span className={styles.category}>{categoryLabel(category)}</span>
          {/* h3, а не span: заголовки допустимы внутри ссылки, и переход на span
              обнулил структуру страницы — в каталоге не осталось ни одного
              заголовка ниже h1, хотя навигация по ним основной способ обхода
              списка товаров скринридером */}
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.tagline}>{tagline}</span>
          <span className={styles.footer}>
            <span className={styles.price}>{price.toLocaleString('ru-RU')} ₽</span>
            <span className={styles.cta} aria-hidden="true">
              Смотреть
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </span>
      </Link>
    </motion.article>
  )
}
