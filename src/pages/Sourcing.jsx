import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Sourcing.module.css'

function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  )
}

function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  )
}

// 40px прозрачная зона клика вокруг видимой 12px точки — tap-таргет ≥44px по факту
const customIcon = L.divIcon({
  className: '',
  html: `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center"><div style="width:12px;height:12px;background:#D4AF37;border-radius:50%;border:2px solid #F9F9F9;box-shadow:0 0 0 1px #D4AF37"></div></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

const sources = [
  {
    id: 'iceland', lat: 64.9, lng: -18.1, label: 'Исландия',
    ingredient: 'Ледниковая вода',
    text: 'Вода из исландских ледниковых источников содержит минералы в биодоступной форме, недоступной в обычной воде. Мы работаем с источниками в районе Ватнайёкюдль — крупнейшего ледника Европы.',
    products: 'PURA Serum, VERDE Toner, TERRA Mask',
    image: '/assets_web/sourcing/aeterra_source_iceland.webp',
  },
  {
    id: 'morocco', lat: 31.5, lng: -7.0, label: 'Марокко',
    ingredient: 'Аргановое масло и кактус опунции',
    text: 'Наши поставщики — семейные кооперативы в регионе Агадир. Женщины вручную собирают и обрабатывают плоды. Масло холодного отжима без растворителей.',
    products: 'CLARA Balm, ELIXIR Lip',
    image: '/assets_web/sourcing/aeterra_source_morocco.webp',
  },
  {
    id: 'provence', lat: 43.9, lng: 5.8, label: 'Прованс, Франция',
    ingredient: 'Лаванда',
    text: 'Экстракт лаванды из долины Ва — одного из последних регионов, где лаванда выращивается традиционными методами без пестицидов. Дистиллят первого отжима.',
    products: 'VERDE Toner, SILVA Body Oil',
    image: '/assets_web/sourcing/aeterra_source_provence.webp',
  },
  {
    id: 'amazon', lat: -3.5, lng: -62.2, label: 'Амазония, Бразилия',
    ingredient: 'Масла тропических растений',
    text: 'Масло праксаши добывается из семян дерева, произрастающего только в бассейне Амазонки. Мы работаем с сертифицированными поставщиками, соблюдающими принципы устойчивого сбора.',
    products: 'LUMINIS Oil, SILVA Body Oil',
    image: '/assets_web/sourcing/aeterra_source_amazon.webp',
  },
  {
    id: 'altai', lat: 51.0, lng: 86.5, label: 'Алтай, Россия',
    ingredient: 'Родиола розовая',
    text: 'Золотой корень собирается на высоте 1800–2400 м над уровнем моря в Горном Алтае. Наш партнёр — алтайская артель, работающая исключительно с дикорастущими растениями в сезон.',
    products: 'AURORA Fluid',
    image: '/assets_web/sourcing/aeterra_source_altai.webp',
  },
]

export default function Sourcing() {
  const [active, setActive] = useState(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !muted
      videoRef.current.muted = newMuted
      setMuted(newMuted)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay muted playsInline
          src="/assets_web/video/aeterra_video_map_sourcing.mp4"
        />
        <div className={styles.heroOverlay} />
        <button className={styles.soundBtn} onClick={toggleSound} aria-label={muted ? 'Включить звук' : 'Выключить звук'}>
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Поставки
          </motion.span>
          <motion.h1
            className={`${styles.title} ${styles.titleLight}`}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Откуда мы берём
          </motion.h1>
          <motion.p
            className={`${styles.sub} ${styles.subLight}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Каждый ингредиент — с конкретным адресом. Нажмите на регион, чтобы узнать историю.
          </motion.p>
        </div>
      </div>

      <div className={styles.mapWrap}>
        <MapContainer
          center={[20, 10]}
          zoom={2}
          className={styles.map}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {sources.map(s => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={customIcon}
              eventHandlers={{ click: () => setActive(s) }}
            >
              <Popup className={styles.popup}>
                <strong>{s.label}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Детали региона */}
      <div className="container">
        {active ? (
          <motion.div
            className={styles.detail}
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.detailImg}>
              <img src={active.image} alt={active.label} />
            </div>
            <div className={styles.detailInfo}>
              <button className={styles.backBtn} onClick={() => setActive(null)}>
                ← Все регионы
              </button>
              <span className={styles.detailRegion}>{active.label}</span>
              <h2 className={styles.detailIngredient}>{active.ingredient}</h2>
              <p className={styles.detailText}>{active.text}</p>
              <div className={styles.detailProducts}>
                <span className={styles.detailProductsLabel}>Используется в:</span>
                <span className={styles.detailProductsValue}>{active.products}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className={styles.sourceList}>
            {sources.map((s, i) => (
              <motion.button
                key={s.id}
                className={styles.sourceItem}
                onClick={() => setActive(s)}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className={styles.sourceLabel}>{s.label}</span>
                <span className={styles.sourceIngredient}>{s.ingredient}</span>
                <span className={styles.sourceArrow}>→</span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
