<script>
  import { getContext } from 'svelte';
  import { key } from './mapbox.js';
  import { object_without_properties } from 'svelte/internal';

  const sytleObjs = [
    {
      name: 'Mapbox Streets',
      label: 'street',
      link: 'mapbox://styles/mapbox/streets-v11',
    },
    {
      name: 'Mapbox Satellite Streets',
      label: 'satellite',
      link: 'mapbox://styles/mapbox/satellite-streets-v11',
    },
    {
      name: 'Mapbox Light',
      label: 'light',
      link: 'mapbox://styles/mapbox/light-v10',
    },
    {
      name: 'Mapbox Dark',
      label: 'dark',
      link: 'mapbox://styles/mapbox/dark-v10',
    },
    {
      name: 'Mapbox Navigation Preview Day',
      label: 'traffic',
      link: 'mapbox://styles/mapbox/navigation-preview-day-v4',
    },
  ];

  let styleName = sytleObjs[0].name;
  $: styles = sytleObjs.filter((obj) => obj.name !== styleName);

  const { getMap } = getContext(key);
  const map = getMap();

  function changeMap(name, link) {
    map.setStyle(link, { diff: false });
    styleName = name;
  }
</script>

<style>
  div {
    display: flex;
    position: absolute;
    left: 16px;
    bottom: 16px;
  }
</style>

<div>
  {#each styles as { name, label, link }}
    <button
      on:click={() => changeMap(name, link)}
      class="w3-button w3-white w3-border w3-padding-small">
      {label}
    </button>
  {/each}

</div>
