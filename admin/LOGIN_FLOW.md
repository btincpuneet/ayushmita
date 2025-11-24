# Admin Login Flow (overview)

This document explains what happens when a user signs in from the Admin app, where the code lives, and suggested improvements.

## Quick summary
- Frontend sends credentials to the backend `/api/login` endpoint.
- Backend authenticates, returns a JWT and `user` object (including `role`).
- Frontend stores `token`, `role`, and `authenticated` in `localStorage` and navigates to an admin route.
- Admin layout mounts routes from `admin/src/routes.js` and renders components (Manage Agent, Manage Category, etc.).

## Files (frontend)
- `admin/src/views/auth/signIn/index.jsx`
  - Form handler: sends POST to `${API_BASE}/api/login` and receives `{ success, token, user }`.
  - Stores in localStorage:
    - `localStorage.setItem('authenticated', 'true')`
    - `localStorage.setItem('role', role)`
    - `localStorage.setItem('token', token)`
  - Navigates using `useNavigate()` to role-specific route (e.g. `/admin/default`).

- `admin/src/routes.js`
  - Route definitions mapping paths to components (e.g. `/manage-agent`, `/manage-category`).

- `admin/src/layouts/admin/index.js`
  - Admin layout reads `routes` and mounts `<Route>` elements produced by `getRoutes(routes)`.
  - Renders `Sidebar` and the active page component within the layout.

- `admin/src/components/sidebar/Sidebar.js`
  - Renders left navigation and calls `navigate(route.layout + route.path)` on click.

- Example admin pages that fetch data after mount:
  - `admin/src/views/admin/default/components/ManageAgent.js`
  - `admin/src/views/admin/default/components/ManageCategory.js`
  - They call backend APIs like `/api/agent` and `/api/categories`.

- `admin/src/views/admin/default/components/DashboardHeader.js`
  - Contains the Logout button (clears localStorage and redirects to `/auth/sign-in`).

## Files (backend)
- `backendapi/routes/auth/index.js`
  - POST `/login` - checks credentials, signs JWT, returns `token` and `user`.
  - Middleware `authenticateToken` verifies `Authorization: Bearer <token>`.

- `backendapi/routes/agent/index.js` and `backendapi/routes/category/index.js`
  - CRUD endpoints mounted by `backendapi/server.js` under `/api` (e.g. `/api/agent`, `/api/categories`).

## How the flow travels (step-by-step)
1. User fills login form in `admin/src/views/auth/signIn/index.jsx` and submits.
2. Frontend `handleSubmit()` calls `POST http://127.0.0.1:5001/api/login` with `{ email, password }`.
3. Backend `backendapi/routes/auth/index.js` finds the User, verifies password, and returns `{ success: true, token, user }`.
4. Frontend stores `token`, `role`, `authenticated` in localStorage and calls `navigate('/admin/default')` (or other path based on role).
5. Admin layout (`admin/src/layouts/admin/index.js`) mounts the appropriate route and component from `admin/src/routes.js`.
6. The mounted component (e.g., `ManageAgent`) runs its `useEffect` to fetch list data from backend endpoints.
7. User can Add/Edit/Delete — frontend calls POST/PUT/DELETE on the corresponding `/api/...` endpoints.
8. Logout clears `localStorage` and redirects to `/auth/sign-in`.

## Recommended improvements
- Attach `Authorization` header automatically after login:
  - If using axios, after receiving token in `signIn`:

```js
// admin/src/views/auth/signIn/index.jsx (after successful login)
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

  - Or for fetch, include the header in each request:

```js
fetch(url, { headers: { Authorization: `Bearer ${token}` } });
```

- Use a central API client (e.g., `admin/src/api.js`) to set headers and reuse axios instance.
  - We added `admin/src/config/api.js` which exports `REACT_APP_API_BASE_URL` fallback. Use that file in components.
- Implement a route guard wrapper to protect `/admin/*` routes if `localStorage.authenticated` is not set or token is invalid.
- Handle token expiry (401) globally to redirect to sign-in.

## How to test manually
1. Start backend: run the server (follow existing README for `backendapi` or `backend2`).
2. Start admin frontend:

```powershell
cd admin
npm install
npm start
```

3. Open `http://localhost:3000/auth/sign-in` and log in with a valid account.
4. Verify `localStorage` contains `token` and `role`.
5. Check DevTools → Network for requests to `/api/*` and ensure `Authorization` header is sent when needed.

## Where to add this doc
- Currently added as `admin/LOGIN_FLOW.md`. Move or merge into your project docs or top-level README if you prefer.

---

If you want, I can:
- Add the `axios.defaults.headers.common['Authorization']` line automatically in `signIn/index.jsx` for you.
- Add a small `api.js` wrapper and update components to use it.
- Implement a Route Guard component to protect admin routes.

Tell me which of the suggested improvements you want me to implement next.