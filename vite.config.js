import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ассеты лежат в public/assets_web и адресуются абсолютными путями от корня
// («/assets_web/...»), поэтому алиас на внешнюю папку не нужен: он был мёртвым
// (ноль использований в src/) и ломал линт из-за __dirname, недоступного в ESM.
export default defineConfig({
  plugins: [react()],
})
