// Service Worker for 体操競技 Dスコア計算システム
// 2025-2028年FIG採点規則対応 (MAG NL1-3, WAG NL1反映済み)

const CACHE_NAME = 'd-score-calc-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './men.html',
  './women.html',
  './men_gymnastics_d_score.js',
  './women_gymnastics_d_score.js',
  './manifest.json'
];

// インストール時: アセットをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// アクティベート時: 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// フェッチ時: キャッシュファースト戦略（ネットワーク優先フォールバック）
self.addEventListener('fetch', event => {
  // Google AdSense や外部リソースはキャッシュしない
  if (event.request.url.includes('googlesyndication') ||
      event.request.url.includes('html2canvas.hertzen') ||
      event.request.url.includes('pagead')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // バックグラウンドでネットワークから更新を試みる
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // キャッシュにない場合はネットワークから取得
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // オフライン時のフォールバック
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
