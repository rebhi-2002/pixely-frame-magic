# UI/UX QA Checklist

- [ ] يعمل المسار من البداية إلى النهاية.
- [ ] تظهر حالات loading وempty وerror وretry.
- [ ] لا توجد بيانات تجريبية مضللة.
- [ ] لا يوجد horizontal overflow عند 375px.
- [ ] يعمل RTL وLTR.
- [ ] تعمل keyboard navigation وfocus states.
- [ ] تم اختبار dark/light إن كان المسار يدعمه.
- [ ] تم تشغيل `npm run lint` و`npm test` و`npm run build`.
- [ ] تم فحص Network و401/403 وCORS عند المسارات المرتبطة بالـAPI.
