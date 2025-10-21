# Technical Test (3–4h) — Next.js + GraphQL (Rick & Morty)

**Goal:** Evaluate how you work with Next.js (App Router), GraphQL, state, and UX basics.

**API:** `https://rickandmortyapi.com/graphql` (no auth required)

## What to build

1. **Characters list** with:
   - Search by name
   - Filter by `status` (Alive | Dead | unknown)
   - Pagination (page buttons or infinite scroll)

2. **Character detail** page:
   - Basic info (name, status, species, image)
   - Episodes where the character appears

3. **Rendering**
   - Server-render the initial list page (SSR or ISR).
   - Client navigation should feel smooth.

4. **UX**
   - Clear loading + error states (skeletons or spinners + friendly messages)
   - Basic accessibility (labels, focus, keyboard nav)

## Nice-to-have (optional, only if time remains)

- **Favourites** with optimistic updates (persist to `localStorage` or a small store like Zustand)
- A **server Route Handler** `/api/graphql-proxy` that forwards GraphQL requests (good for future headers/CORS)
- 1 small test (Vitest + React Testing Library)

## Deliverables

- GitHub repo link with clear commits
- **README** explaining setup, decisions, and what you’d do with 1–2 extra days
- (Optional) 1–2 min Loom or a short GIF demo

## Evaluation (0–5)

- Code clarity & architecture (components, naming, typing)
- GraphQL usage (queries, cache, pagination/filters, SSR)
- UX & a11y (loading, errors, navigation)
- Communication (README, trade-offs)
- Time management (core first; extras only if done)

## Timebox

Target: **3–4 hours** max. Perfection is not required—clarity and reasoning are.

---

## Getting Started

- Node 18+
- Install deps: `pnpm i` (or `npm i` / `yarn`)
- Run dev: `pnpm dev`
- Lint: `pnpm lint`

You’ll find minimal scaffolding. Please **implement the GraphQL fetching yourself**:

- Define queries/mutations
- Wire Apollo Client on both server & client where needed
- Implement pagination / search / filter

### Tips

- Keep components small and reusable.
- Prefer typed GraphQL (codegen optional if you’re fast).
- Document trade-offs in the README.

---

## Tasks Checklist

- [ ] **Apollo Client setup** - Configure for both server and client usage (`lib/apollo-client.ts`)
- [ ] **Characters list** - Implement search, status filter, and pagination
- [ ] **Character detail page** - Fetch and display character info + episodes
- [ ] **Loading/error states** - Add proper UX with skeletons and error handling
- [ ] **Accessibility** - Ensure keyboard navigation and screen reader support
- [ ] **SSR consideration** - Decide on server-side rendering approach
- [ ] **README notes** - Document decisions and trade-offs

## Current State

- ✅ Basic Next.js setup with TypeScript and Tailwind
- ✅ UI components (Button, Input, Select, Skeleton)
- ✅ Basic routing structure
- ❌ GraphQL queries and Apollo Client configuration
- ❌ Character list implementation
- ❌ Character detail implementation
- ❌ Loading and error states
