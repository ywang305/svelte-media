<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from './mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();

  const marker = new mapboxgl.Marker({ scale: 1.5 })
    .setLngLat(map.getCenter())
    .addTo(map);

  async function setCentralMark() {
    const { lon, lat } = map.getCenter();
    marker.setLngLat(map.getCenter());
  }

  map.on('move', setCentralMark);
</script>
