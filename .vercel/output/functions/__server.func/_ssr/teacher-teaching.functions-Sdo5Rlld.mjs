import { r as createServerFn } from "./server-EBKWEHZn.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Deneh4is.mjs";
import { t as requireAuth } from "./auth-middleware-yb1wlLWh.mjs";
import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher-teaching.functions-Sdo5Rlld.js
var listTeacherCourses = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(createSsrRpc("a8e9734b27912223c1ab5ac1107a4b1a4d79b2f1c04158a6307a72ae8879c890"));
var saveTeacherCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType().optional(),
      title: stringType().trim().min(2, "اسم الكورس مطلوب"),
      price: numberType().min(0),
      enrolledCount: numberType().int().min(0),
      status: enumType(["منشور", "مسوّدة"]),
    }).parse(input),
  )
  .handler(createSsrRpc("046f4a6b8f538c8c0c556690c0f079e43d7ba75af1adb0d4be6f84f0895a4456"));
var deleteTeacherCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => objectType({ id: stringType() }).parse(input))
  .handler(createSsrRpc("d6af381603db71f94f0af681eb2954b73ea0ae1691448625d7dd532697fbd872"));
var listContentItems = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(createSsrRpc("c4512e57d4bd724cf993c69271154a30b37fd0620f2700c1465af3269f8652f6"));
var saveContentItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType().optional(),
      title: stringType().trim().min(2, "العنوان مطلوب"),
      subjectName: stringType().trim().min(2, "المادة مطلوبة"),
      status: enumType(["منشور", "قيد المراجعة", "مسوّدة"]),
      viewsCount: numberType().int().min(0),
    }).parse(input),
  )
  .handler(createSsrRpc("92f7d529f1688491c963e0c6895627bd639f6175431e448d9914e4049569ca9e"));
var deleteContentItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => objectType({ id: stringType() }).parse(input))
  .handler(createSsrRpc("7aa0c62786e801bf45090326f7874dcf0ebf148acfccdb8ecafab77432e5ed58"));
var listQuizItems = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(createSsrRpc("9557ebe27b4fd4cb2c25977e801613e5afafd5dea29b2df87088ae1692668f00"));
var saveQuizItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType().optional(),
      title: stringType().trim().min(2, "اسم الاختبار مطلوب"),
      questionsCount: numberType().int().min(1),
      attemptsCount: numberType().int().min(0),
      avgScore: numberType().min(0).max(100),
      status: enumType(["نشط", "مسوّدة"]),
    }).parse(input),
  )
  .handler(createSsrRpc("f5e4b30d72e6b06c0c65f79225dac79e4526cfa3fc0be7dd27600b50f74640d6"));
var deleteQuizItem = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => objectType({ id: stringType() }).parse(input))
  .handler(createSsrRpc("b182f21002f6f80ec0bb69576c34e4d9c032903c4bd6e26622f6f31bac3586de"));
var listOpenClassQuestions = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(createSsrRpc("4d222d1419ef7c2fd01976113e58b9162cc1f2c5d3c5f1315d516f8b156eb235"));
//#endregion
export {
  listOpenClassQuestions as a,
  saveContentItem as c,
  listContentItems as i,
  saveQuizItem as l,
  deleteQuizItem as n,
  listQuizItems as o,
  deleteTeacherCourse as r,
  listTeacherCourses as s,
  deleteContentItem as t,
  saveTeacherCourse as u,
};
