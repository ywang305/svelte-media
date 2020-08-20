<script>
  import { getContext, onMount } from 'svelte';
  import { mapboxgl, key } from '../mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();

  let iconEl;
  export let twit;
  onMount(() => {
    const { lng, lat } = twit;
    new mapboxgl.Marker(iconEl).setLngLat({ lng, lat }).addTo(map);
  });

  const delay = Math.random() * (8 - 0) + 0;
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  $: if (twit) {
    const urls = twit.text.match(urlRegex);
    if (urls) {
      urls.forEach((url) => {
        twit.text = twit.text.replace(
          url,
          `<a href="${url}" class="w3-text-blue" target="_blank">${url}</a>`
        );
      });
    }
  }

  let created_at = '';
  let place_name = '';
  let user_name = '';
  let screen_name = '';
  let media = null;

  let open = false;
  $: if (open) {
    created_at = twit.created_at;
    if (twit.place) {
      place_name = twit.place.name;
    }
    user_name = twit.user_name;
    screen_name = twit.screen_name;

    media = twit.media;
  }

  let imgError = false;
  $: if (imgError) {
    const relayImage = async () => {
      const resp = await fetch(
        `https://nyc-function.azurewebsites.net/api/twitter_img?url=${media.media_url}`
      );
      const blob = await resp.blob();
      const media_url = URL.createObjectURL(blob);
      imgError = false;
      media = { ...media, media_url };
    };
    relayImage();
  }
</script>

<style>
  .container {
    position: relative;
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .center {
    border-radius: 50%;
    position: absolute;
  }
  .inner {
    width: 10px;
    height: 10px;
    background: purple;
    animation: incircle 5s infinite;
  }
  .outter {
    width: 18px;
    height: 18px;
    background: white;
    animation: outcircle 5s infinite;
  }
  .ripple {
    width: 20px;
    height: 20px;
    background: purple;
    animation: ripple 10s infinite;
  }

  @keyframes incircle {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes outcircle {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.7);
      opacity: 0.3;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(6);
      opacity: 0;
    }
  }

  .popup {
    background: white;
    min-width: 300px;

    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    top: -50px;
    left: 50px;
    cursor: auto;
  }
</style>

<div class="container" bind:this={iconEl} on:click={() => (open = !open)}>
  {#each [delay, delay + 5] as delay}
    <div class="center ripple" style={`animation-delay: ${delay}s;`} />
  {/each}

  <div class="center outter" style={`animation-delay: ${delay}s;`} />
  <div class="center inner" />

  {#if open}
    <div class="popup w3-card-4 3-round-xlarge">

      <div class="w3-container w3-blue w3-right-align">
        {place_name} &nbsp; {new Intl.DateTimeFormat(undefined, {
          timeStyle: 'short',
          dateStyle: 'short',
        }).format(new Date(created_at))}
      </div>

      <div class="w3-container">
        <h6>
          {@html twit.text}
        </h6>
      </div>

      {#if media && media.type === 'photo'}
        <img
          src={media.media_url}
          alt={media.type}
          width="100%"
          height="100%"
          on:error={() => {
            console.log('img error');
            imgError = true;
          }} />
      {:else if media && media.type === 'video'}
        <video width="100%" height="100%" controls autoplay loop>
          {#each twit.media.video_info.variants as variant}
            <source src={variant.url} type={variant.content_type} />
          {/each}
        </video>
      {/if}

      <div class="w3-container w3-blue">
        <pre>by: {user_name} @{screen_name}</pre>
      </div>

    </div>
  {/if}
</div>
