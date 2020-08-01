<script>
  export let path = '/icons/svg/2946/2946186.svg';
  export let host = 'https://image.flaticon.com';
</script>

<style>

</style>

{#if path && path.length}

  <img alt={path} src={`${host}${path}`} width="100%" height="100%" />
{/if}
