import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useSession } from "@/hooks/use-session";

/**
 * زر دعوة لإجراء يتبدّل حسب حالة الجلسة:
 * زائر → التسجيل/الدخول، مسجّل دخول → مساحته حسب الدور.
 */
export function SessionCta({
  to,
  label,
  className,
  search,
  signedInLabel,
}: {
  to: string;
  label: string;
  className?: string;
  search?: Record<string, string>;
  signedInLabel?: string;
}) {
  const { t } = useTranslation();
  const { session, isSignedIn } = useSession();

  if (isSignedIn && session) {
    return (
      <Link to={session.home} className={className}>
        {signedInLabel ?? t("common.goToDashboard", { defaultValue: t("common.dashboard") })}
      </Link>
    );
  }

  return (
    <Link to={to} search={search as never} className={className}>
      {label}
    </Link>
  );
}
