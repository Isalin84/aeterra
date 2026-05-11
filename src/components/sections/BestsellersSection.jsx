import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import ProductCard from '../ui/ProductCard'
import products from '../../data/products.json'
import styles from './BestsellersSection.module.css'

const bestsellers = products.filter(p => p.bestseller)

export default function BestsellersSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          label="Выбор экспертов"
          title="Бестселлеры"
          subtitle="Четыре формулы, которые доказали свою эффективность"
        />

        <div className={styles.grid}>
          {bestsellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link to="/shop" className={styles.ctaLink}>Смотреть всю коллекцию →</Link>
        </motion.div>
      </div>
    </section>
  )
}
