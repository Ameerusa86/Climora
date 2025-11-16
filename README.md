# Climora

Hyper‑vivid weather intelligence with cinematic gradients, a responsive Leaflet map, and clear insights powered by OpenWeather and MapTiler.

## Overview

Climora is a React + TypeScript + Vite application that provides:

- A beautiful base map (MapTiler) with optional OpenWeather overlays
- Quick city selection via dropdown (geocoding to coordinates)
- Interactive map clicks to set a custom location
- Rich weather cards: current conditions, hourly, daily, and additional info
- Air quality panel powered by OpenWeather Air Pollution API

## Tech Stack

- React 19 + TypeScript + Vite
- Leaflet + React‑Leaflet for maps
- MapTiler SDK for base map tiles
- OpenWeather One Call 3.0, Geocoding, and Air Pollution APIs
- TanStack Query for data fetching/caching
- Tailwind CSS for styling

## Environment Variables

Create a `.env.local` file in the project root with your keys:

```dotenv
VITE_API_KEY=your_openweather_api_key
VITE_MAPTILER_API_KEY=your_maptiler_api_key
```

These are used in the client at build/runtime via `import.meta.env`.

## Getting Started

Install and run the dev server:

```pwsh
npm install
npm run dev
```

Build and preview production output:

```pwsh
npm run build
npm run preview
```

## Deployment (Vercel)

1. In Vercel Project Settings → Environment Variables, add:
   - `VITE_API_KEY`
   - `VITE_MAPTILER_API_KEY`
2. Set Build Command to `npm run build` (or `vite build`).
3. Deploy from the `main` branch.

## Features & Usage

- City dropdown: choose a city to fetch coordinates (geocoding) and update all cards and the map.
- Map click: click anywhere to set a custom location; data refreshes for that point.
- Overlays: an OpenWeather raster overlay is added above the base tiles. The default is `precipitation`.

To change the overlay layer, edit `src/components/Map.tsx` and swap `precipitation` with another OpenWeather layer (e.g. `clouds`, `temp`, `wind`, `pressure`).

## Project Structure

```text
src/
  api.ts                # OpenWeather fetch helpers (One Call, Geocoding, Air)
  App.tsx               # App shell and layout
  components/
    Map.tsx             # React‑Leaflet map + MapTiler base + OWM overlay
    cards/              # Current, Hourly, Daily, AdditionalInfo cards
    ui/                 # UI primitives (select, tooltip, etc.)
  lib/utils.ts          # Utility helpers
  schemas/              # zod schemas for API validation
```

## Troubleshooting

- No data on Vercel: ensure all OpenWeather endpoints use `https://` (they do in `src/api.ts`). Mixed content is blocked on HTTPS.
- Missing marker icon in production: Leaflet markers are explicitly imported in `Map.tsx` and configured via `L.Icon.Default.mergeOptions`.
- Dropdown updates not reflected: All cards and the map should consume unified `coords` derived from geocoding or custom clicks (handled in `App.tsx`).

## Attribution

- Map tiles by [MapTiler](https://www.maptiler.com/)
- Weather data by [OpenWeather](https://openweathermap.org/)

---

Made with React, TypeScript, and a fondness for clean weather visuals.
