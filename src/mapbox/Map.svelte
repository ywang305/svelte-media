<script>
  import { onMount, setContext } from 'svelte';
  import { mapboxgl, key } from './mapbox.js';

  setContext(key, {
    getMap: () => map,
  });

  export let lat;
  export let lon;
  export let zoom;

  let container;
  let map;

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css';

    link.onload = () => {
      map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom,
        pitch: 0,
        attributionControl: false,
        logoPosition: 'bottom-right',
      });
      // console.log('map instance: ', map);
      map
        .addControl(
          new mapboxgl.NavigationControl({
            showZoom: false,
            visualizePitch: true,
          }),
          'bottom-right'
        )
        .addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          'bottom-right'
        );
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<style>
  div {
    width: 100%;
    min-height: calc(100vh - 100px);
  }
</style>

<div bind:this={container} id="mapbox-container">
  {#if map}
    <slot />
  {/if}
</div>
