const CACHE_NAME = 'hazaq-cache-v1';
const urlsToCache = [
'index.html',
'1000362017.png',
'manifest.json'
];

// Instalação do Service Worker e cache dos arquivos essenciais
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);
});

// Interceptação das requisições para servir o conteúdo offline
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
if (response) {
return response;
}
return fetch(event.request);
})
);
});

// Atualização e limpeza de caches antigos
self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (!cacheWhitelist.includes(cacheName)) {
return caches.delete(cacheName);
}
})
);
})
);
});