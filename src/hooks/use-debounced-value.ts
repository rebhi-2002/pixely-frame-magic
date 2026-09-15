import { useEffect, useState } from "react";

/** يؤخّر تحديث القيمة لحد ما يوقف المستخدم عن الكتابة (افتراضي 400ms) —
 * يمنع إرسال طلب API بكل ضغطة زر بحقول البحث المرتبطة بالباك اند. */
export function useDebouncedValue<T>(value: T, delayMs = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
