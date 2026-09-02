# UX Guidelines

كل شاشة تجيب عن ثلاثة أسئلة: أين أنا؟ ما الإجراء الرئيسي؟ ماذا حدث بعد الإجراء؟ يجب أن يكون CTA واحدًا واضحًا في كل empty state، وأن تعرض الواجهة loading skeleton أو spinner مناسبًا، ورسالة error مفهومة مع Retry عند الإمكان.

في الهاتف، حافظ على tap targets مناسبة، لا تسمح بالـhorizontal overflow، واجعل Sheet وDialog قابلين للتمرير دون فقدان زر الإغلاق. في RTL استخدم start/end بدل left/right، واختبر labels الطويلة بالعربية والإنجليزية.

لا تظهر placeholders متكررة أو أرقامًا وهمية دون وسم. عندما يكون الباك إند غير جاهز، استخدم coming-soon/feature-state يشرح ما هو متاح وما ينتظر الإطلاق.
