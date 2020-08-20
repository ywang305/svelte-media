<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from '../mapbox.js';
  import MediaMarker from './MediaMarker.svelte';
  import twitter_search from './twitter_search';
  import { isZh } from '../../../store';

  const { getMap } = getContext(key);
  const map = getMap();

  let twits = [];

  let lastCenter;
  async function twitterSearch() {
    const { lng, lat } = map.getCenter();
    lastCenter = { lng, lat };
    const bounds = map.getBounds();
    twits = await twitter_search({
      lng,
      lat,
      bounds,
      lang: $isZh ? 'zh' : '',
    });
  }

  map.on('moveend', async () => {
    const bounds = map.getBounds();
    if (!lastCenter || !bounds.contains(lastCenter)) {
      await twitterSearch();
    }
  });
  map.on('zoomend', twitterSearch);
  map.on('resize', twitterSearch);

  $: {
    $isZh;
    twitterSearch();
  }
</script>

{#each twits
  .sort((a, b) => {
    const agentA = a.media ? Object.keys(a.media).length : 0;
    const agentB = b.media ? Object.keys(b.media).length : 0;
    if (!agentA && !agentB) {
      return b.text.length - a.text.length;
    }
    return agentB - agentA;
  })
  .slice(0, 20) as twit (twit.id)}
  <MediaMarker {twit} />
{/each}
