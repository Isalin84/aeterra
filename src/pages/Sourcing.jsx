import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, AttributionControl } from 'react-leaflet'
import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Sourcing.module.css'

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

/* Рамка по крайним источникам: Исландия сверху, Амазония снизу,
   Амазония слева, Алтай справа. */
const sourceBounds = L.latLngBounds(sources.map(s => [s.lat, s.lng]))

/* Границы системы координат Web Mercator. За ними плиток не существует,
   и без этого ограничения Leaflet всё равно их запрашивал. */
const tileBounds = L.latLngBounds([[-85.05, -180], [85.05, 180]])

/**
 * Подбирает масштаб так, чтобы карта заполняла контейнер по ширине и при этом
 * все пять маркеров оставались в кадре.
 *
 * Зачем: при фиксированном zoom={2} мир занимает 1024px. На широком экране
 * (2000px+) этого не хватало, и карта повторялась — в кадре оказывались две
 * Северные Америки и две Австралии. Простой fitBounds решает дублирование, но
 * упирается в высоту и оставляет пустые поля по бокам. Поэтому берём минимум из
 * двух ограничений: масштаба, при котором мир ровно перекрывает ширину, и
 * максимального масштаба, при котором рамка источников ещё влезает по высоте.
 */
function FitMapToWidth() {
  const map = useMap()

  useEffect(() => {
    const apply = () => {
      const { x: width } = map.getSize()
      if (!width) return
      const zoomFillingWidth = Math.log2(width / 256)          // 256px — сторона тайла
      // Отступ умеренный: чем он больше, тем сильнее ограничение по высоте
      // прижимает масштаб и тем шире поля по краям. К заданному значению
      // добавляется ещё половина иконки маркера (40px), это учтено.
      const zoomFittingSources = map.getBoundsZoom(sourceBounds, false, L.point(40, 44))
      const zoom = Math.min(zoomFillingWidth, zoomFittingSources)

      /* Центр берём в проекции, а не через getCenter(). Географическая середина
         между Исландией (64.9°) и Амазонией (−3.5°) в Меркаторе не совпадает с
         серединой картинки — широты к полюсу растягиваются, и маркер Исландии
         вставал вплотную к верхней кромке полосы. */
      const northWest = map.project(sourceBounds.getNorthWest(), zoom)
      const southEast = map.project(sourceBounds.getSouthEast(), zoom)
      const center = map.unproject(northWest.add(southEast).divideBy(2), zoom)

      map.setView(center, zoom, { animate: false })
    }

    apply()
    map.on('resize', apply)
    return () => map.off('resize', apply)
  }, [map])

  return null
}

export default function Sourcing() {
  const [active, setActive] = useState(null)


  return (
    <div className={styles.page}>
      <PageHero
        variant="cinematic"
        eyebrow="Поставки"
        title="Откуда мы берём"
        sub="Каждый ингредиент — с конкретным адресом. Нажмите на регион, чтобы узнать историю."
        video="/assets_web/video/aeterra_video_map_sourcing.mp4"
        poster="/assets_web/video/posters/aeterra_video_map_sourcing.webp"
        ariaLabel="Источники ингредиентов AETERRA"
        sound
      />

      <div className={styles.mapWrap}>
        <MapContainer
          /* Стартовые center/zoom нужны Leaflet для инициализации,
             дальше масштаб пересчитывает FitMapToWidth под ширину окна */
          center={sourceBounds.getCenter()}
          zoom={2}
          zoomSnap={0}
          className={styles.map}
          zoomControl={false}
          /* Свой контрол атрибуции: у стандартного в подписи стоит промо-префикс
             самого Leaflet с флажком, к лицензии он отношения не имеет */
          attributionControl={false}
        >
          <FitMapToWidth />
          <AttributionControl prefix={false} position="bottomright" />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            /* noWrap убирает дубли мира по горизонтали, но сам по себе не мешает
               запрашивать плитки за пределами системы координат: половина
               запросов уходила в 404. bounds ограничивает набор плиток. */
            noWrap
            bounds={tileBounds}
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
              <img src={active.image} alt={active.label} loading="lazy" decoding="async" />
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
