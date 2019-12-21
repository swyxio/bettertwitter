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
  <!-- {invalidWarning} -->
  <label labelfor="{fieldName}">{label}</label>
  <input id="{fieldName}" bind:value {placeholder} />
  <div class="form-control-extras">
    <slot> </slot>
  </div>
</div>