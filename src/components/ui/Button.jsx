import styles from './Button.module.css'

export default function Button({ variant = 'primary', children, onClick, as: Tag = 'button', href, type }) {
  const props = {
    className: `${styles.btn} ${styles[variant]}`,
    onClick,
    ...(Tag === 'a' ? { href } : { type: type || 'button' }),
  }
  return <Tag {...props}>{children}</Tag>
}
