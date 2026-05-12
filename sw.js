// AeroPlan Service Worker
// Estrategia: cache-first para assets estáticos, network-first para tiles de mapa

const CACHE_NAME = 'aeroplan-v4';
const CACHE_VERSION = '4.0.0';

// Assets que se cachean en la instalación (shell de la app)
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  // CDN — se cachean en primer uso
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
];

// ── Install: precachear el shell ─────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: limpiar caches viejos ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: estrategia por tipo de recurso ────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Tiles de Google Maps → network-first con fallback a cache
  // No se pre-cachean (son dinámicos y dependientes del área)
  if(url.hostname.includes('mt0.google.com') ||
     url.hostname.includes('mt1.google.com') ||
     url.hostname.includes('mt2.google.com') ||
     url.hostname.includes('mt3.google.com')){
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cachear el tile si la respuesta es válida
          if(response && response.status === 200){
            const clone = response.clone();
            caches.open(CACHE_NAME + '-tiles')
              .then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Google Fonts → cache-first
  if(url.hostname.includes('fonts.googleapis.com') ||
     url.hostname.includes('fonts.gstatic.com')){
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request)
          .then(response => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
            return response;
          })
        )
    );
    return;
  }

  // Assets estáticos CDN y propios → cache-first
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if(cached) return cached;
        return fetch(event.request)
          .then(response => {
            if(!response || response.status !== 200 || response.type === 'opaque'){
              return response;
            }
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
            return response;
          });
      })
  );
});
