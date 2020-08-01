<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import { mapboxgl, key, getPlace, getPlaceSuggests } from './mapbox.js';
  import IconMaker from '../../components/IconMaker.svelte';
  import { isZh } from '../../store';

  const { getMap } = getContext(key);
  const map = getMap();
  let placeStr = '';
  let suggests = [];

  function clearSuggests() {
    suggests = [];
  }

  map
    .on('moveend', async () => {
      const data = await getPlace(map.getCenter(), $isZh ? 'zh-Hans' : 'en');
      const place_name =
        data &&
        data.features &&
        data.features[0] &&
        data.features[0].place_name.split(',').slice(0, 2).join(',');
      placeStr = place_name || placeStr;
    })
    .on('movestart', clearSuggests)
    .on('click', clearSuggests);

  const onInputHandler = async (e) => {
    placeStr = e.target.value;
    const data = await getPlaceSuggests(
      placeStr,
      map.getCenter(),
      $isZh ? 'zh-Hans' : 'en'
    );
    suggests =
      (data &&
        data.features &&
        data.features.map(({ place_name, center, place_type, properties }) => {
          switch (place_type[0]) {
            case 'address':
              place_type = 'address';
              break;
            case 'poi': {
              if (properties.category === 'airport') place_type = 'airport';
              else place_type = 'place';
              break;
            }
            default:
              place_type = 'place'; // country, region, post, neighberhood...
          }
          return {
            place_name,
            center: { lng: center[0], lat: center[1] },
            place_type,
          };
        })) ||
      [];
  };

  const onClickSuggest = (i) => () => {
    const { center } = suggests[i];
    map.flyTo({ center });
    clearSuggests();
  };

  const icon_uri = {
    airport: '/icons/svg/3112/3112928.svg',
    address: '/icons/svg/717/717530.svg',
    place: '/icons/svg/2909/2909523.svg',
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
    background-color: rgb(248, 248, 248); /* Grey background color */
    color: black; /* Black text color */
    display: flex; /* Make the links appear below each other */
    padding: 12px; /* Add some padding */
    text-decoration: none; /* Remove underline from links */
    text-align: left;
    font-style: italic;
  }
  #vertical-menu a:nth-child(even) {
    background-color: rgb(237, 234, 255);
  }
  #vertical-menu a:hover {
    background-color: #ccc; /* Dark grey background on mouse-over */
  }
  .icon {
    display: inline-block;
    min-width: 1.5em;
    margin-right: 1em;
    flex: 0 1 0%;
  }
</style>

<div id="flex-box-inner">
  <input
    value={placeStr}
    on:input={onInputHandler}
    on:focus={onInputHandler}
    placeholder={$isZh ? '输入地址' : 'enter address'} />
  {#if suggests.length}
    <div id="vertical-menu" transition:slide>
      {#each suggests as { place_name, center, place_type }, i}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" on:click={onClickSuggest(i)}>
          <div class="icon">
            <IconMaker path={icon_uri[place_type]} />
          </div>
          <label>{place_name}</label>
        </a>
      {/each}
    </div>
  {/if}
</div>
