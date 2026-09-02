# Design System

يعتمد النظام البصري على tokens في `src/styles.css` ومكونات UI مشتركة. كل تغيير بصري يجب أن يحافظ على semantic colors، focus ring، radius، spacing، dark mode، وRTL/LTR.

| الفئة | القاعدة |
|---|---|
| Typography | عناوين واضحة، نص body قابل للقراءة، وعدم استخدام وزن/لون وحده للمعنى |
| Color | اللون الدلالي لا يستخدم وحده لتمييز الخطأ أو النجاح |
| Spacing | استخدم scale موحدًا وتجنب قيمًا عشوائية متكررة |
| Radius | حافظ على hierarchy واضح بين control/card/dialog |
| Focus | focus-visible واضح للكيبورد في كل interactive control |
| Motion | تحريك خفيف، مع احترام `prefers-reduced-motion` |
| Direction | استخدم logical properties واختبر RTL وLTR |

أي primitive جديد يوثق في `component-catalog.md` مع default/disabled/loading/invalid states.
