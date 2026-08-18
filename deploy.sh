#!/usr/bin/env bash
# Деплой AETERRA на прод (Selectel VDS, nginx, docroot /var/www/aeterra).
# Доступ — по SSH-ключу через алиас `aeterra-prod` из ~/.ssh/config. Секретов внутри нет.
set -euo pipefail
cd "$(dirname "$0")"

HOST="aeterra-prod"
REMOTE_ROOT="/var/www/aeterra"
DOMAIN="aeterra.bestpracticeai.ru"

echo "==> Сборка"
npm run build
find dist -name .DS_Store -delete

echo "==> Нормализация прав"
# Обязательный шаг: часть файлов в public/assets_web/ имеет права 600/700, Vite
# копирует их в dist как есть, а rsync -a переносит на сервер — nginx такие файлы
# не читает, и получаются битые фото и видео при живом HTML.
# Правим локально, а не через rsync --chmod: в macOS теперь openrsync,
# он не поддерживает синтаксис --chmod=D755,F644.
find dist -type d -exec chmod 755 {} +
find dist -type f -exec chmod 644 {} +

echo "==> Загрузка на $HOST:$REMOTE_ROOT"
rsync -az --delete -e 'ssh -o BatchMode=yes' dist/ "$HOST:$REMOTE_ROOT/"

ssh "$HOST" "chown -R www-data:www-data $REMOTE_ROOT
             # страховка: если права всё же уехали, чиним на месте
             find $REMOTE_ROOT -type f ! -perm 644 -exec chmod 644 {} +
             find $REMOTE_ROOT -type d ! -perm 755 -exec chmod 755 {} +"

echo "==> Проверка"
# Спрашиваем именно тот сервер, куда только что залили, а не домен: пока
# A-запись не переключена, домен отдаёт старый сервер, и сверка бандлов
# показывала расхождение там, где всё в порядке.
SERVER_IP=$(ssh "$HOST" 'hostname -I | awk "{print \$1}"')
fetch() { curl -s --resolve "$DOMAIN:80:$SERVER_IP" "http://$DOMAIN$1"; }

remote_bundle=$(fetch "/index.html?cb=$(date +%s)" | grep -oE 'index-[A-Za-z0-9_-]+\.(js|css)' | sort | tr '\n' ' ')
local_bundle=$(ls dist/assets | grep -E '^index-.*\.(js|css)$' | sort | tr '\n' ' ')

if [ "$remote_bundle" = "$local_bundle" ]; then
  echo "    бандл совпал: $local_bundle"
else
  echo "    РАСХОЖДЕНИЕ БАНДЛОВ"
  echo "    на сервере: $remote_bundle"
  echo "    локально:   $local_bundle"
  exit 1
fi

# SPA-fallback: без него прямой заход на вложенный маршрут даёт 404
for path in / /shop/pura /lab/sostav-krema /inner-compass/knowledge /net-takoy-stranicy; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --resolve "$DOMAIN:80:$SERVER_IP" "http://$DOMAIN$path")
  printf "    %-28s %s\n" "$path" "$code"
  [ "$code" = "200" ] || { echo "    маршрут отдал не 200"; exit 1; }
done

echo "==> Готово. Просмотр: http://$SERVER_IP/"
