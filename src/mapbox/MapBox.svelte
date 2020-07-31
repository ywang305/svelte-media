<script>
  import Map from './controls/Map.svelte';
  import MapStyleButtons from './controls/MapStyleButtons.svelte';
  import CentralMarker from './controls/CentralMarker.svelte';
  import SearchBar from './controls/SearchBar.svelte';
  import BreathMarker from './controls/BreathMarker.svelte';
  import MediaMarkersAround from './controls/media/MediaMarkersAround.svelte';
</script>

<Map lat={40.7127837} lng={-74.0059413} zoom={13}>
  <MapStyleButtons />
  <CentralMarker />
  <SearchBar />
  <MediaMarkersAround />
  <!-- <MapMarker lat={37.8225} lon={-122.0024} label="Svelte Body Shaping"/>
    <MapMarker lat={33.8981} lon={-118.4169} label="Svelte Barbershop & Essentials"/>
    <MapMarker lat={29.7230} lon={-95.4189} label="Svelte Waxing Studio"/>
    <MapMarker lat={28.3378} lon={-81.3966} label="Svelte 30 Nutritional Consultants"/>
    <MapMarker lat={40.6483} lon={-74.0237} label="Svelte Brands LLC"/>
    <MapMarker lat={40.6986} lon={-74.4100} label="Svelte Medical Systems"/> -->
</Map>
