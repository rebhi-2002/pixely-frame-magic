// بناء شجرة الصلاحيات بالمتصفح مباشرة لجلسات الباك اند الحقيقية (غير demo).
//
// السبب: getMyAccess (server function بـ rbac.functions.ts) بتشتغل على
// سيرفر Netlify، وما بتقدر تتحقق من كوكي جلسة الباك اند (ASP.NET على
// دومين etempurl.com منفصل) — المتصفح ما بيبعتها لطلب Netlify-to-Netlify.
// فبدل ما نحاول نتحقق سيرفريًا من شي المتصفح نفسه شايفه أصلاً (الجلسة
// شغالة، اتحقق منها بـ verifyServerSession عبر نداء مباشر من المتصفح
// لـ /api/User/MyProfileModal)، منبني نفس شكل MyAccess هون محليًا.
//
// كل دور حقيقي متأكدين منه (profile.roleId موجود فعليًا — راجع fetchUserType
// بـauth.ts) بياخد وصول كامل لمساحته هو بس (الصفحات يلي بادئتها تطابق دوره،
// نفس آلية pageMatchesRole المستخدمة أصلاً بـGuard) — مبني على نفس شجرة
// الصفحات الثابتة (MODULES/PAGES) يلي بيستخدمها وضع الديمو، لأنه معظم هالصفحات
// لسا مبنية على بيانات ديمو مش تكامل حقيقي (راجع التقرير الشامل). لو تعذّر
// تحديد الدور (roleId=null) بنرجع access فاضي بدل ما نخمّن — أأمن.
//
// TODO: لما الباك اند يوفر Pages/Permissions حقيقية تطابق مفاتيح الصفحات
// (pageKey) المستخدمة فعليًا بالراوتات، نستبدل هالمنطق بنداء حقيقي لـ
// listBackendPages()/listGrantedPageIds() (admin-pages.ts/admin-permissions.ts)
// بدل شجرة الديمو الثابتة.

import type { AccessModule, AccessPage, MyAccess } from "./rbac-types";
import { MODULES, PAGES, PERMISSION_KEYS } from "./rbac-static-data";
import { pageMatchesRole, type RoleKey } from "./bi";

export function emptyAccess(userId: string): MyAccess {
  return { userId, isAdmin: false, profile: null, modules: [], permissions: {} };
}

function buildAccessTree(
  userId: string,
  profile: { name: string; email: string; avatar: string | null },
  roleId: string,
  roleName: string,
  isAdmin: boolean,
  pageAllowed: (pageKey: string) => boolean,
): MyAccess {
  const allPermKeys = PERMISSION_KEYS.map((p) => p.key);
  const enabledModules = MODULES.filter((m) => m.enabled).sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const modules: AccessModule[] = [];
  const permissions: Record<string, string[]> = {};

  for (const m of enabledModules) {
    const modulePages = PAGES.filter((p) => p.module_id === m.id).sort(
      (a, b) => a.sort_order - b.sort_order,
    );

    const build = (parentId: string | null): AccessPage[] =>
      modulePages
        .filter((p) => p.parent_id === parentId)
        .map((p) => ({
          id: p.id,
          key: p.key,
          name: p.name,
          nameEn: p.name_en,
          icon: p.icon,
          path: p.path,
          permissions: pageAllowed(p.key) ? allPermKeys : [],
          canView: pageAllowed(p.key),
          children: build(p.id),
        }));

    const tree = build(null);
    if (tree.length === 0) continue;

    const collect = (list: AccessPage[]) => {
      for (const p of list) {
        permissions[p.key] = p.permissions;
        collect(p.children);
      }
    };
    collect(tree);

    modules.push({
      id: m.id,
      key: m.key,
      name: m.name,
      nameEn: m.nameEn,
      icon: m.icon,
      pages: tree,
    });
  }

  return {
    userId,
    isAdmin,
    profile: {
      id: userId,
      full_name: profile.name,
      email: profile.email,
      avatar_url: profile.avatar,
      role_id: roleId,
      role_name: roleName,
    },
    modules,
    permissions,
  };
}

export function buildFullAdminAccess(
  userId: string,
  profile: { name: string; email: string; avatar: string | null },
): MyAccess {
  return buildAccessTree(userId, profile, "backend-admin", "مدير النظام", true, () => true);
}

/**
 * وصول لأي دور حقيقي غير الأدمن (طالب/معلم/ولي أمر) — يُمنح فقط لو تأكدنا
 * فعليًا من الدور (roleId جاي من الباك اند، مش افتراض). بيحصر الوصول
 * بالصفحات يلي بادئتها تطابق الدور (pageMatchesRole)، بنفس آلية Guard.
 */
export function buildRoleAccess(
  userId: string,
  profile: { name: string; email: string; avatar: string | null },
  roleId: number,
  roleName: string,
  roleKey: RoleKey,
): MyAccess {
  return buildAccessTree(userId, profile, String(roleId), roleName, false, (pageKey) =>
    pageMatchesRole(pageKey, roleKey),
  );
}
