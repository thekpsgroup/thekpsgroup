// Fallback service worker for older browsers
// This provides basic functionality without modern PWA features

// Simple cache name
const CACHE_NAME = 'kps-fallback-v1';

// Essential files only for older browsers
const ESSENTIAL_FILES = [
  '/',
  '/about-us',
  '/contact',
  '/services'
];

// Install event - cache essential files only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ESSENTIAL_FILES).catch(() => {
          // Fail silently on older browsers
          console.warn('Failed to cache essential files');
        });
      })
  );
});

// Fetch event - simple cache-first strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return new Response('Offline', {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'text/html' }
            });
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
