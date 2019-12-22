<script>
  export let fieldName;
  if (!fieldName) throw new Error('must supply fieldName to TextField');
  export let label;
  export let placeholder = '';
  import { settings } from 'store';
</script>

<label for="{fieldName}">{label}</label>
<!-- 2 way binding value to *store* -->
<input type="text" id="{fieldName}" bind:value={$settings[fieldName]} {placeholder} />
<div class="form-control-extras">
  <slot> </slot>
</div>
