<script>
  import MapBox from './mapbox/MapBox.svelte';
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
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
</svelte:head>

<main>
  <h1>Hello {name}!</h1>
  <MapBox />
  <p>
    This app is built by
    <a href="https://svelte.dev/tutorial">Svelte</a>
  </p>
</main>
