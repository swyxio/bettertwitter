<script>
  import { settings } from 'store';
  // export let invalidWarning;
  export let fieldName;
  export let label = '';
  export let placeholder;
  export let value;
  // export let onChange;
  if (!fieldName) throw new Error('must supply fieldName to TextField');
  $: {
    settings.update((x) => {
      x[fieldName] = value;
      return x;
    });
  }
  settings.subscribe((x) => (value = x[fieldName]));
</script>

<div>
  <label labelfor="{fieldName}">{label}</label>
  <input min="0" type="number" id="{fieldName}" bind:value {placeholder} />
  <div class="form-control-extras">
    <button on:click={()=> value=undefined}> Reset </button>
    <slot> </slot>
  </div>
</div>