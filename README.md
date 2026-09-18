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
  types/               Shared and generated database types
public/                Static assets
.env.local             Local environment variables (not committed)
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

Never commit `.env.local` or expose a Supabase `service_role` key to the client.
Enable Row Level Security on every application table.

## Validation

```bash
npm run lint
npm run build
```
