// Русские подписи категорий товаров.
// products.json хранит category английским слагом — переводим здесь централизованно.
export const categoryLabels = {
  'Все': 'Все',
  serum: 'Сыворотки',
  toner: 'Тоники',
  oil: 'Масла',
  cleanser: 'Умывание',
  cream: 'Кремы',
  eye: 'Глаза',
  lip: 'Губы',
  mask: 'Маски',
  essence: 'Эссенции',
  fluid: 'Флюиды',
  ampoule: 'Ампулы',
  body: 'Тело',
}

// Подпись одной категории с безопасным фолбэком на исходный слаг.
export const categoryLabel = (slug) => categoryLabels[slug] || slug

export const categories = [
  'Все', 'serum', 'toner', 'oil', 'cleanser', 'cream',
  'eye', 'lip', 'mask', 'essence', 'fluid', 'ampoule', 'body',
]
