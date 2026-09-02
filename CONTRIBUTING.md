# Contributing

## Workflow

أنشئ branch قصيرة العمر من `main` باسم واضح مثل `feat/student-dashboard` أو `fix/auth-cookie`. لا تعمل مباشرة على `main`. قبل فتح Pull Request شغّل أوامر التحقق الخاصة بالمشروع وسجّل النتائج في وصف الطلب.

## Commits

استخدم Conventional Commits: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, و`security`. يجب أن تكون الرسالة فعلية وقصيرة، مثل `docs: document current authentication boundary`.

## Pull Requests

يجب أن يذكر Pull Request الهدف، الملفات المتأثرة، الاعتماد على API أو migration إن وجد، وحالات الاختبار. تغييرات الواجهة ترفق لقطات قبل/بعد عند الإمكان، وتذكر viewport وRTL/LTR. تغييرات الباك إند تذكر endpoints وrequest/response models والتأثير على قاعدة البيانات.

## قواعد عامة

لا تضع secrets أو connection strings أو بيانات طلاب حقيقية في Git. لا تعتبر حماية الواجهة بديلًا عن authorization في الخادم. إذا كان التغيير يعتمد على endpoint غير موجود بعد، وثّق ذلك كـpending contract بدل اختراع استجابة.
