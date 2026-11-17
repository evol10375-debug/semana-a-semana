// Semana a semana · avisos
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Semana a semana', {
    body: d.body || '', icon: 'apple-touch-icon.png', badge: 'apple-touch-icon.png', data: { url: d.url || '' }, tag: d.tag || undefined,
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL(e.notification.data && e.notification.data.url ? e.notification.data.url : './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
    for (const w of ws) { if (w.url.startsWith(self.registration.scope)) { w.focus(); return; } }
    return self.clients.openWindow(url);
  }));
});
