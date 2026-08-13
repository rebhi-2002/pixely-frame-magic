import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * حسابات تجريبية سريعة للاختبار فقط (تُحذف لاحقاً).
 * تُنشئ الحساب إن لم يكن موجوداً وتعيد بيانات الدخول.
 */
const ROLE_NAMES: Record<string, string> = {
  admin: "مدير عام",
  supervisor: "مشرف أكاديمي",
  teacher: "معلم",
  parent: "ولي أمر",
  student: "طالب",
};

const FULL_NAMES: Record<string, string> = {
  admin: "أدمن تجريبي",
  supervisor: "مشرف تجريبي",
  teacher: "معلم تجريبي",
  parent: "ولي أمر تجريبي",
  student: "طالب تجريبي",
};

export const DEMO_PASSWORD = "Academia@2026";

export const ensureDemoAccount = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        role: z.enum(["admin", "supervisor", "teacher", "parent", "student"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = `demo.${data.role}@academia.test`;
    const password = DEMO_PASSWORD;

    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    let user = list?.users.find((u) => u.email === email) ?? null;

    if (!user) {
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: FULL_NAMES[data.role], requested_role: data.role },
      });
      if (error) throw new Error(error.message);
      user = created.user;
    } else {
      await supabaseAdmin.auth.admin.updateUserById(user.id, { password, email_confirm: true });
    }

    if (!user) throw new Error("تعذّر تهيئة الحساب التجريبي");

    /* ضبط الدور بدقّة (لا نعتمد على التريغر وحده) */
    const { data: role } = await supabaseAdmin
      .from("roles")
      .select("id")
      .eq("name", ROLE_NAMES[data.role])
      .maybeSingle();

    if (role) {
      await supabaseAdmin
        .from("profiles")
        .update({ role_id: role.id, full_name: FULL_NAMES[data.role], is_active: true })
        .eq("user_id", user.id);
    }

    if (data.role === "admin") {
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
    } else {
      await supabaseAdmin.from("user_roles").delete().eq("user_id", user.id).eq("role", "admin");
    }

    return { email, password };
  });
