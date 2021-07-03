<script>
  import { onMount, setContext } from 'svelte';
  import { mapboxgl, key } from './mapbox.js';
  import MapboxLanguage from '@mapbox/mapbox-gl-language';
  import { isZh } from '../../store';
  import firebase from 'firebase';

  export let lat;
  export let lng;
  export let zoom;

  /** firebase */
const firebaseConfig = {
    apiKey: "AIzaSyB1hf3tadRPz0X1HvOIppfMhL-ynKaQ1fw",
    authDomain: "sveltegeoloc.firebaseapp.com",
    projectId: "sveltegeoloc",
    storageBucket: "sveltegeoloc.appspot.com",
    messagingSenderId: "1064344806975",
    appId: "1:1064344806975:web:c5a43315707dc3e11eba8a",
    measurementId: "G-7JSTDPGQFE",  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



  setContext(key, {
    getMap: () => map,
  });

  let container;
  let map;
  let mbLang;
  let geolocate;

  $: if (map && map.loaded()) {
    const style = map.getStyle();
    map.setStyle(mbLang.setLanguage(style, $isZh ? 'zh' : 'en'));
  }

  function createMap(defaultLanguage = 'en') {
    mbLang = new MapboxLanguage({ defaultLanguage });

    geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });
    geolocate.on('geolocate', function(data) {
      const {coords, timestamp} = data;
      const latitude = coords.latitude;
      const longitude = coords.longitude;
      const time = new Date(timestamp).toLocaleString();
      db.collection("users").doc(`${latitude},${longitude}`).set({
          latitude, longitude, timestamp, time
      })

    });

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
        geolocate,
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
    height: calc(100vh - 88px);
  }
  @media (max-width: 460px) {
    div {
      height: calc(100vh - 138px);
    }
  }
</style>

<div bind:this={container} id="map-container">
  {#if map}
    <slot />
  {/if}
</div>
