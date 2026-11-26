# fire-monitoring-web

> RATRA Fire: draw an area of interest (AOI) and see live NASA FIRMS hotspots, nearby-impact metrics and analytics for it.

**Owner:** @DeveloperHerdento <!-- TODO(owner): replace with the owning team --> · **Status:** in development (demo, deployed on Vercel)

## Overview

The hotspot (fire) web app of **RATRA**, the umbrella product for fire, agriculture and disaster monitoring in Indonesia
(`ratra-homepage-web` links to it). A user draws an AOI, the app fetches live hotspots from NASA FIRMS and derives
dashboard, map-module and analytics numbers from that one dataset. The UI follows the RATRA agriculture product
(top nav, Layer/History side panel, Leaflet + Esri imagery, white/red RATRA theme).

## Tech stack

Node 24 · `frontend/`: Vite 8 + React 19 + TypeScript + Tailwind v4, Leaflet + `leaflet-draw`, `@turf/turf` ·
`backend/`: Express 5 (plain JS) proxy for the FIRMS API · Hosting: Vercel (`vercel.json`).

## Getting started

Requirements: Node 24 (see `frontend/.nvmrc`, `backend/.nvmrc`) and a free FIRMS `MAP_KEY`.

```bash
git clone https://github.com/DeveloperHerdento/fire-monitoring-web.git && cd fire-monitoring-web
cp backend/.env.example backend/.env          # set FIRMS_MAP_KEY
(cd backend && npm ci && npm run dev)         # terminal 1: API on http://localhost:8787
cd frontend && npm ci && npm run dev          # terminal 2: app on http://localhost:5173 (proxies /api -> :8787)
```

## Configuration

Every setting is listed with a comment in [`backend/.env.example`](backend/.env.example) (`FIRMS_MAP_KEY`, `PORT`) and
[`frontend/.env.example`](frontend/.env.example) (`VITE_WINDY_MAP_FORECAST_KEY`, optional). Real values go in `.env` files,
which git ignores. On Vercel, set them in the project settings.

## Common tasks

| Task | Command |
|---|---|
| Run locally | `npm run dev` in `backend/` and in `frontend/` |
| Lint | `cd frontend && npm run lint` (oxlint) · `cd backend && npm run lint` (syntax check) |
| Format | `cd frontend && npm run format` (check: `npm run format:check`) |
| Typecheck | `cd frontend && npm run typecheck` |
| Test | none yet (TODO) |
| Build | `cd frontend && npm run build` |

CI (`.github/workflows/ci.yml`) runs these on every pull request and on pushes to `develop`/`main`.

## Project structure

```
frontend/          Vite + React app
  src/pages/       Dashboard, FieldManagement (AOI drawing + 5 map modules), Analytics, Pricing
  src/components/  map, timeline, chart and panel components
  src/lib/         API client, geo helpers (turf), storage, theme, Windy API
  src/state/       AoiContext: active AOI + annotated hotspots
  src/data/        demo AOIs + Kalimantan demo seed (bundled)
  public/          static assets (the "Indonesia" demo AOI fetches live FIRMS data)
backend/index.js   Express proxy: keeps FIRMS_MAP_KEY server-side, normalizes VIIRS/MODIS CSV to JSON, 5-min cache
backend/data/      raw FIRMS exports used to build demo seeds (git-ignored, see backend/data/README.md)
docs/              DEPLOYMENT.md, ADRs in docs/adr/ (personal/working notes go in docs/notes/, git-ignored)
vercel.json        Vercel build + routing (/api/* -> backend, rest -> frontend)
```

## How it works

1. **Field Management → Draw AOI.** Polygon/rectangle tool (leaflet-draw). Saving names the AOI, stores it
   (localStorage for now) and makes it active.
2. **Fetch.** The client computes the AOI's bounding box (padded ~15 km for nearby-impact context) and asks the server
   for hotspots (`VIIRS_SNPP_NRT` + `MODIS_NRT` by default, 1–10 day range, selectable satellite sources).
3. **Analyze.** Every hotspot is annotated client-side (turf) with `inAoi` and `distanceToBoundaryKm`. Dashboard, the
   five Field Management modules and Analytics all derive from this one annotated set.

Server endpoints: `/api/health`, `/api/firms/status` (FIRMS quota), `/api/fires`, `/api/weather`, `/api/weather-grid`,
`/api/wind-grid`.

### Module status

| Module | Data | Status |
|---|---|---|
| Active Fire Hotspot Detection | NASA FIRMS (VIIRS/MODIS) | **Live** |
| Fire Timeline & Landscape Change | FIRMS, stepped by `acq_date` within the fetched window | **Live** (detection-date scrubbing, no before/after imagery yet) |
| Fire Nearby Impact | FIRMS + turf distance-to-boundary, 1/3/5 km rings | **Live** |
| Burned Area | Sentinel-2 dNBR | Not connected: needs an imagery provider key (e.g. Sentinel Hub) |
| Smoke Detection | Aerosol/wind | Not connected: needs an aerosol + meteorological data source |

The two unconnected modules render their real UI (legend, description) with an empty state, so adding a provider later
is a data-layer change, not a UI rebuild.

### Known limits

- AOIs are stored in `localStorage` only (no backend DB/auth): fine for a single-user demo, not for multi-user production.
- The FIRMS Area API caps requests at 10-day windows and has a transaction quota (see `/api/firms/status`).

## Deployment

Vercel, configured by [`vercel.json`](vercel.json): `backend/index.js` runs as a Node function for `/api/*`,
`frontend/` is built with `npm run vercel-build` and served statically. Set `FIRMS_MAP_KEY` (and optionally
`VITE_WINDY_MAP_FORECAST_KEY`) in the Vercel project settings.

### Run with Docker

One image: Express serves `/api/*` and the built client on port 8787. Details in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

```bash
cp .env.example .env                       # set FIRMS_MAP_KEY
docker build -t fire-monitoring-web:local .
docker compose up -d                       # http://127.0.0.1:8787, health: /api/health
```

## Contributing

Branch from `develop` (`feat/…`, `fix/…`), keep pull requests small, and fill in the PR template.
Commit messages follow `type(scope): description`. Record significant technical decisions in `docs/adr/`.
