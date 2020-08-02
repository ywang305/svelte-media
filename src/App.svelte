<script>
  import MapBox from './mapbox/MapBox.svelte';
  import { isZh } from './store';
  import Lang from './i18n/Lang.svelte';
  import IconMaker from './components/IconMaker.svelte';

  export let name;
  $: title_locale = $isZh ? '时闻快推' : name;
  $: sub_title_locale = $isZh
    ? '世界不同地方的人们正在说什么'
    : 'twitts happening around the world';
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
    margin-bottom: 4px;
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
  <nav class="nav w3-white w3-padding w3-card">
    <div id="logo-title">
      <div id="logo" class="w3-left">
        <IconMaker path="/icons/svg/3225/3225124.svg" />
      </div>
      <div class="w3-margin-left">
        <div class="w3-xlarge w3-text-indigo w3-left-align">
          {title_locale}!
        </div>
        <div class="w3-small w3-text-blue-grey w3-left-align">
          {sub_title_locale}
        </div>
      </div>

    </div>

    <div>
      <Lang />
    </div>

  </nav>

  <MapBox />

  <p>
    This app is built by
    <a href="https://svelte.dev/tutorial">Svelte</a>
  </p>
</main>
