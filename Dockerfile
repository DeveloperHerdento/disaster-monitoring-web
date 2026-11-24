# One image: Express serves /api/* and the built frontend (SPA) on port 8787.
# Build from the repo root: docker build -t fire-monitoring-web .

# Stage 1: build the frontend. VITE_* values are compiled into the public JS bundle (browser keys only, never secrets).
FROM node:24-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_WINDY_MAP_FORECAST_KEY=
RUN npm run build

# Stage 2: backend production dependencies only
FROM node:24-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Stage 3: runtime, as the non-root `node` user. FIRMS_MAP_KEY comes from env_file at run time.
FROM node:24-alpine
ENV NODE_ENV=production NPM_CONFIG_UPDATE_NOTIFIER=false PORT=8787 STATIC_DIR=/app/frontend/dist
WORKDIR /app/backend
COPY --from=backend /app/backend/node_modules ./node_modules
COPY backend/package.json backend/index.js ./
COPY --from=frontend /app/frontend/dist /app/frontend/dist
USER node
EXPOSE 8787
CMD ["node", "index.js"]
