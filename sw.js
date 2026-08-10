const CACHE_NAME = 'weighing-v1'
const urlsToCache = [
    '/rowing-weighing_2/scale.html',
    '/rowing-weighing_2/index.html',
    '/rowing-weighing_2/generate_qr.html',
    '/rowing-weighing_2/manifest.json'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names => Promise.all(
            names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
        ))
    )
})