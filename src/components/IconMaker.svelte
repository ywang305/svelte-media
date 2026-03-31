<script>
  export let path = '/icons/svg/2946/2946186.svg';

  // Convert legacy path like "/icons/svg/3225/3225124.svg" → "3225/3225124.png"
  $: src = 'https://cdn-icons-png.flaticon.com/128/' +
    path.replace(/^\/icons\/svg\//, '').replace(/\.svg$/, '.png');
</script>

<style>

</style>

{#if path && path.length}

  <img alt={path} src={src} width="100%" height="100%" />
{/if}
