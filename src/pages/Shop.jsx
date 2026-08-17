import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
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
      {/* Надзаголовка «AETERRA» здесь больше нет: слово уже стоит логотипом в
          хедере строкой выше, и повтор ничего не добавлял. Строка фильтров
          переехала внутрь шапки — раньше между хедером и заголовком висело
          около 270px пустоты, а фильтры болтались отдельным островом. */}
      <PageHero
        title="Коллекция"
        sub="12 формул. Каждая — с историей о том, откуда пришёл её главный ингредиент."
      >
        <div className={styles.filters} role="group" aria-label="Фильтр по категориям">
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
      </PageHero>

      <div className="container">
        {/* Счётчик результатов: при выборе категории сетка меняется, и без него
            непонятно, отфильтровалось ли что-то вообще */}
        <p className={styles.count} aria-live="polite">
          {filtered.length === 0
            ? 'Ничего не найдено'
            : `${filtered.length} ${filtered.length === 1 ? 'средство' : filtered.length < 5 ? 'средства' : 'средств'}`}
        </p>

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
