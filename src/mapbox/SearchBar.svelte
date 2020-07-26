<script>
  import { getContext } from 'svelte';
  import { mapboxgl, key, getPlace, getPlaceSuggests } from './mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();
  let placeStr = '';
  let suggests = [];

  function clearSuggests() {
    suggests = [];
  }

  map
    .on('moveend', async () => {
      const data = await getPlace(map.getCenter());
      const place_name =
        data && data.features[0] && data.features[0].place_name;
      placeStr = place_name || placeStr;
    })
    .on('movestart', clearSuggests)
    .on('click', clearSuggests);

  const onInputHandler = async (e) => {
    placeStr = e.target.value;
    const data = await getPlaceSuggests(placeStr, map.getCenter());
    suggests =
      (data &&
        data.features.map(({ place_name, center }) => ({
          place_name,
          center: { lng: center[0], lat: center[1] },
        }))) ||
      [];
  };

  const onClickSuggest = (i) => () => {
    const { center } = suggests[i];
    map.flyTo({ center });
    clearSuggests();
  };
</script>

<style>
  #flex-box-inner {
    position: absolute;
    top: 16px;
    left: 8px;
    max-width: 350px;
    width: 80%;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 8px;
    padding: 8px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 0;
    font-size: 1.2em;
  }
  #vertical-menu a {
    background-color: #eee; /* Grey background color */
    color: black; /* Black text color */
    display: block; /* Make the links appear below each other */
    padding: 12px; /* Add some padding */
    text-decoration: none; /* Remove underline from links */
    text-align: left;
    font-style: italic;
  }
  #vertical-menu a:nth-child(even) {
    background-color: rgb(250, 246, 240);
  }
  #vertical-menu a:hover {
    background-color: #ccc; /* Dark grey background on mouse-over */
  }
</style>

<div id="flex-box-inner">
  <input
    value={placeStr}
    on:input={onInputHandler}
    on:focus={onInputHandler}
    placeholder="enter address" />
  {#if suggests.length}
    <div id="vertical-menu">
      {#each suggests as { place_name, center }, i}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" on:click={onClickSuggest(i)}>{place_name}</a>
      {/each}
    </div>
  {/if}
</div>
