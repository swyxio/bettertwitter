<script>
  import { settings, tweetURL } from 'store'
  import DateField from './components/DateField.svelte'
  import FilterField from './components/FilterField.svelte'
  import NumberField from './components/NumberField.svelte'
  import TextField from './components/TextField.svelte'
  import TextFieldUsername from './components/TextFieldUsername.svelte'
  import Toggle from './components/Toggle.svelte'
  import CardToggle from './components/CardToggle.svelte'

  const filters = [
    'links',
    'replies',
    'hashtags',
    'media',
    'images',
    // 'vine', // dead
    'native_video',
    'periscope',
    'news',
    'safe',
    'verified',
    'blue_verified', // https://twitter.com/KetanJ0/status/1591487650812551168
    // "retweets", // this seems to just be an alias for "RTs" - no longer useful in modern twitter
    'nativeretweets',
  ]
  // $: {
  //   console.log({ $tweetURL, $settings })
  // }
  const submit = () => {
    window.open($tweetURL)
  }

  let showInvalidWarning = false
  settings.subscribe(x => {
    const datesSince = x['since']
    const datesUntil = x['until']
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

  form,
  .grid3 {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 0.5rem;
    align-items: center;
  }
  :root {
    --border-color: #444;
  }

  input[type='text'],
  input[type='number'],
  input[type='date'] {
    width: 100%;
  }
  button,
  input {
    background: #fff;
    outline: none;
    /* border: .12em solid #444;
    box-shadow: 2px 2px 0 0 #444; */
    border: 0.12em solid var(--border-color);
    box-shadow: var(--border-color) 2px 2px 0 0;
    padding: 0.5em;
    transition: all 0.1s ease-in;
  }

  * {
    border-radius: 2px;
  }

  .details-content {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  @media only screen and (max-width: 600px) {
    .details-content {
      grid-template-columns: 1fr 1fr;
    }
  }
  h2 {
    display: inline;
  }
  form > #highlight,
  form > .details-content,
  form > button[type='submit'],
  form > h2,
  .span3,
  details {
    grid-column: 1 / span 3;
  }
  h3 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  footer * {
    white-space: pre-wrap;
  }
  footer,
  main {
    padding: 1rem;
    /* width: 100%; */
  }
  @media only screen and (min-width: 1000px) {
    footer,
    main {
      padding: 3rem;
    }
    #searchKeyword {
      --border-color: #5614b0;
      font-size: 200%;
    }
    button[type='submit'] {
      font-size: 200%;
    }
  }
  button[type='submit'] {
    --border-color: darkgreen;
    cursor: pointer;
    background: #d9a7c7; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #fffcdc,
      #d9a7c7
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #fffcdc,
      #d9a7c7
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>

<main>
  <h1>Better Twitter</h1>
  <form on:submit|preventDefault={submit}>
    <TextFieldUsername fieldName="from" />
    <div />
    <Toggle>Tweets From People You Follow</Toggle>
    <div />
    <TextField label="User to" fieldName="to" />

    <details>
      <summary>
        <h2>Dates</h2>
      </summary>
      <div class="grid3">
        <DateField label="Since" fieldName="since" />
        {#if showInvalidWarning}
          <div class="span3">
            ⚠️ Warning:
            <pre>Since</pre>
            should come before
            <pre>Until</pre>
          </div>
        {/if}
        <DateField label="Until" fieldName="until" />
      </div>
    </details>
    <details>
      <summary>
        <h2>Filters</h2>
      </summary>
      <h3 class="span3">Toggles (Filter For, Filter Out, Inactive)</h3>
      <div class="details-content">
        {#each filters as filter}
          <FilterField fieldType={filter} />
        {/each}
      </div>
      <h3 class="span3">Special Filters</h3>
      <div class="grid3">
        <div />
        <CardToggle>Twitter polls (2,3,4 choices)</CardToggle>
        <div />
        <TextField label="Language e.g. es, fr, az, zh" fieldName="lang">
          <div>(<a href="https://twitter.com/wongmjane/status/1388956248784048131">try "und" for quirkiness</a>)</div>
        </TextField>
      </div>
      <div class="grid3">
        <NumberField fieldName="min_retweets" label="Min Retweets" />
        <NumberField fieldName="min_faves" label="Min Likes" />
        <NumberField fieldName="min_replies" label="Min Replies" />
      </div>
    </details>
    <hr class="span3" />
    <TextField
      label="keyword"
      fieldName="searchKeyword"
      placeholder={'search...'}>
      <em>leaving blank is ok</em>
    </TextField>

    <h3 class="span3" style="max-width: 50vw">{decodeURIComponent($tweetURL).slice(45)}</h3>
    <button type="submit">Open search results</button>
  </form>
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
  <footer>
    <pre>This app is definitely a work in progress.</pre>
    <pre>
      <a href="https://github.com/sw-yx/bettertwitter">
        Send ideas/Check out the todo/wishlist here.
      </a>
    </pre>
    Bouquets and brickbats to
    <a href="https://twitter.com/swyx">@swyx</a>
  </footer>
</main>
