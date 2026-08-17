import { motion } from 'framer-motion'
import AmbientVideo from './AmbientVideo'
import styles from './PageHero.module.css'

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
})

/**
 * Шапка страницы. Раньше в шести файлах лежали почти одинаковые блоки .hero
 * со своими отступами и своими же дублями .eyebrow/.title/.sub — отсюда и
 * разъехавшийся ритм, и 270px пустоты на /shop.
 *
 * variant="cinematic" — видео во всю ширину, начинается от самого верха окна и
 * уходит ПОД хедер. Ставит data-hero="cinematic": по этому признаку хедер
 * переключается в светлый вариант (см. Header.module.css). Прежняя вёрстка
 * опускала тёмный герой на 72px ниже, из-за чего белые ссылки хедера
 * оказывались на белом фоне.
 *
 * variant="editorial" — светлый грунт, плотный ритм, без видео.
 *
 * variant="dark" — тёмный грунт с гексагональным паттерном бренда. Отдаёт
 * Inner Compass собственную, более закрытую атмосферу: это внутренний раздел
 * команды, и отличать его от витрины — осмысленно, а не декоративно.
 *
 * props:
 *   eyebrow, title, sub — текст; eyebrow необязателен
 *   breadcrumb — узел над надзаголовком (путь по разделу)
 *   video, poster, sound, ariaLabel — только для cinematic
 *   image — фоновый снимок для dark: заменяет гексагональный паттерн, когда у
 *           страницы есть собственный кадр
 *   children — необязательный блок под подзаголовком (например строка фильтров),
 *              чтобы пространство под шапкой имело смысл, а не висело пустым
 */
const VARIANTS = {
  cinematic: 'cinematic',
  editorial: 'editorial',
  dark: 'dark',
}

export default function PageHero({
  variant = 'editorial',
  eyebrow,
  title,
  sub,
  breadcrumb,
  video,
  poster,
  image,
  sound = false,
  ariaLabel,
  children,
}) {
  const cinematic = variant === 'cinematic'
  const dark = variant === 'dark'

  return (
    <header
      className={`${styles.hero} ${styles[VARIANTS[variant] ?? 'editorial']} ${dark ? 'theme-dark' : ''}`}
      /* Признак читает хедер: светлый вариант навигации нужен и над видео,
         и над тёмным грунтом — иначе на тёмной шапке остались бы тёмные ссылки */
      data-hero={cinematic || dark ? 'cinematic' : 'editorial'}
    >
      {/* Свой кадр вместо паттерна. Задаём инлайном, потому что путь приходит
          из данных страницы, а не известен стилям заранее. */}
      {dark && image && (
        <>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
          <div className={styles.scrim} />
        </>
      )}
      {breadcrumb && <div className={`container ${styles.breadcrumb}`}>{breadcrumb}</div>}

      {cinematic && (
        <>
          <AmbientVideo
            className={styles.video}
            src={video}
            poster={poster}
            ariaLabel={ariaLabel}
            sound={sound}
          />
          <div className={styles.scrim} />
        </>
      )}

      <div className={`container ${styles.content}`}>
        {eyebrow && (
          <motion.p className={styles.eyebrow} {...rise(0.1)}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1 className={styles.title} {...rise(0.18)}>
          {title}
        </motion.h1>

        {sub && (
          <motion.p className={styles.sub} {...rise(0.28)}>
            {sub}
          </motion.p>
        )}

        {children && (
          <motion.div className={styles.extra} {...rise(0.38)}>
            {children}
          </motion.div>
        )}
      </div>
    </header>
  )
}
