/* Estrelume: service worker do app instalável (v1.43).
   Tudo vai pela rede primeiro (nunca mistura versão nova com arquivo velho); a cópia guardada só entra sem internet.
   Downloads (baixar/) e outros sites ficam de fora. */
const CACHE = 'estrelume-v143';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', 'index.html', 'bundle.js', 'manifest.webmanifest']).catch(() => {}))); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('estrelume-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return; const url = new URL(req.url); if (url.origin !== location.origin) return;
  const path = url.pathname; if (/\/baixar\//.test(path) || /\/__/.test(path)) return;
  const put = (res) => { if (res && res.ok && res.type === 'basic') { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(req, cp)).catch(() => {}); } return res; };
  e.respondWith(fetch(req).then(put).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html'))));
});
