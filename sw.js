// Retirement worker for registrations created by the previous theme.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  const names = await caches.keys();
  await Promise.all(names.filter(name => name.startsWith('main-') || ['precache-v1','runtime'].includes(name)).map(name => caches.delete(name)));
  await self.registration.unregister();
  await self.clients.claim();
})()));
