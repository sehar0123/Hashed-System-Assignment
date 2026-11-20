# Hashed System Assignment — Venuze venue discovery

A responsive venue marketplace built with Next.js App Router, TypeScript, Tailwind CSS, TanStack Query, Zustand, React Hook Form, and Axios. The implementation follows the provided Hashed System assignment brief and the screenshots included in the ZIP.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build use `npm run build`, then `npm start`.

## Demo sign-in

- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

The login form calls the Reqres API from the brief. On success, the login API route writes the token to an HttpOnly same-site cookie for middleware route protection and returns the token to Zustand for active client state. The API is external, so a network connection is needed to sign in.

## Routes

- `/` — public landing page, venue and vendor categories, featured listings, testimonials, destinations, and contact form.
- `/search` — search results with category navigation, interactive filters, listing cards, and map-style panel.
- `/login` — email/password validation, mutation loading state, and API errors.
- `/dashboard` — protected signed-in area with saved spaces, bookings, messages, and an empty state. Logging out clears the cookie.

## Project structure

- `src/app` — App Router pages, global styles, and metadata.
- `src/components/Marketplace.tsx` — landing page composition and reusable marketplace pieces.
- `src/lib/providers.tsx` — shared TanStack Query client.
- `src/lib/store.ts` — Zustand authentication state.
- `src/middleware.ts` — redirects visitors without an auth cookie from `/dashboard` to `/login`.
- `public` — optimized supplied logo, hero image, and no-results illustration.

## State and data choices

TanStack Query owns the login mutation and is configured with a shared query client for future cached search requests. Zustand holds the active client auth state. React Hook Form validates required email, email format, and password length before submitting through Axios. Middleware checks a cookie because middleware cannot read browser-only Zustand state.

The assignment ZIP contains visual references for the landing page, search results, and no-results screen. It does not provide dashboard designs or a venue data API. Search results and the map are therefore illustrative, and the dashboard is a useful empty-state shell. The contact form shows a local confirmation. Venue photography uses Unsplash URLs; use licensed production assets before public launch.

## Before submission

1. Run `npm install` and `npm run build` locally.
2. Verify the Reqres credentials and API response in your network environment.
3. Push this folder to a GitHub repository.
4. Import that repository into Vercel and deploy with the default Next.js settings.
5. Add the live URL and repository URL to your submission.

No API secrets are required for the client-facing Reqres demo request. Do not commit private credentials or `.env.local`.

### Authentication endpoints

`POST /api/auth/login` validates input, forwards credentials to Reqres, and sets an HttpOnly cookie. `POST /api/auth/logout` clears the cookie. Keeping cookie writes on the server lets middleware protect the dashboard without exposing cookie mutation to client scripts.

## Figma typography

The supplied Figma file uses Poppins throughout. The desktop hero heading uses Poppins SemiBold at 70 px with an 80 px line height and −3% letter spacing. The font weights are bundled locally with `@fontsource/poppins` so the app does not depend on a runtime Google Fonts request.

### Typography values inspected in Figma

| Element | Desktop | Tablet / smaller layout | Mobile | Weight |
| --- | --- | --- | --- | --- |
| Hero heading | 70 / 80 px, −3% tracking | Fluid down to 30 px | 30 / 40 px, −3% tracking | 600 SemiBold |
| Main section heading | 44 / 50 px | 30 / 34 px | 24 / 30 px | 600 SemiBold |
| Section description | 20 / 30 px | 14 / 20 px | 14 / 20 px | 400 Regular |
| Category card heading | 20 / 24 px, −3% tracking | 20 / 24 px | 16 / 20 px | 600 SemiBold |
| Listing title | 16 / 24 px | 16 / 24 px | 14 / 20 px | 600 SemiBold |
| Search field label | 14 / 21 px | 14 / 21 px | 14 / 21 px | 400 Regular |
| Search field value | 16 / 24 px | 16 / 24 px | 16 / 24 px | 500 Medium |

Sizes are pixels and use `font-size / line-height`. Views not present in Figma, including login and dashboard, use the same Poppins family and a matching hierarchy as application-flow screens requested in the brief.
