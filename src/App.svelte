<script>
  import { get } from 'svelte/store';
  import { settings, tweetURL } from 'store';
  import FilterField from './components/FilterField.svelte';
  import NumberField from './components/NumberField.svelte';
  import TextField from './components/TextField.svelte';
  import DateField from './components/DateField.svelte';
  import Toggle from './components/Toggle.svelte';
  const filters = [
    "media",
    "images",
    "vine",
    "native_video",
    "periscope",
    "news",
    "links",
    "safe",
    "verified",
    "retweets",
    "nativeretweets"
  ]
  // $: {
  //   console.log({ $tweetURL, $settings })
  // }
  const submit = () => {
    window.open($tweetURL)
  };

  let showInvalidWarning = false
  settings.subscribe(x => {
    const datesSince = x["since"]
    const datesUntil = x["until"]
    showInvalidWarning = datesSince && datesUntil && datesSince > datesUntil
  })
</script>

<style global lang="scss">

  h1 {
    margin-block-start: 0;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 1.5em;
    }
  }


  form, .grid3 {
    margin: 0 auto;
    display: grid;
    /* grid-template-columns: minmax(min-content,1fr) 3fr minmax(min-content,1fr); */
    /* grid-template-columns: 60px calc(100vw - 200px) 60px; */
    grid-template-columns: 60px minmax(auto, 200px) 60px;
    grid-column-gap: 1rem;
    grid-row-gap: .5rem;
    /* width: 100%; */
    /* max-width: calc(100vw - 100px); */
    align-items: center;
  }
  :root {
    --border-color: #444;
  }

  input[type='text'], input[type='number'], input[type='date'] {
    width: 100%
  }
  button, input {
    background: #fff;
    outline: none;
    /* border: .12em solid #444;
    box-shadow: 2px 2px 0 0 #444; */
    border: .12em solid var(--border-color);
    box-shadow: var(--border-color) 2px 2px 0 0;
    padding: .5em;
    transition: all .1s ease-in;
  }

  * {
    border-radius: 2px;
  }

  .details-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 100%;
  }
  @media only screen and (max-width: 600px) {
    .details-content {
      grid-template-columns: 1fr 1fr;
    }
  }
  h2 {
    display: inline
  }
  form>#highlight, 
  form>.details-content, 
  form>button[type=submit], 
  form>h2,
  .span3,
  details {
    grid-column: 1/span 3;
  }
  footer * {
    white-space: pre-wrap;
  }
  footer, main {
    padding: 1rem;
    /* width: 100%; */
  }
  @media only screen and (min-width: 1000px) {
    footer, main {
      padding: 3rem;
    }
    #searchKeyword {
      --border-color: #5614B0;
      font-size: 200%;
    }
    button[type="submit"] {
      font-size: 200%;
    }
  }
  button[type="submit"] {
    --border-color: darkgreen;
    cursor: pointer;
    background: #d9a7c7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fffcdc, #d9a7c7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fffcdc, #d9a7c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>

<main>
  <h1>Better Twitter</h1>
  <form on:submit|preventDefault="{submit}">
    <TextField label="User from" fieldName="from">
    </TextField>
    <div></div>
    <Toggle>Tweets From People You Follow</Toggle>
    <div></div>
    <TextField label="User to" fieldName="to" />

    <details>
      <summary>
        <h2>Dates</h2>
      </summary>
      <div class="grid3">
        <DateField label="Since" fieldName="since"/>
        {#if showInvalidWarning}
        <div class="span3">⚠️ Warning: <pre>Since</pre>should come before<pre>Until</pre></div>
        {/if}
        <DateField label="Until" fieldName="until"/>
      </div>
    </details>
    <details>
      <summary>
        <h2>Filters</h2>
      </summary>
      <div class="details-content">
        {#each filters as filter}
          <FilterField fieldType={filter} />
        {/each}
      </div>
    </details>
    <details>
      <summary>
        <h2>Quality</h2>
      </summary>
      <div class="grid3">
      <NumberField fieldName="min_retweets" label="min_retweets" />
      <NumberField fieldName="min_faves" label="min_faves" />
      </div>
    </details>
    <TextField label="keyword" fieldName="searchKeyword" placeholder={'search...'}>
      <em>leaving blank is ok</em>
    </TextField> 


    <div id="highlight">
      <h2>Tips</h2>
      <ul>
        <li>
          Dont forget you can search "exact quotes", @usernames or #hashtags
        </li>
        <li>Minus Operator e.g. `-RT` or `beer -root`</li>
        <li>OR Operator e.g. `#Emmys OR #Emmys2015`</li>
      </ul>
    </div>

    <button type="submit">Open search results</button>
  </form>
  <footer>
    <pre>This app is definitely a work in progress. </pre>
    <pre>
      <a href="https://github.com/sw-yx/bettertwitter">Send ideas/Check out the todo/wishlist here.</a>
    </pre>
    Bouquets and brickbats to <a href="https://twitter.com/swyx">@swyx</a>
  </footer>
</main>