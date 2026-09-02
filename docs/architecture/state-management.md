# State Management

الحالة المحلية تخص dialog، filters، tabs، وform draft. حالة التفضيلات تخص اللغة والثيم وحالة القائمة. أما user/profile/CRUD/results فهي server state ويجب أن تمر عبر adapters واضحة مع invalidation بعد mutations.

المصادقة الحالية تخزن ملخصًا محليًا للعرض والتنقل، بينما cookie الخادم هي جلسة ASP.NET. لا تعتبر localStorage أو cookie `academia_demo_user` مصدر صلاحية.

عند وصول APIs التعليمية، اعتمد abstraction موحدًا لـloading/error/empty، request cancellation، cache keys، وretry policy. لا تخلط mock data مع production response في نفس المتغير دون flag واضح.
