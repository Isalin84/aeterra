import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ui/ProductCard'
import products from '../data/products.json'
import styles from './Product.module.css'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

const icons = [
  { src: '/assets_web/brand/aeterra_icon_molecule.webp', label: 'Научное обоснование' },
  { src: '/assets_web/brand/aeterra_icon_leaf.webp', label: 'Натуральное происхождение' },
  { src: '/assets_web/brand/aeterra_icon_drop.webp', label: 'Прозрачный состав' },
]

export default function Product() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) return <Navigate to="/shop" replace />

  const related = products
    .filter(p => p.slug !== slug && (p.category === product.category || p.effect === product.effect))
    .slice(0, 3)

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Хлебные крошки */}
        <div className={styles.breadcrumb}>
          <Link to="/shop">Каталог</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Основная сетка */}
        <div className={styles.grid}>
          {/* Фото */}
          <div className={styles.images}>
            <motion.div
              className={styles.mainImg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src={`/${product.cardImage}`} alt={product.name} />
            </motion.div>
            <motion.div
              className={styles.lifeImg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <img src={`/${product.lifeImage}`} alt={`${product.name} lifestyle`} />
            </motion.div>
          </div>

          {/* Инфо */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <div className={styles.meta}>
              <span className={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</span>
              <span className={styles.volume}>{product.volume}</span>
            </div>
            <div className={styles.keyIng}>
              <span className={styles.keyIngLabel}>Ключевые ингредиенты</span>
              <span className={styles.keyIngValue}>{product.keyIngredient}</span>
              <span className={styles.keyIngSource}>— {product.source}</span>
            </div>
            <button className={styles.addBtn}>Добавить в ритуал</button>
            <p className={styles.advisorNote}>
              Не уверены?{' '}
              <Link to="/advisor" className={styles.advisorLink}>Пройдите диагностику →</Link>
            </p>
          </motion.div>
        </div>

        {/* Вкладки */}
        <div className={styles.tabs}>
          {[
            ['description', 'Описание'],
            ['ingredients', 'Радикальная прозрачность'],
            ['why', 'Почему это работает'],
          ].map(([id, label]) => (
            <button
              key={id}
              className={`${styles.tab} ${activeTab === id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <motion.p className={styles.description} {...fadeUp}>
              {product.description}
            </motion.p>
          )}

          {activeTab === 'ingredients' && (
            <motion.div {...fadeUp}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ингредиент</th>
                    <th>Происхождение</th>
                    <th>Функция</th>
                  </tr>
                </thead>
                <tbody>
                  {product.ingredients.map((ing, i) => (
                    <tr key={i}>
                      <td className={styles.ingName}>{ing.name}</td>
                      <td className={styles.ingOrigin}>{ing.origin}</td>
                      <td className={styles.ingFunc}>{ing.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === 'why' && (
            <motion.div className={styles.whyGrid} {...fadeUp}>
              {icons.map(({ src, label }) => (
                <div key={label} className={styles.whyItem}>
                  <img src={src} alt={label} className={styles.whyIcon} />
                  <span className={styles.whyLabel}>{label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Рекомендации */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>Дополните ритуал</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} {...p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
