<script>
  import { settings } from 'store';
  // export let invalidWarning;
  // export let fieldState;
  // export let fieldName;
  export let fieldType;
  // export let label = '';
  // export let placeholder;
  // export let value;
  // export let onChange;
  // $: {
  //   onChange(value);
  // }
  let fieldState = 'inactive';
  const StateMachine = {
    inactive: 'filterFor',
    filterFor: 'filterOut',
    filterOut: 'inactive'
  };
  // const fieldStateColor = {
  //   inactive: 'grey',
  //   filterFor: 'lightgreen',
  //   filterOut: 'red'
  // }[fieldState];
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

<div class="filter-field" on:click="{onClick}">
  <!-- {label} -->
  <span class="filter-emoji">{emoji}</span>
  <span>{fieldType}</span>
  <slot></slot>
</div>