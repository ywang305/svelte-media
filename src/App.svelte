<script>
  import Map from './mapbox/Map.svelte';
  import MapStyleButtons from './mapbox/MapStyleButtons.svelte';
  import CentralMarker from './mapbox/CentralMarker.svelte';
  import SearchBar from './mapbox/SearchBar.svelte';
  // import MapMarker from './mapbox/MapMarker.svelte';

  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    /* max-width: 240px; */
    margin: 0 auto;
  }

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<main>
  <h1>Hello {name}!</h1>
  <Map lat={40.7127837} lon={-74.0059413} zoom={13}>
    <MapStyleButtons />
    <CentralMarker />
    <SearchBar />
    <!-- <MapMarker lat={37.8225} lon={-122.0024} label="Svelte Body Shaping"/>
    <MapMarker lat={33.8981} lon={-118.4169} label="Svelte Barbershop & Essentials"/>
    <MapMarker lat={29.7230} lon={-95.4189} label="Svelte Waxing Studio"/>
    <MapMarker lat={28.3378} lon={-81.3966} label="Svelte 30 Nutritional Consultants"/>
    <MapMarker lat={40.6483} lon={-74.0237} label="Svelte Brands LLC"/>
    <MapMarker lat={40.6986} lon={-74.4100} label="Svelte Medical Systems"/> -->
  </Map>
  <p>
    This app is built by
    <a href="https://svelte.dev/tutorial">Svelte</a>
  </p>
</main>
