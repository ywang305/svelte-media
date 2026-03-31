# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Development server with live reload (localhost:5000)
npm run build  # Production bundle
npm start      # Serve built app with sirv
```

No test runner is configured.

## Architecture

**Svelte GeoMedia** is a single-page app that shows geolocated tweets on an interactive Mapbox map. Users search for a place, the map centers on it, and tweets from that area are fetched and displayed as markers.

**Build:** Rollup bundles `src/main.js` → `public/build/bundle.js`. Svelte components are compiled at build time; CSS is extracted separately. No TypeScript.

### Data flow

1. `SearchBar.svelte` calls the Mapbox Geocoding API via helpers in `mapbox.js` to autocomplete place names and resolve coordinates.
2. When a place is selected, `Map.svelte` (the Mapbox GL instance) pans to those coordinates.
3. `MediaMarkersAround.svelte` watches the map center and calls `twitter_search.js`, which proxies to an **Azure Function** endpoint to fetch nearby tweets.
4. Each tweet is rendered as a `MediaMarker.svelte` popup on the map.
5. `Map.svelte` also writes the user's geolocation to **Firebase Firestore** for presence tracking.

### Key files

| File | Role |
|------|------|
| `src/store.js` | Svelte writable store for UI language state (English/Chinese) |
| `src/mapbox/MapBox.svelte` | Top-level map orchestrator; composes all controls |
| `src/mapbox/controls/Map.svelte` | Mapbox GL initialization, Firebase setup, language plugin |
| `src/mapbox/controls/mapbox.js` | Mapbox access token, geocoding fetch helpers |
| `src/mapbox/controls/media/twitter_search.js` | Calls Azure Function with `{lng, lat, radius}` → returns tweets |
| `src/i18n/Lang.svelte` | Language toggle; writes to the store |

### External services

- **Mapbox GL** — map rendering and geocoding; access token is hardcoded in `mapbox.js`
- **iNaturalist API** — free geo-search for nature observations (`api/twitter_search.js`). No API key required. Endpoint: `https://api.inaturalist.org/v1/observations`
- **Vercel Functions** — serverless backend in `api/`. `twitter_search.js` proxies iNaturalist; `twitter_img.js` proxies images for CORS fallback.
- **Firebase Firestore** — user location tracking; config is hardcoded in `Map.svelte`

### Internationalization

Language state is managed via the `store.js` writable. Components subscribe to it to switch between English and Chinese strings inline. `Lang.svelte` provides the toggle UI.
