import { motion } from 'framer-motion'
import styles from './SectionTitle.module.css'

/**
 * props:
 *   flush — убрать нижний отступ. Нужен там, где заголовок стоит отдельной
 *   колонкой, а не над контентом: зашитые в компонент 96px превращались
 *   в провал между заголовком и следующей строкой блока.
 */
export default function SectionTitle({ label, title, subtitle, center, light, flush }) {
  return (
    <motion.div
      className={`${styles.wrap} ${center ? styles.center : ''} ${light ? styles.light : ''} ${flush ? styles.flush : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  )
}
