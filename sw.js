const CACHE_NAME = 'vocabjordan-v14';
const CORE_ASSETS = [
  './', './index.html', './manifest.json', './icon.svg',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(CORE_ASSETS.map(async asset => {
      try { const response = await fetch(asset, {cache: 'reload'}); if (response.ok) await cache.put(asset, response); } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('vocabjordan-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) { const cache = await caches.open(CACHE_NAME); cache.put('./index.html', response.clone()); }
        return response;
      } catch (_) {
        return (await caches.match('./index.html')) || new Response('التطبيق غير متاح دون اتصال بعد. افتحه مرة واحدة مع الإنترنت.', {status: 503, headers: {'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type !== 'opaque') { const cache = await caches.open(CACHE_NAME); cache.put(request, response.clone()); }
      return response;
    } catch (_) { return cached || Response.error(); }
  })());
});
