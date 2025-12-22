# API Documentation

This document describes the Category and Hero Banner REST APIs. Base URL: `http://<host>:<port>/api` (e.g. `http://localhost:5001/api`).

**Category**

- **Create Category**
  - Method: `POST`
  - URL: `/categories`
  - Body (application/json):
    - `name` (string, required)
    - `description` (string)
    - `status` (string) - default `active`
    - `image` (string)
    - `url` (string)
    - `is_include_top_nav` (boolean)
  - Success: `201` with created category object

- **Get All Categories**
  - Method: `GET`
  - URL: `/categories`
  - Success: `200` with array of categories

- **Get Single Category**
  - Method: `GET`
  - URL: `/categories/:id`
  - Success: `200` with category object or `404` if not found

- **Update Category**
  - Method: `PUT`
  - URL: `/categories/:id`
  - Body: any updatable fields (same as create)
  - Success: `200` with updated category

- **Delete Category**
  - Method: `DELETE`
  - URL: `/categories/:id`
  - Success: `200` with deletion message

Example (PowerShell) - Create:
```powershell
curl -Method POST -Uri http://localhost:5001/api/categories -ContentType 'application/json' -Body '{ "name":"Cardiology", "image":"cardio.jpg" }'
```

**Hero Banner**

- **Create Hero Banner**
  - Method: `POST`
  - URL: `/hero-banners`
  - Body (application/json):
    - `title` (string, required)
    - `subtitle` (string)
    - `description` (string)
    - `image` (string, required)
    - `button_text` (string)
    - `button_url` (string)
    - `status` (string) - default `active`
    - `sort_order` (integer) - default `1`
  - Success: `201` with created hero banner object

- **Get All Hero Banners**
  - Method: `GET`
  - URL: `/hero-banners`
  - Success: `200` with array of hero banners (ordered by `sort_order` asc)

- **Get Single Hero Banner**
  - Method: `GET`
  - URL: `/hero-banners/:id`
  - Success: `200` with hero banner object or `404` if not found

- **Update Hero Banner**
  - Method: `PUT`
  - URL: `/hero-banners/:id`
  - Body: any updatable fields (same as create)
  - Success: `200` with updated hero banner

- **Delete Hero Banner**
  - Method: `DELETE`
  - URL: `/hero-banners/:id`
  - Success: `200` with deletion message

Example (PowerShell) - Create:
```powershell
curl -Method POST -Uri http://localhost:5001/api/hero-banners -ContentType 'application/json' -Body '{ "title":"Welcome","image":"hero1.jpg" }'
```

Notes & Recommendations:
- The server currently uses `sequelize.sync()` to create/sync tables. For production, consider using Sequelize migrations.
- If the `image` field will hold uploaded files, add an upload endpoint (e.g., using `multer`) and store the file path or external URL in the `image` field.
- Add authentication/authorization for protected routes if needed.
