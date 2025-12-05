# Backend API — Database Schema (backendapi)

This document describes the database schema exposed and used by the `backendapi` service in this workspace. It covers current Sequelize models, columns, types, defaults, and the REST endpoints that operate on them.

Location
- Backend API code: `c:/ayushmita/backendapi`
- Models: `c:/ayushmita/backendapi/models`
- Config: `c:/ayushmita/backendapi/config/config.js` (DB connection parameters)

Database connection
- DB config file: `backendapi/config/config.js`
  - database: `ayushmati_db`
  - username: `root`
  - password: `` (empty)
  - host: `127.0.0.1`
  - dialect: `mysql`

Note: The project uses Sequelize. Models call `sequelize.sync()` during startup which will ensure tables exist (be careful in production).

---

Models (tables)

1) users
- Model file: `backendapi/models/index.js` (defines `User`)
- Table name: `Users` (Sequelize model `User`) — actual DB table name uses default pluralization unless configured otherwise.

Columns
- id: INTEGER, PRIMARY KEY, AUTO INCREMENT
- name: STRING, NOT NULL
- email: STRING, NOT NULL, UNIQUE
- phone: STRING, NOT NULL
- password: STRING, NOT NULL (hashed by bcrypt)
- role: STRING, default `'user'` (examples: `superadmin`, `user`)
- city: STRING, NOT NULL
- state: STRING, NOT NULL
- zip: STRING, NULLABLE
- status: STRING, default `'active'`
- location: VIRTUAL (derived from `city` + `state`, not persisted)

Notes
- `timestamps: false` — no `createdAt` / `updatedAt` fields being created automatically.
- `underscored: true` — column names in DB will be snake_case if Sequelize pluralization applies.

2) categories
- Model file: `backendapi/models/category.js` (defines `Category`)
- Table name: `Categories`

Columns
- id: INTEGER, PRIMARY KEY, AUTO INCREMENT
- name: STRING, NOT NULL, UNIQUE
- description: STRING, NULLABLE
- status: STRING, default `'active'`
- image: STRING, NULLABLE — typically stores an image URL or path
- url: STRING, NULLABLE — frontend route or link
- is_include_top_nav: BOOLEAN, default `false`

Options
- `timestamps: false`
- `underscored: true`

---

Migrations and Seeders
- Migrations folder: `backendapi/migrations`
  - Contains `20250119201717-remove-location-column.js` (removes `location` column from `technicians` table in a different module)
- Seeders folder: `backendapi/seeders` (currently empty)

Note: The codebase currently uses `sequelize.sync()` in model files (not migration-driven sync). For production workflows, prefer defining migrations and using `sequelize-cli` to manage schema changes.

---

REST endpoints that interact with these tables

Auth
- `POST /api/login` — authenticates user (see `backendapi/routes/auth/index.js`) and returns a JWT and `user` object.
- `POST /api/logout` — (protected) currently returns success; token blacklisting not implemented.

Users (some endpoints exist under auth routes)
- `GET /api/users` — list users (protected?)
- `GET /api/users/:id` — get user by id
- `POST /api/users` — create user (API hashes password with bcrypt)
- `PUT /api/users/:id` — update user
- `DELETE /api/users/:id` — delete user

Categories
- `POST   /api/categories`       — create category
- `GET    /api/categories`       — list all categories
- `PUT    /api/categories/:id`   — update category
- `DELETE /api/categories/:id`   — delete category

(See `backendapi/routes/category/index.js` and `backendapi/controllers/categoryController.js`)

---

Sample SQL CREATE statements (approximate)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'user',
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip VARCHAR(255),
  status VARCHAR(255) DEFAULT 'active'
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),
  status VARCHAR(255) DEFAULT 'active',
  image VARCHAR(255),
  url VARCHAR(255),
  is_include_top_nav TINYINT(1) DEFAULT 0
);
```

---

Recommendations
- Move away from `sequelize.sync()` in model files for production; use `sequelize-cli` migrations to manage schema changes reliably.
- Add seeders for initial data (admin user, default categories).
- Add DB constraints and indexes for fields used in `WHERE`/`JOIN` queries (e.g., `email` already unique).
- Consider adding `created_at` / `updated_at` if you want auditing (remove `timestamps:false`).
- If endpoints require auth, ensure clients send `Authorization: Bearer <token>` and backend uses `authenticateToken` middleware.

---

If you'd like, I can also:
- Generate SQL migration files for these models.
- Add a seeder to create an initial `superadmin` user (with a hashed password) and example categories.
- Add documentation for how to run migrations and seeders locally.

Which of these would you like me to produce next?