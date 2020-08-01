<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from '../mapbox.js';
  import MediaMarker from './MediaMarker.svelte';
  import twitter_search from './twitter_search';

  const { getMap } = getContext(key);
  const map = getMap();

  let medias = [];

  let lastCenter;
  async function twitterSearch() {
    const { lng, lat } = map.getCenter();
    lastCenter = { lng, lat };
    const bounds = map.getBounds();
    medias = await twitter_search({ lng, lat, bounds });
  }

  map.on('moveend', async () => {
    const bounds = map.getBounds();
    if (!lastCenter || !bounds.contains(lastCenter)) {
      await twitterSearch();
    }
  });
  map.on('zoomend', twitterSearch);
  map.on('resize', twitterSearch);

  /*
  function getRnd(min, max, id_str) {
    if (!id_str) {
      return Math.random() * (max - min) + min;
    }
    const id_ran = Number(id_str.slice(-7)) / 10000000;
    return id_ran * (max - min) + min;
  }

  function distance(coord1, coord2) {
    return (
      new mapboxgl.LngLat(coord1.lng, coord1.lat).distanceTo(
        new mapboxgl.LngLat(coord2.lng, coord2.lat)
      ) / 1000
    ); // kilo-meters
  }
  function getTwiPlaceCenter(twiObj) {
    if (twiObj.place && twiObj.place.bounding_box) {
      const coords = twiObj.place.bounding_box.coordinates[0];
      const [lng1, lat1] = coords[0];
      const [lng2, lat2] = coords[2];
      const placeCenter = {
        lng: (lng1 + lng2) / 2,
        lat: (lat1 + lat2) / 2,
      };
      return placeCenter;
    }
  }
  let lastCenter;
  map.on('moveend', async () => {
    const { lng, lat } = map.getCenter();
    const bounds = map.getBounds();

    if (!lastCenter || !bounds.contains(lastCenter)) {
      lastCenter = { lng, lat };
      const ne = bounds._ne;
      const sw = bounds._sw;
      const search_radius = distance(ne, sw) / 4;

      const resp = await fetch(
        `https://nyc-function.azurewebsites.net/api/twitter_search?lng=${lng}&lat=${lat}&radius=${search_radius}`
      );
      const tweets = await resp.json();
      if (tweets) {
        medias = tweets
          .filter((obj) => {
            if (obj.place && obj.place.bounding_box) {
              const placeCenter = getTwiPlaceCenter(obj);
              return bounds.contains(placeCenter);
            }
            return true;
          })
          .map((obj) => {
            const lng = getRnd(
              sw.lng,
              ne.lng,
              obj.place && obj.place.bounding_box ? obj.id_str : null
            );
            const lat = getRnd(
              sw.lat,
              ne.lat,
              obj.place && obj.place.bounding_box ? obj.id_str : null
            );
            return { ...obj, lng, lat };
          });
      }
    }
  });

  */
</script>

{#each medias
  .sort((a, b) => {
    const agentA = a.media ? Object.keys(a.media).length : 0;
    const agentB = b.media ? Object.keys(b.media).length : 0;
    return agentB - agentA;
  })
  .slice(0, 30) as media (media.id)}
  <MediaMarker lng={media.lng} lat={media.lat} {media} />
{/each}
