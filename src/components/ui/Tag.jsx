import styles from './Tag.module.css'

export default function Tag({ children, active, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.tag} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
