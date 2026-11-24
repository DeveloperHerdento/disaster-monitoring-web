# Changelog

Notable changes per release, newest first. Versions follow `vMAJOR.MINOR.PATCH`.

## Unreleased

- chore: standardize repository (HGS-STD Wave A): README, base files, CI, Prettier, Node 24 pins
- chore: repository root is now the former `fire-monitoring-app/app/` folder; repo renamed to `fire-monitoring-web`
- feat: run as one Docker image (Express serves `/api/*` + built client); `docker-compose.yml`, `docs/DEPLOYMENT.md`
- chore: remove unused `client/src/data/indonesia_level.geojson` (5.7 MB)
- chore: rename `client/` → `frontend/`, `server/` → `backend/`, move `data/` → `backend/data/`; working notes → `docs/notes/` (git-ignored)
