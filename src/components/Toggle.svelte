<script>
  import { settings } from 'store';
  const handleClick = () => {
    settings.update((x) => {
      x.seeFollow = !x.seeFollow;
      if (x.seeFollow) {
        x['from'] = '';
      }
      return x;
    });
  };
  let isChecked = false;
  settings.subscribe((x) => {
    if (typeof x.seeFollow !== 'undefined') {
      isChecked = x.seeFollow;
    } else {
      if (settings.from && settings.from.length > 1) {
        isChecked = false
      }
    }
  });
</script>

<style>
  label {
    display:inline;
    cursor: pointer
  }
</style>

<div>
  <label for="iHopeThisIsTheOnlyToggle">
    <slot></slot>
  </label>
  <input id="iHopeThisIsTheOnlyToggle" type="checkbox" bind:checked="{isChecked}" on:click="{handleClick}" readOnly />
</div>