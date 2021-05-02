<script>
  import { settings } from 'store';
  export let fieldName;
  if (!fieldName) throw new Error('must supply fieldName to TextField');
  export let label = '';
  export let placeholder = '';
</script>

<label for="{fieldName}">{label}</label>
<input min="0" type="number" pattern="\d*" step="10" id="{fieldName}" bind:value={$settings[fieldName]} {placeholder} />
<div class="form-control-extras">
  <button type="button" on:click={()=> $settings[fieldName] = undefined}>Clear</button>
  <slot> </slot>
</div>
