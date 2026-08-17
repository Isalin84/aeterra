import { useEffect, useRef, useState } from 'react'
import styles from './AmbientVideo.module.css'

function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

/**
 * Фоновое видео секции.
 *
 * Почему не просто <video autoPlay>:
 * — poster показывает первый кадр сразу, вместо пустоты до буферизации;
 * — preload="metadata" не тянет весь файл, если посетитель до секции не дошёл;
 * — воспроизведение включается только когда секция в кадре: за пределами
 *   экрана видео зря греет процессор и жжёт батарею на ноутбуке и телефоне;
 * — при prefers-reduced-motion видео не запускается вовсе, остаётся постер.
 *
 * props:
 *   src, poster  — пути от корня public
 *   sound        — показать кнопку включения звука
 *   className    — класс на <video> (позиционирование задаёт страница)
 */
export default function AmbientVideo({ src, poster, sound = false, className = '', ariaLabel }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // Просили не двигать картинку — оставляем постер и не запускаем видео
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }

    // Наблюдатель здесь ТОЛЬКО экономит ресурсы: ставит на паузу то, что ушло
    // за пределы экрана, и возвращает обратно. Запуск остаётся нативным (autoPlay),
    // иначе в окружении, где IntersectionObserver не срабатывает, видео не заиграло бы
    // вовсе — оптимизация не должна ломать основную функцию.
    if (typeof IntersectionObserver !== 'function') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}) // автоплей может быть запрещён политикой браузера
        } else if (!video.paused) {
          video.pause()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleSound = () => {
    const video = ref.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
    if (!next) video.play().catch(() => {})
  }

  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        aria-label={ariaLabel}
      />
      {sound && (
        <button
          type="button"
          className={styles.soundBtn}
          onClick={toggleSound}
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}
        >
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
      )}
    </>
  )
}
