# Code Standards

يجب أن تبقى طبقات العرض، التكامل، والخدمات منفصلة. استخدم أسماء تعبّر عن النية، وقلّل الدوال التي تجمع validation وI/O والعرض في مكان واحد. كل public API أو service جديد يحتاج وصفًا مختصرًا لنطاقه، مدخلاته، ومخرجاته.

في الفرونت، تستخدم مكونات React بصيغة PascalCase وhooks بصيغة `use...`، ويترك استدعاء الشبكة في adapter أو service. في الباك إند، تستخدم controllers للتوجيه والتحقق الأولي فقط، وتوضع قواعد العمل في services، والوصول للبيانات في DbContext/repositories حسب النمط القائم.

قبل الدمج يجب تمرير formatter/linter/build. لا تستخدم `any` أو `dynamic` لتجاوز عقد غير واضح، ولا تضع بيانات سرية في log أو response. كل تغيير schema أو endpoint يجب أن يحدّث Swagger والـPostman والـAPI changelog معًا.
