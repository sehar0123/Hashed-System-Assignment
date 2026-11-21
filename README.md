# Hashed System Assignment

Venuze venue discovery app built with Next.js 15, TypeScript, and Tailwind CSS.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Demo login: `eve.holt@reqres.in` / `cityslicka`.

## Pages

- `/` — marketplace
- `/search` — venue search and filters
- `/login` — sign in
- `/dashboard` — protected account page

TanStack Query handles requests, Zustand holds client auth state, and an HttpOnly cookie protects the dashboard. The brief has no venue/dashboard API, so those records are illustrative. Run `npm run typecheck` and `npm run build` before submitting.
