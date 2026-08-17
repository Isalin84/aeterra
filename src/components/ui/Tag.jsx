import styles from './Tag.module.css'

export default function Tag({ children, active, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.tag} ${active ? styles.active : ''}`}
      onClick={onClick}
      /* Выбранная категория отличалась только цветом рамки — для скринридера
         все кнопки звучали одинаково. aria-pressed сообщает состояние. */
      aria-pressed={active}
    >
      {children}
    </button>
  )
}
