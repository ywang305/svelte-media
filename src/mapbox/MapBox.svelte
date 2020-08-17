<script>
  import Map from './controls/Map.svelte';
  import MapStyleButtons from './controls/MapStyleButtons.svelte';
  import CentralMarker from './controls/CentralMarker.svelte';
  import SearchBar from './controls/SearchBar.svelte';
  import BreathMarker from './controls/BreathMarker.svelte';
  import MediaMarkersAround from './controls/media/MediaMarkersAround.svelte';
  import { isZh } from '../store';
</script>

<Map lat={40.7127837} lng={-74.0059413} zoom={13}>

  <CentralMarker />
  <SearchBar />
  {#if !$isZh}
    <MapStyleButtons />
  {/if}
  <MediaMarkersAround />
</Map>
