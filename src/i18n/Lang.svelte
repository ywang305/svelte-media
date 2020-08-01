<script>
  import { language, isZh } from '../store';
  const locales = [
    { id: 'en-US', title: 'English' },
    { id: 'zh-CN', title: '中文' },
  ];

  let selected;
  $: if (selected) {
    $language = selected.id;
  }
</script>

<style>

</style>

<div>
  <label>Language/语言</label>
  <select bind:value={selected} class="w3-select w3-border">
    {#each locales as locale}
      <option value={locale}>{locale.title}</option>
    {/each}
  </select>
</div>
