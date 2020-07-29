<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from '../mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();

  map.on('moveend', () => {
    const { lng, lat } = map.getCenter();
    fetch(
      `https://api.twitter.com/1.1/search/tweets.json?geocode=${lat},${lng},5mi&result_type=mixed&count=100`
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  });
</script>
