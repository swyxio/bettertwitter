<script>
    export let fieldName;
    if (!fieldName) throw new Error('must supply fieldName to TextField');
    export let placeholder = '';
    import { settings } from 'store';
    $: console.log('hi',$settings)
  </script>
  
  <select bind:value={$settings['usernameMode']} name="pets" id="pet-select">
    <option value="userfrom">User from</option>
    <option value="quotetweet">Quote tweet</option>
  </select>
  <!-- 2 way binding value to *store* -->
  <input type="text" id="{fieldName}" disabled={$settings['seeFollow']} bind:value={$settings[fieldName]} {placeholder} />
  <div class="form-control-extras">
    <slot> </slot>
  </div>
  