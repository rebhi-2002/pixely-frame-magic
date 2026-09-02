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
  event.respondWith(fetch(event.request));
});
