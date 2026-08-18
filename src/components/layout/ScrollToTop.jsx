import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Сброс прокрутки при смене маршрута.
 * Без этого переход с прокрученной страницы открывает новую в её середине:
 * React Router меняет только содержимое, позицию скролла браузер сохраняет.
 * Мгновенно, а не smooth — плавная прокрутка через полдокумента выглядит как сбой.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
