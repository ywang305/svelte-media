<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from './mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();

  const marker = new mapboxgl.Marker({ scale: 1.5 })
    .setLngLat(map.getCenter())
    .addTo(map);

  map.on('move', () => marker.setLngLat(map.getCenter()));
</script>
