# Hashed System Assignment

Venuze venue discovery app built with Next.js 15, TypeScript, and Tailwind CSS.

## Setup

Requires Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Demo login: `eve.holt@reqres.in` / `cityslicka`.

Before submitting, run `npm run typecheck` and `npm run build`.

## Technical decisions

The App Router separates public pages, protected pages, and route handlers. React Hook Form validates login input; Axios calls the local login endpoint, which forwards credentials to ReqRes. Poppins is bundled locally to keep typography consistent without a runtime font request.

## State management

TanStack Query manages the login mutation and dashboard request. Zustand stores client-side authentication state. The server sets an HttpOnly cookie, which middleware checks to protect `/dashboard`.

## Assumptions

The brief provides no venue or dashboard data API. Search listings and dashboard counts are illustrative, and the dashboard starts with empty saved venues. Demo authentication uses the supplied ReqRes credentials.

## Challenges

Keeping the local development stylesheet stable while building production required separating the workflows; production now uses Next.js’s standard `.next` output directory for Vercel compatibility. Search and dashboard data remain placeholders until a backend is provided.

## Project organization

- `src/app` — routes, global styles, and API handlers.
- `src/components` — reusable marketplace UI.
- `src/lib` — TanStack Query provider and Zustand store.
- `public` — logo and supplied image assets.
