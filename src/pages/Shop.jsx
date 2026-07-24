import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ui/ProductCard'
import Tag from '../components/ui/Tag'
import products from '../data/products.json'
import { categories, categoryLabels } from '../data/categoryLabels'
import styles from './Shop.module.css'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('Все')

  const filtered = activeCategory === 'Все'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AETERRA
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Коллекция
          </motion.h1>
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            12 формул. Каждая — с историей.
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className={styles.filters}>
          {categories.map(cat => (
            <Tag
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </Tag>
          ))}
        </div>

        {filtered.length === 0 ? (
          <motion.p
            className={styles.empty}
            key={`empty-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            В этой категории пока нет средств.
          </motion.p>
        ) : (
          <motion.div
            className={styles.grid}
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
