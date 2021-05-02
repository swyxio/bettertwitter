<script>
    import { settings } from 'store';
    const handleClick = () => {
      // need to be like this to register the update
      settings.update(x => {
        console.log('before', x)
        x.cardPoll = !x.cardPoll
        console.log('after', x)
        return x
      })
    };
    let isChecked = !!$settings.cardPoll;
  </script>
  
  <style>
    label {
      display:inline;
      cursor: pointer
    }
  </style>
  
  <div>
    <label for="CardPoll">
      <slot></slot>
    </label>
    <input id="CardPoll" type="checkbox" checked="{isChecked}" on:click="{handleClick}" readOnly />
  </div>