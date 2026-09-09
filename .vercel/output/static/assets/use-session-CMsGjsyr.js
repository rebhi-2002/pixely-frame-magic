import {
  a as e,
  c as t,
  d as n,
  f as r,
  h as i,
  ht as a,
  i as o,
  m as s,
  p as c,
  vt as l,
} from "./rbac-static-data-Cz2qa6wH.js";
var u = l(a()),
  d = {
    "r-admin": `admin`,
    "r-supervisor": `supervisor`,
    "r-teacher": `teacher`,
    "r-parent": `parent`,
    "r-student": `student`,
  };
function f() {
  if (!i()) return null;
  let n = s() ?? `u-admin`,
    a = c(),
    l = e.find((e) => e.id === n) ?? e[0],
    u = o.find((e) => e.id === l.role_id),
    f = u?.name === `مدير عام`;
  return {
    userId: n,
    email: a?.email ?? r() ?? l.email,
    fullName: a?.name ?? l.full_name,
    avatarUrl: a?.avatar ?? l.avatar_url,
    roleName: u?.name ?? null,
    roleKey: (l.role_id && d[l.role_id]) || `student`,
    isAdmin: f,
    home: t(u?.name, f),
  };
}
function p() {
  let [e, t] = (0, u.useState)(null),
    [r, i] = (0, u.useState)(!0);
  return (
    (0, u.useEffect)(() => {
      let e = () => {
        (t(f()), i(!1));
      };
      return (e(), window.addEventListener(n, e), () => window.removeEventListener(n, e));
    }, []),
    { session: e, isSignedIn: !!e, isLoading: r }
  );
}
export { p as t };
