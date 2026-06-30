# Saurav Suman — Portfolio

Personal portfolio site with a database-backed CMS and admin portal. A rebuild
of the original Create React App version on a modern, modular stack. The visual
language of the original is preserved — see [`DESIGN.md`](DESIGN.md).

## Stack

- **Next.js 16** (App Router, Server Actions) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config, design tokens via `@theme`)
- **next/font** — self-hosted Playfair Display + IBM Plex Mono
- **Postgres + Drizzle ORM** — content & contact submissions
- **Auth**: `jose` (signed JWT session) + `bcryptjs`, single env-configured admin

## Getting started

```bash
npm install
cp .env.example .env.local        # then fill in the values (see below)

docker compose up -d              # local Postgres on :5432
npm run db:push                   # create tables
npm run db:seed                   # seed CMS content from src/content/*.ts

npm run dev                       # http://localhost:3000
```

Admin portal: <http://localhost:3000/admin> (redirects to `/admin/login`).

### Environment variables

| Var                   | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| `DATABASE_URL`        | Postgres connection string (local Docker, or Neon/Vercel in prod) |
| `AUTH_SECRET`         | Random ≥16-char string used to sign the admin session JWT      |
| `ADMIN_USERNAME`      | Admin login username                                           |
| `ADMIN_PASSWORD_HASH` | bcrypt hash — `node scripts/hash-password.mjs "yourpassword"`  |

### Scripts

```bash
npm run build      # production build
npm run lint       # eslint
npm run db:push    # push schema to the database (no migration files)
npm run db:generate# generate SQL migration files from schema changes
npm run db:migrate # apply migration files
npm run db:seed    # seed CMS tables from src/content/*.ts
npm run db:studio  # Drizzle Studio — browse/edit data in a GUI
```

## Project structure

```
src/
  app/
    (public)          # layout, page (sections), global tokens, /api/contact
    admin/
      login/          # public login (server action + form)
      (panel)/        # protected: dashboard, submissions, experience,
                      #   projects, skills, education (inline CRUD)
  components/
    layout/  sections/  ui/        # public site
    admin/                         # admin form primitives + SubmitButton
  content/            # seed data (typed) for the CMS
  db/                 # schema, client (getDb), queries, seed
  lib/                # auth (jose), admin-auth (bcrypt), helpers, cn()
middleware.ts         # protects /admin/* (edge, jose only)
```

### How content flows

- **CMS-managed** (editable at `/admin`, stored in Postgres): experience,
  projects, skills, education. Public sections read them via `src/db/queries.ts`.
- **Code-managed** (in `src/content`): site identity/nav (`site.ts`) and the
  intro copy (`intro.ts`). `src/content/*.ts` also seeds the DB initially.
- Mutations call `revalidatePath("/")`, so edits publish immediately.

## Deployment (Vercel)

1. Provision Postgres (Neon or Vercel Postgres) and copy the **pooled**
   connection string.
2. Set the four env vars above in the Vercel project (Production + Preview).
3. Push to GitHub → Vercel builds and deploys.
4. After the first deploy, run `db:push` + `db:seed` against the production
   `DATABASE_URL` (or `db:migrate`) to create and populate tables.
