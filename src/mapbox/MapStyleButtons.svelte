<script>
  import { getContext } from 'svelte';
  import { key } from './mapbox.js';

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
      name: 'Mapbox Navigation Preview Day',
      label: 'traffic',
      link: 'mapbox://styles/mapbox/navigation-preview-day-v4',
    },
  ];

  const { getMap } = getContext(key);
  const map = getMap();

  function changeMap(name, link) {
    if (map.getStyle().name != name) {
      map.setStyle(link, { diff: false });
    }
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
  {#each sytleObjs as { name, label, link }}
    <button on:click={() => changeMap(name, link)}>{label}</button>
  {/each}

</div>
