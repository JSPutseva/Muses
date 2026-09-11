# Muses

A card-based, multilingual (EN/FR/RU) showcase page — working title "Muses". Currently a **frontend-only draft**, meant to eventually live on a subdomain of an existing personal website (infra already exists there — see "Deployment target" below).

## Status

- Frontend only. No backend, no API, no database, no auth — none of that exists in this repo yet.
- All content is hardcoded at build time in [src/data/museumEntries.ts](src/data/museumEntries.ts). The "Add a muse" modal on the page only pushes into that array in-memory via client-side JS — nothing persists across a page reload.
- Single route: `src/pages/index.astro`. No other pages exist.

## Current stack

| Layer | Tech |
|---|---|
| Framework | Astro 7 (static output — confirmed via `astro build` logging `output: "static"`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, via `@tailwindcss/vite` (see [astro.config.mjs](astro.config.mjs), [src/styles/global.css](src/styles/global.css)) |
| Interactivity | Vanilla TS in per-component `<script type="module">` tags — no React/Vue/Svelte, no state library |

Tailwind was a deliberate swap-in "for now" during drafting. The original plan (below) called for SCSS — nothing currently in the repo uses SCSS or `sass`.

## Planned stack (not yet implemented)

This is the target architecture once the draft is ready to become the real thing. None of it exists in this repo yet — treat it as direction, not as present state.

| Layer | Tech |
|---|---|
| Frontend | Astro (SSG), TypeScript *(styling approach TBD — SCSS was the original plan, Tailwind is what the draft currently uses)* |
| Backend | Laravel 11, PHP 8.2, SQLite |
| Auth | Laravel Sanctum (token-based) |
| Mail | Brevo SMTP |
| Infra | Docker, Coolify, Pangolin, Traefik, IONOS VPS |

## Project structure

```
src/
├── components/
│   ├── BackgroundPattern.astro   tiled diagonal "la la" placeholder text, faintest background layer
│   ├── BackgroundPhotos.astro    nimphe1.png / nimphe2.png, 25% opacity + grayscale, smaller on phones
│   ├── BackgroundText.astro      loose floating phrases (incl. "Muses" title), no card background
│   └── CardStack.astro           the interactive card: prev/next entry switch, scroll-driven EN→FR→RU
│                                  language switch, "Add a muse" modal with per-language inputs
├── data/
│   └── museumEntries.ts          hardcoded entries + language order — the only "content" in the app
├── layouts/
│   └── Layout.astro              <html>/<head> shell, imports global.css, Google Fonts (Playfair Display)
├── pages/
│   └── index.astro               composes the layers above; the only route
└── styles/
    └── global.css                `@import "tailwindcss"` + a small `@theme` (serif font, bg gradient colors)

public/
├── favicon.png       580×858, non-square — browsers will crop/scale it in the tab; consider a proper square icon
├── nimphe1.png        ~1.3MB, uncompressed
└── nimphe2.png        ~1.1MB, uncompressed
```

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Serve the built `./dist/` locally |
| `npx astro dev --background` | Start the dev server in the background (per [AGENTS.md](AGENTS.md) / `CLAUDE.md`) |
| `npx astro dev stop` / `status` / `logs` | Manage that background dev server |
| `npm run dev` | Start the dev server in the foreground instead |

Node `>=22.12.0` is required (see `engines` in [package.json](package.json)). No environment variables are used yet — there's no `.env` in this repo (the `.gitignore` already accounts for `.env`/`.env.production` for when the Laravel backend arrives).

## Deployment target

Intended to be placed on a subdomain of an existing site that already has its own structure and infra:

- **Docker** container(s), managed via **Coolify**
- **Pangolin** + **Traefik** in front for routing/TLS
- Hosted on an **IONOS VPS**

Nothing in this repo currently supports that:

- **No `Dockerfile`** exists yet. Since Astro's output here is static (`dist/`), the simplest path is a multi-stage build (Node to `npm run build`, then serve `dist/` from a lightweight static server / nginx) — but match whatever convention the other apps on that Coolify instance already use rather than inventing a new one.
- **No CI/CD config** exists yet.
- The actual subdomain, Traefik labels/routing rules, and Coolify app conventions live on the target server / in the user's other repos, not here — get those from the user or from a sibling app's config before wiring this up.

## Known gaps for whoever picks this up

- **Git**: this folder is not its own git repository. Running `git status` inside it resolves to the *parent* `~/Projects` directory, which is tracked against an unrelated remote (`B-YEP-200-STG-2-1-jobaggregator-3`, a school project). This needs its own `git init` (or to be placed correctly inside the target repo) before any deploy pipeline is wired up.
- **Persistence**: the "Add a muse" modal is a fully client-side demo — it mutates an in-memory JS array, not a database. Wiring it to a real backend (per the planned Laravel stack above) is unstarted.
- **Images**: `nimphe1.png`/`nimphe2.png` are large and uncompressed; `favicon.png` isn't square. Worth optimizing before shipping.
- **i18n**: language switching (EN → FR → RU) is a client-side, scroll-position-driven display toggle on one page/route — not real localized routing (no `/en`, `/fr`, `/ru` URLs, no `astro:i18n`).
