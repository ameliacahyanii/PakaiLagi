# PakaiLagi

PakaiLagi adalah platform ekonomi sirkular yang membantu pengguna menentukan
jalur terbaik untuk barang yang sudah tidak digunakan: dijual, ditukar,
didonasikan, diperbaiki, atau didaur ulang.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database, Storage, and Row Level Security
- `@supabase/ssr` for browser and server clients

## Project structure

```text
src/
  app/                 Routes, layouts, and route-level UI
  components/
    ui/                Reusable presentational components
    layout/            Shared application shell components
  lib/
    supabase/          Browser and server Supabase clients
    ai/                Vision provider and transparent recommendation rules
  types/               Shared and generated database types
public/                Static assets
.env.local             Local environment variables (not committed)
supabase/migrations/   Database schema, roles, and RLS policies
```

Keep pages in `src/app/`. Put reusable UI in `src/components/`. Keep shared
technical helpers in `src/lib/`. When a feature becomes large enough to need
multiple queries, actions, schemas, and components, introduce a domain folder
under `src/features/`; it is intentionally not part of the base yet.

Use Server Components by default and add `"use client"` only for interaction.
Keep Supabase queries out of presentational components. Generated Supabase
types belong in `src/types/database.ts`.

## MVP flow

```text
Upload item photo
  -> AI item identification
  -> Condition inspection
  -> Transparent condition score
  -> Circular recommendation
  -> Listing creation
  -> Claim and handover verification
  -> Impact record
```

AI results must be reviewed by the user before publication. The AI must not
claim that an item is safe, authentic, or fully functional from an image alone.

## Local setup

```bash
npm install
npm run dev
```

Create `.env.local` with the Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

For Google OAuth, enable Google under Supabase Authentication > Providers and
add these redirect URLs:

```text
http://localhost:3000/auth/callback
https://YOUR_DOMAIN/auth/callback
```

The public auth form only creates regular `user` accounts. Create the admin
account manually under Supabase Authentication > Users, then replace the email
in `supabase/admin-bootstrap.sql` and run it in the SQL Editor.

Never commit `.env.local` or expose a Supabase `service_role` key to the client.
Enable Row Level Security on every application table.

## AI implementation

The MVP does not train a custom ML model. It uses a vision model through the
server-only `src/lib/ai/vision-provider.ts`, then applies transparent rules for
condition score and circular recommendations. This is faster to validate and
safer to explain to judges than claiming a custom model without a training
dataset.

Copy `.env.example` to `.env.local` and optionally add `AI_API_KEY`. Without a
provider key, `/api/analyze` uses the controlled `demo-rules` fallback so the
competition flow remains runnable. Never expose `AI_API_KEY` in a
`NEXT_PUBLIC_*` variable.

Apply `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor
before connecting real data. It creates the user, admin, and partner role
foundation, item lifecycle tables, storage bucket, and RLS policies.

## Validation

```bash
npm run lint
npm run build
```
