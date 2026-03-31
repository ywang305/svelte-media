// Vercel serverless function — geo search via iNaturalist API (completely free, no key required).
// Replaces the former Azure Function twitter_search endpoint.
// Docs: https://api.inaturalist.org/v1/docs/

export default async function handler(req, res) {
  const { lng, lat, radius, lang } = req.query;

  if (!lng || !lat) {
    return res.status(400).json({ error: 'lng and lat are required' });
  }

  // iNaturalist radius is in km, max ~200km — cap it sensibly
  const clampedRadius = Math.min(parseFloat(radius) || 5, 50).toFixed(2);

  const url = new URL('https://api.inaturalist.org/v1/observations');
  url.searchParams.set('lat', parseFloat(lat).toFixed(6));
  url.searchParams.set('lng', parseFloat(lng).toFixed(6));
  url.searchParams.set('radius', clampedRadius);
  url.searchParams.set('per_page', '100');
  url.searchParams.set('order_by', 'created_at');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('photos', 'true');       // only observations with photos
  url.searchParams.set('geoprivacy', 'open');   // only public-coordinate observations
  if (lang) url.searchParams.set('locale', lang); // localises taxon common names

  const inatResp = await fetch(url.toString(), {
    headers: { 'User-Agent': 'svelte-media-app' },
  });

  if (!inatResp.ok) {
    const err = await inatResp.text();
    return res.status(inatResp.status).json({ error: err });
  }

  const data = await inatResp.json();

  // Transform iNaturalist observations → shape the frontend already consumes
  const posts = (data.results ?? [])
    .filter((obs) => obs.location) // must have coordinates
    .map((obs) => {
      const [obsLat, obsLng] = obs.location.split(',').map(Number);

      const photo = obs.photos?.[0];
      const media = photo
        ? { type: 'photo', media_url: photo.url.replace('/square.', '/medium.') }
        : null;

      const commonName =
        obs.taxon?.preferred_common_name ||
        obs.taxon?.name ||
        'Unknown species';

      return {
        id: obs.id,
        id_str: String(obs.id),
        text: commonName + (obs.description ? `\n${obs.description}` : ''),
        created_at: obs.created_at,
        user_name: obs.user?.name || obs.user?.login || '',
        screen_name: obs.user?.login || '',
        place: obs.place_guess ? { name: obs.place_guess } : null,
        media,
        // Exact coordinates — client skips random positioning when these are set
        lng: obsLng,
        lat: obsLat,
      };
    });

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.json(posts);
}
