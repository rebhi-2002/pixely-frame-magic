import {
  _ as e,
  g as t,
  j as n,
  m as r,
  n as i,
  p as a,
  r as o,
  t as s,
} from "./rbac-static-data-Cz2qa6wH.js";
import { E as c } from "./query-DmDC6lXh.js";
import { i as l, n as u, r as d, t as f } from "./auth-middleware-CmTSOr_x.js";
var p = d({ method: `GET` })
    .middleware([f])
    .handler(c(`3b35a01bd5c939e1ccf817ef8e2d95da72450be263e4c90b0ec119cae61c4641`)),
  m = d({ method: `GET` })
    .middleware([f])
    .handler(c(`43f41e9156f8f037555e9dde5fef858265ce8ecc9d8a8e424f7ceaa811d511d9`)),
  h = d({ method: `POST` })
    .middleware([f])
    .handler(c(`946dd497c24bf8d36254653c7f41eb3d5c7377b174d4b5fced729318b6d150b3`)),
  g = d({ method: `GET` })
    .middleware([f])
    .handler(c(`b3e7240a64b294422dcd5dc2f87014a45ea44a13d7c9e4717eb196e88a6389d0`)),
  _ = d({ method: `POST` })
    .middleware([f])
    .handler(c(`79443092956277e07f294e87b21a2dc66b35872b2a71ae0752e0d3e8b9670af7`)),
  v = d({ method: `POST` })
    .middleware([f])
    .handler(c(`68aa14d1b8034aca3740719a1ab75f8f755273a3c48e773af9075eae27b70a63`)),
  y = d({ method: `POST` })
    .middleware([f])
    .handler(c(`b96d976207999c28e41d8af45ef68eaa7e9d2d837ff307cca736138c69ef0afe`)),
  b = d({ method: `POST` })
    .middleware([f])
    .handler(c(`91fba1d53d7effe772a1fa2acf1f20d3554f899c639ea07320f087ddb255d93f`)),
  x = d({ method: `GET` })
    .middleware([f])
    .handler(c(`aa03dc8fb833649809fc141180e8f16874028bb0aadb8fd3c37e781f5def72bd`));
(d({ method: `POST` })
  .middleware([f])
  .handler(c(`9a293f22c1bb39dae946a749d672812445a9e07dd3f6db07865944bcf6a30ad0`)),
  d({ method: `POST` })
    .middleware([f])
    .handler(c(`fb205e7a8e34b724348b4faafceec9ce36f492599bcf26b52c047b11a927ad9b`)),
  d({ method: `POST` })
    .middleware([f])
    .handler(c(`8f956e8410d327174a5b573b64cfb8eb2c059f590228898ac9af3f642e4c773c`)),
  d({ method: `POST` })
    .middleware([f])
    .handler(c(`7f66dcc378b0c1dafb40cfa8380bc2b145f6c0b5ae45591233e0d87fbd6136ca`)));
var S = d({ method: `POST` })
  .middleware([f])
  .handler(c(`64a40ba867066efd81962cdda0cf7c813fff4f2a9c51dfba7bfd567879f32599`));
function C(e) {
  return { userId: e, isAdmin: !1, profile: null, modules: [], permissions: {} };
}
function w(e, t) {
  let n = o.map((e) => e.key),
    r = s.filter((e) => e.enabled).sort((e, t) => e.sort_order - t.sort_order),
    a = [],
    c = {};
  for (let e of r) {
    let t = i.filter((t) => t.module_id === e.id).sort((e, t) => e.sort_order - t.sort_order),
      r = (e) =>
        t
          .filter((t) => t.parent_id === e)
          .map((e) => ({
            id: e.id,
            key: e.key,
            name: e.name,
            nameEn: e.name_en,
            icon: e.icon,
            path: e.path,
            permissions: n,
            canView: !0,
            children: r(e.id),
          })),
      o = r(null);
    if (o.length === 0) continue;
    let s = (e) => {
      for (let t of e) ((c[t.key] = t.permissions), s(t.children));
    };
    (s(o),
      a.push({ id: e.id, key: e.key, name: e.name, nameEn: e.nameEn, icon: e.icon, pages: o }));
  }
  return {
    userId: e,
    isAdmin: !0,
    profile: {
      id: e,
      full_name: t.name,
      email: t.email,
      avatar_url: t.avatar,
      role_id: `backend-admin`,
      role_name: `مدير النظام`,
    },
    modules: a,
    permissions: c,
  };
}
var T = [`my-access`];
function E() {
  let n = l(p),
    i = u({
      queryKey: T,
      queryFn: async () => {
        if (t()) return n();
        let i = r();
        if (!i) return C(``);
        if (e()) {
          let e = a();
          return w(i, { name: e?.name ?? ``, email: e?.email ?? ``, avatar: e?.avatar ?? null });
        }
        return C(i);
      },
      staleTime: 3e4,
    }),
    o = i.data,
    s = (e, t) => !!o?.permissions[e]?.includes(t);
  return { ...i, access: o, can: s };
}
function D() {
  let e = n();
  return () => e.invalidateQueries({ queryKey: T });
}
export {
  y as a,
  x as c,
  h as d,
  S as f,
  v as i,
  _ as l,
  E as n,
  m as o,
  D as r,
  g as s,
  T as t,
  b as u,
};
