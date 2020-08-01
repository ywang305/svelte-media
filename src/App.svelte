<script>
  import MapBox from './mapbox/MapBox.svelte';
  import { isZh } from './store';
  import Lang from './i18n/Lang.svelte';
  import IconMaker from './components/IconMaker.svelte';

  export let name;
  $: name_locale = $isZh ? '时闻快推' : name;
</script>

<style>
  :global(body) {
    /* this will apply to <body> */
    padding: 0;
  }
  main {
    text-align: center;
  }
  .nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  #logo {
    height: 42px;
    width: 42px;
  }
  #logo-title {
    display: flex;
    align-items: center;
    padding-right: 1em;
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
  <div class="w3-white w3-padding nav w3-card w3-margin-bottom">
    <div id="logo-title">
      <div id="logo" class="w3-left">
        <IconMaker path="/icons/svg/3225/3225124.svg" />
      </div>
      <div class="w3-xlarge w3-margin-left w3-text-indigo">{name_locale}!</div>
    </div>

    <div>
      <Lang />
    </div>

  </div>

  <MapBox />
  <p>
    This app is built by
    <a href="https://svelte.dev/tutorial">Svelte</a>
  </p>
</main>
