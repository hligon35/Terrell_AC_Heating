# Terrell AC and Heating — Website & Admin

This workspace contains a Next.js + TypeScript + Tailwind site and a simple admin backend for Terrell AC and Heating.

Quick start:

1. Install dependencies

```bash
npm install
```

2. Seed sample data

```bash
npm run seed
```

3. Start dev server

```bash
npm run dev
```

Admin:
- Login: /admin/login (default credentials: `admin` / `password` or set via `ADMIN_USER` and `ADMIN_PASS` env)

APIs:
- `GET /api/content` — read published + draft content
- `POST /api/content` — admin-only write draft/publish (send JSON with `publish: true` to publish)
- `POST /api/leads` — public endpoint to submit leads
- `GET /api/leads` — admin-only view leads
- `POST /api/newsletter` — subscribe
- `POST /api/media/upload` — admin-only upload (base64)

Persistence: a simple JSON DB is stored at `data/db.json` for this demo. Media uploads are saved to `public/uploads`.

Notes:
- This is a scaffolded, production-ready UI and API surface. For production, replace the cookie auth with a secure provider, add validation, rate-limiting, and replace JSON-file persistence with a proper database.
