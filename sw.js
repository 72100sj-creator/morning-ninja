/* Morning Ninja - service worker (mode hors-ligne)
   Regle d'or : la page index.html est toujours cherchee sur le reseau d'abord
   (pour ne JAMAIS servir une vieille version quand on est en ligne),
   le cache ne sert que de secours hors connexion. */

var CACHE_NAME = "morning-ninja-v5.9";

var PRECACHE = [
  "./",
  "index.html",
  "guide.html",
  "manifest.json",
  "icon-ios-v2.png",
  "icon-512.png",
  "sound-ding.mp3",
  "sound-success.mp3",
  "exercise-1.jpg",
  "exercise-2.jpg",
  "exercise-3.jpg",
  "exercise-4.jpg",
  "exercise-5.jpg",
  "exercise-6.jpg",
  "exercise-7.jpg",
  "exercise-8.jpg",
  "exercise-9.jpg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (c) { return c.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE_NAME) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  var isPage = e.request.mode === "navigate" || url.pathname.slice(-11) === "/index.html" || url.pathname.slice(-11) === "/guide.html" || url.pathname.slice(-1) === "/";

  if (isPage) {
    /* Page : reseau d'abord (toujours a jour), cache en secours hors-ligne */
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (r) {
          return r || caches.match("index.html");
        });
      })
    );
  } else {
    /* Ressources (sons, images, polices) : cache d'abord, sinon reseau + mise en cache */
    e.respondWith(
      caches.match(e.request).then(function (r) {
        if (r) return r;
        return fetch(e.request).then(function (res) {
          if (res && res.status === 200) {
            var copy = res.clone();
            caches.open(CACHE_NAME).then(function (c) { c.put(e.request, copy); });
          }
          return res;
        });
      })
    );
  }
});
