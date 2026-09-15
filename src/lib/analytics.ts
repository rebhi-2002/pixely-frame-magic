import posthog from "posthog-js";

const CONSENT_KEY = "academia.cookieConsent";
let consentGranted = false;
let initialized = false;
let listenerAttached = false;

function readConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

function tryInitPosthog(): void {
  if (!consentGranted) return;

  // في حال كان معرّف سابقاً وتغيرت حالة الموافقة من الرفض إلى القبول
  if (initialized) {
    if (posthog.has_opted_out_capturing()) {
      posthog.opt_in_capturing();
    }
    return;
  }

  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key) return;

  posthog.init(key, {
    api_host:
      (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
  });
  initialized = true;
}

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  consentGranted = readConsent();
  if (consentGranted) tryInitPosthog();

  if (!listenerAttached) {
    window.addEventListener("academia:cookie-consent", (e) => {
      consentGranted = (e as CustomEvent<string>).detail === "accepted";
      if (consentGranted) {
        tryInitPosthog();
      } else if (initialized) {
        posthog.opt_out_capturing();
      }
    });
    listenerAttached = true;
  }
}

export type AnalyticsEventName =
  | "login_attempt"
  | "login_success"
  | "login_failed"
  | "signup_attempt"
  | "signup_success"
  | "signup_failed"
  | "logout";

export function trackEvent(name: AnalyticsEventName, props?: Record<string, unknown>): void {
  if (!consentGranted) return;

  if (import.meta.env.DEV) console.info("[analytics]", name, props ?? {});
  if (initialized) posthog.capture(name, props);
}

export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (!consentGranted) return;

  if (import.meta.env.DEV) console.info("[analytics] identify", userId, traits ?? {});
  if (initialized) posthog.identify(userId, traits);
}

export function resetAnalytics(): void {
  if (import.meta.env.DEV) console.info("[analytics] reset");
  if (initialized) posthog.reset();
}

// // تتبّع الاستخدام (Product analytics) عبر PostHog.
// // يعمل فقط لو VITE_POSTHOG_KEY معرّف بـ.env — بدونه no-op آمن (راجع
// // .env.example). الأحداث بتُحترم فقط لو المستخدم وافق على الكوكيز (نفس
// // آلية site/cookie-consent.tsx) — ما بيصير أي init ولا أي حدث قبل الموافقة.

// import posthog from "posthog-js";

// const CONSENT_KEY = "academia.cookieConsent";
// let consentGranted = false;
// let initialized = false;

// function readConsent(): boolean {
//   if (typeof window === "undefined") return false;
//   return localStorage.getItem(CONSENT_KEY) === "accepted";
// }

// function tryInitPosthog(): void {
//   if (initialized || !consentGranted) return;

//   const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
//   if (!key) return;

//   posthog.init(key, {
//     api_host:
//       (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || "https://us.i.posthog.com",
//     person_profiles: "identified_only",
//     capture_pageview: true,
//     capture_pageleave: true,
//   });
//   initialized = true;
// }

// export function initAnalytics(): void {
//   if (typeof window === "undefined") return;
//   consentGranted = readConsent();
//   if (consentGranted) tryInitPosthog();

//   window.addEventListener("academia:cookie-consent", (e) => {
//     consentGranted = (e as CustomEvent<string>).detail === "accepted";
//     if (consentGranted) tryInitPosthog();
//     else if (initialized) posthog.opt_out_capturing();
//   });
// }

// export type AnalyticsEventName =
//   | "login_attempt"
//   | "login_success"
//   | "login_failed"
//   | "signup_attempt"
//   | "signup_success"
//   | "signup_failed"
//   | "logout";

// export function trackEvent(name: AnalyticsEventName, props?: Record<string, unknown>): void {
//   if (!consentGranted) return;

//   if (import.meta.env.DEV) console.info("[analytics]", name, props ?? {});
//   if (initialized) posthog.capture(name, props);
// }

// export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
//   if (!consentGranted) return;

//   if (import.meta.env.DEV) console.info("[analytics] identify", userId, traits ?? {});
//   if (initialized) posthog.identify(userId, traits);
// }
