## 2. Base API client

```javascript
// api/client.js
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5058/api";
// [Route("api/[controller]/[action]")] means every path is /api/{Controller}/{Action}

async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // REQUIRED — sends/accepts the Identity auth cookie cross-origin
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export default apiCall;
```

`credentials: "include"` is the fetch equivalent of axios's `withCredentials: true`.

---

## 3. Auth flow

```javascript
// Login
await apiCall("/Auth/Login", {
  method: "POST",
  body: { email: "admin@Academia.com", password: "fastadmin" },
});
// Browser now holds the .AspNetCore.Identity.Application cookie automatically

// Logout
await apiCall("/Auth/Logout", { method: "POST" });
```

Both return `OperationResult`: `{ success, message }`.

---

## 4. DataTable-style `GetAll` endpoints

```javascript
// Users
const users = await apiCall("/User/GetAll", {
  method: "POST",
  body: {
    searchValue: "",
    sortColumn: "Name",
    sortColumnDirection: "asc",
    pageSize: 10,
    skip: 0,
    userTypeId: null,
    genderId: null,
    isActiveSearch: null,
  },
});
// users.data, users.totalCount

// Constants
const constants = await apiCall("/Constant/GetAll", {
  method: "POST",
  body: { searchValue: "", sortColumn: "Name", sortColumnDirection: "asc", pageSize: 10, skip: 0 },
});

// Pages
const pages = await apiCall("/Page/GetAll", {
  method: "POST",
  body: { searchValue: "", sortColumn: "Name", sortColumnDirection: "asc", pageSize: 10, skip: 0 },
});
```

### Sort-column safety (backend fix applied)

The `GetAll` sort logic now runs through a whitelist helper (`SortHelper.ApplySort`) in `Acadimia.Infrastructure/Services`, wired into `UsersService`, `ConstantsService`, `PagesService`, and `UserTypesService`. Practical effect for the frontend:

- Send any `sortColumn` value — a real column name, a typo, or garbage. Unrecognized values are ignored and the API falls back to a sensible default sort instead of throwing a 500.
- `sortColumnDirection` is clamped to `asc`/`desc`; anything else defaults to `asc`.
- You no longer need to hardcode a "safe" column list on the frontend to avoid crashing the API.

---

## 5. Create/Edit and Delete

```javascript
// Create/Edit Page — matches PageInputDto
await apiCall("/Page/CreateEdit", {
  method: "POST",
  body: {
    id: 0,
    name: "صفحة جديدة",
    nameEn: "New Page",
    link: "Some/Path",
    icon: null,
    inMenu: true,
    isActive: true,
    isAjax: false,
    parentId: 3,
    moduleId: 1,
    categoryId: 2,
  },
});

// Delete — HTTP DELETE + query param
await apiCall(`/Page/Delete?id=${pageId}`, { method: "DELETE" });
```

All Create/Edit/Delete actions return `OperationResult`. Check `result.success` before treating it as done — a 200 response doesn't guarantee the operation succeeded (e.g. validation failures still return `200` with `success: false` and a `message`).

---

## 6. Environment-specific base URL

Don't hardcode `BASE_URL`:

```javascript
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5058/api"; // Vite
// or process.env.REACT_APP_API_URL for CRA
```

On deployment (e.g. SmartASP.NET), this becomes the live domain, e.g. `https://yourapp.smartasphost.com/api`.

---

## Known open items (not yet addressed)

- `UsersService.GetAllAsync` references `input.SearchValue.Gender` in a `Where` clause, but nothing appears to set `Gender` on the search DTO — worth confirming this isn't dead code from a refactor before the frontend relies on it.
- No rate limiting / request throttling configured yet on write endpoints (`CreateEdit`, `Delete`).
