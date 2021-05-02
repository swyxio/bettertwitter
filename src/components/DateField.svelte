<script>
  import { settings } from 'store';
  export let fieldName;
  export let label = '';
  if (!fieldName) throw new Error('must supply fieldName to TextField');
  const today = new Date()
  let yrago = new Date()
  yrago = new Date(yrago.setMonth(yrago.getMonth() - 12)) // subtract 1yr
  let mthago = new Date()
  mthago = new Date(mthago.setMonth(mthago.getMonth() - 1)) // subtract 1mth;
  let mthago3 = new Date()
  mthago3 = new Date(mthago3.setMonth(mthago3.getMonth() - 3)) // subtract 3mth;
  const handleDate = (fieldName, setToDate) => () => {
    settings.update(x => {
      x[fieldName] = setToDate.toISOString().slice(0, 10)
      return x
    })
  }
  const clearDate = (fieldName) => () => {
    settings.update(x => {
      x[fieldName] = undefined
      return x
    })
  }
</script>

<style>
  .form-control-extras {
    --border-color: rgba(0,0,0,0.1);
  }
</style>


<!-- {invalidWarning} -->
<label for="{fieldName}">{label}</label>
<input type="date" id="{fieldName}" bind:value={$settings[fieldName]}  placeholder="YYYY-MM-DD" />
<div class="form-control-extras">
  <button type="button" on:click={handleDate(fieldName, mthago)}>1m</button>
  <button type="button" on:click={handleDate(fieldName, mthago3)}>3m</button>
  <span>ago</span>
  <button type="button" on:click={clearDate(fieldName)}>Clear</button>
  <slot></slot>
</div>