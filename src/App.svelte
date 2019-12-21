<script>
  import { get } from 'svelte/store';
  import { settings, tweetURL } from 'store';
  import FilterField from './components/FilterField.svelte';
  import NumberField from './components/NumberField.svelte';
  import TextField from './components/TextField.svelte';
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
  const submit = () => {
    // const temp = get(settings);
    console.log({ $settings, $tweetURL });
  };

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
  let showInvalidWarning = false
  settings.subscribe(x => {
    const datesSince = x["Since"]
    const datesUntil = x["Until"]
    showInvalidWarning = datesSince && datesUntil && datesSince > datesUntil
  })
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Better Twitter Search</h1>
  <form on:submit|preventDefault="{submit}">
    <Toggle>People You Follow</Toggle>
    <TextField label="User from" fieldName="from" />
    <TextField label="User to" fieldName="to" />
    <TextField fieldName="Since" placeholder="YYYY-MM-DD">
      <button type="button" on:click={handleDate("Since", today)}>Today</button>
      <button type="button" on:click={handleDate("Since", mthago)}>1m</button>
      <button type="button" on:click={handleDate("Since", mthago3)}>3m</button>
      <span>ago</span>
    </TextField>
    <TextField fieldName="Until" placeholder="YYYY-MM-DD">
      {#if showInvalidWarning}
      <div>⚠️ Warning: <pre>Since</pre>should come before<pre>Until</pre></div>
      {/if}
      <button type="button" on:click={handleDate("Until", today)}>Today</button>
      <button type="button" on:click={handleDate("Until", mthago)}>1m</button>
      <button type="button" on:click={handleDate("Until", mthago3)}>3m</button>
      <span>ago</span>
    </TextField>
    <h2>Filters</h2>
    <div className="details-content">
      {#each filters as filter}
        <FilterField fieldType={filter} />
      {/each}
    </div>
    <h2>Quality</h2>


    <NumberField fieldName="minRetweets" label="min_retweets" />
    <NumberField fieldName="minFaves" label="min_faves" />
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