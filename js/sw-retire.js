(function () {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.getRegistrations().then(function (registrations) { registrations.forEach(function (registration) { registration.unregister(); }); });
    if ('caches' in window) caches.keys().then(function (names) { names.forEach(function (name) { if (/^(main-|runtime|precache)/.test(name)) caches.delete(name); }); });
  });
}());
