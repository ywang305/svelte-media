<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from '../mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();

  export let lng;
  export let lat;
  let iconEl;
  onMount(() => {
    new mapboxgl.Marker(iconEl).setLngLat({ lng, lat }).addTo(map);
  });
</script>

<style>
  .container {
    position: relative;
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {
    border-radius: 50%;
    position: absolute;
  }
  .inner {
    width: 10px;
    height: 10px;
    background: purple;
  }
  .outter {
    width: 16px;
    height: 16px;
    background: white;
    animation: fade 2s infinite;
  }
  .ripple {
    width: 16px;
    height: 16px;
    background: purple;
    animation: ripple 12s infinite;
  }
  .d-0 {
    animation-delay: 0s;
  }
  .d-2 {
    animation-delay: 2s;
  }
  .d-4 {
    animation-delay: 4s;
  }
  .d-6 {
    animation-delay: 6s;
  }
  .d-8 {
    animation-delay: 8s;
  }
  .d-10 {
    animation-delay: 10s;
  }

  @keyframes fade {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.9);
      opacity: 0.8;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(8);
      opacity: 0;
    }
  }
</style>

<div class="container" bind:this={iconEl}>
  {#each [0, 2, 4, 6, 8, 10] as delay}
    <div class={`center outter ripple d-${delay}`} />
  {/each}

  <div class="center outter" />
  <div class="center inner" />
</div>
