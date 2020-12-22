<script>
  import { settings } from 'store';
  export let fieldType;
  let fieldState = ['replies', 'retweets'].includes(fieldType) ? 'filterOut' : 'inactive';
  const StateMachine = {
    inactive: 'filterFor',
    filterFor: 'filterOut',
    filterOut: 'inactive'
  };
  $: emoji = {
    inactive: '☐',
    filterFor: '✓',
    filterOut: '✖'
  }[fieldState];

  const onClick = () => {
    fieldState = StateMachine[fieldState];
    settings.update((x) => {
      x.filters[fieldType] = fieldState === 'inactive' ? undefined : fieldState;
      return x;
    });
  };
</script>
<style>
  .filter-field {
    user-select: none;
    padding: .5em;
    cursor: pointer;
    margin-right: .5em;
  }
  .filter-emoji {
    display: inline-block;
    width: 1em;
    text-align: center;
  }
</style>

<div class="filter-field" on:click="{onClick}">
  <!-- {label} -->
  <span class="filter-emoji">{emoji}</span>
  <span>{fieldType}</span>
  <slot></slot>
</div>
