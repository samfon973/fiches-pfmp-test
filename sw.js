// ============================================
// Service Worker — Fiches PFMP
// Cache l'app shell (HTML + icônes) pour démarrage offline / installation PWA.
// Les données utilisateur (fiches, photos) restent dans IndexedDB, indépendantes de ce cache.
// ============================================

// Bumper ce numéro à chaque déploiement → force la mise à jour du cache des élèves.
const CACHE_VERSION = 'pfmp-v0.20.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './icon-180.png'
];

// Installation : pré-cache l'app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch((err) => console.error('[SW] install error:', err))
  );
});

// Activation : nettoie les anciens caches + notifie les pages ouvertes qu'une nouvelle version est active
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
     .then(() => self.clients.matchAll({ includeUncontrolled: true }))
     .then((clients) => {
       clients.forEach((c) => c.postMessage({ type: 'sw-activated', version: CACHE_VERSION }));
     })
  );
});

// Permet à la page de demander à un SW en attente de prendre le relais immédiatement
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'skip-waiting') {
    self.skipWaiting();
  }
});

// Fetch :
//   - HTML : network-first (toujours essayer la dernière version pour pousser les mises à jour),
//            fallback cache si offline
//   - Reste : cache-first (rapide), fallback réseau
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Ne s'occupe que des requêtes de notre origine
  if (url.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate'
              || (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first AGRESSIF : force un vrai roundtrip réseau (cache: 'no-cache' bypasse le cache HTTP)
    // → l'utilisateur reçoit toujours la dernière version dès qu'elle est en ligne.
    event.respondWith(
      fetch(req, { cache: 'no-cache' }).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Cas spécial : sw.js lui-même → toujours du réseau pour pouvoir se remplacer
  if (url.pathname.endsWith('/sw.js')) {
    event.respondWith(fetch(req, { cache: 'no-cache' }));
    return;
  }

  // Données dynamiques (tips.md, versions.md) → network-first comme l'HTML, pour que les
  // nouveaux contenus arrivent dès qu'ils sont en ligne sans devoir bumper CACHE_VERSION.
  if (url.pathname.endsWith('/tips.md') || url.pathname.endsWith('/versions.md')) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' }).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first pour le reste (icônes, manifest, etc.)
  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
      }
      return res;
    }))
  );
});
