<script>
  import { getContext } from 'svelte';
  import { key } from './mapbox.js';

  const sytleObjs = [
    {
      name: 'Mapbox Streets',
      label: 'street',
      link: 'mapbox://styles/mapbox/streets-v10',
      label_locale: '地图',
    },
    {
      name: 'Mapbox Satellite Streets',
      label: 'satellite',
      link: 'mapbox://styles/mapbox/satellite-streets-v11',
      label_locale: '卫星',
    },
    {
      name: 'Mapbox Light',
      label: 'light',
      link: 'mapbox://styles/mapbox/light-v10',
      label_locale: '白天',
    },
    {
      name: 'Mapbox Dark',
      label: 'dark',
      link: 'mapbox://styles/mapbox/dark-v10',
      label_locale: '夜晚',
    },
    {
      name: 'Mapbox Navigation Preview Day',
      label: 'traffic',
      link: 'mapbox://styles/mapbox/navigation-preview-day-v4',
      label_locale: '交通',
    },
  ];

  let styleName = sytleObjs[0].name;
  $: styles = sytleObjs.filter((obj) => obj.name !== styleName);

  const { getMap } = getContext(key);
  const map = getMap();

  function changeMap(name, link) {
    map.setStyle(link);
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
  {#each styles as { name, label_locale, label, link }}
    <button
      on:click={() => changeMap(name, link)}
      class="w3-button w3-white w3-border w3-padding-small">
      {label}
    </button>
  {/each}

</div>
