// نقطة دخول العميل (client entry) لـTanStack Start.
// استيراد تهيئة Sentry أول شي — قبل أي كود تاني — حتى يلتقط أخطاء
// الـhydration المبكرة. راجع src/instrument.client.ts.
import "./instrument.client";

import { StartClient } from "@tanstack/react-start/client";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});
