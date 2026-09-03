// Service Worker بسيط جدًا وآمن — الهدف الوحيد منه هو تحقيق شرط
// "قابلية التثبيت" (installability) المطلوب من متصفحات Chrome/Android
// حتى تقبل اعتبار الموقع تطبيق PWA قابل للتغليف بـ TWA.
//
// هذا المشروع عرض من جهة الخادم (SSR) وكل صفحة محتواها ديناميكي
// ومرتبط بجلسة كوكي — لذلك عمدًا لا نخزّن أي صفحات HTML أو استجابات API
// بالكاش هنا، تجنبًا لعرض بيانات قديمة أو كسر حالة تسجيل الدخول.
// كل طلب يمر مباشرة للشبكة كالمعتاد (passthrough).

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // لا تتدخل إطلاقًا بأي طلب مو GET (تسجيل الدخول وأي POST/PUT/DELETE
  // لباك اند خارجي)، ولا بأي طلب Cross-Origin (نداءات الـ API، الخطوط،
  // الصور من دومينات ثانية). هيك بتصير هالطلبات تروح للشبكة مباشرة وكأنه
  // ما في Service Worker إطلاقًا بالنسبة إلها — يمنع أي تأثير جانبي على
  // CORS أو على جلسة تسجيل الدخول.
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (req.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // لباقي الطلبات (GET لنفس الأصل: الصفحات والأصول الثابتة) مرّرها للشبكة
  // مباشرة، مع catch يمنع "Uncaught (in promise) TypeError: Failed to fetch"
  // من الظهور بالكونسول ومن كسر التنقل بالموقع عند أي انقطاع شبكة مؤقت.
  event.respondWith(
    fetch(req).catch(
      () =>
        new Response("", {
          status: 504,
          statusText: "Network error (service worker passthrough failed)",
        }),
    ),
  );
});
