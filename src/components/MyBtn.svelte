<script>
  import Button, { Label, Icon } from '@smui/button';

  function doSomething() {
    alert('something');
  }
</script>

<Button on:click={doSomething} variant="outlined" class="button-shaped-round">
  <Label>
    Do Something
    <Icon class="material-icons">favorite</Icon>
  </Label>
</Button>
