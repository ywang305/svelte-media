<script>
  import { onMount, setContext } from 'svelte';
  import { mapboxgl, key } from './mapbox.js';
  import MapboxLanguage from '@mapbox/mapbox-gl-language';
  import { isZh } from '../../store';

  export let lat;
  export let lng;
  export let zoom;

  setContext(key, {
    getMap: () => map,
  });

  let container;
  let map;
  let mbLang;

  $: if (map && map.loaded()) {
    const style = map.getStyle();
    map.setStyle(mbLang.setLanguage(style, $isZh ? 'zh' : 'en'));
  }

  function createMap(defaultLanguage = 'en') {
    mbLang = new MapboxLanguage({ defaultLanguage });

    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom,
      pitch: 0,
      attributionControl: false,
      logoPosition: 'bottom-right',
    })
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
      )
      .addControl(mbLang);
  }

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css';

    link.onload = () => {
      createMap($isZh ? 'zh' : 'en');
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
