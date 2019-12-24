import React, { useState } from 'react'
import { useInput } from '@swyx/hooks'
import './patch'
// import { useLoading } from '@swyx/hooks';
import TextField from 'components/TextField'
import NumberField from 'components/NumberField'
import FilterField, { FilterTypes, FieldStateType } from 'components/FilterField'
import Toggle from './components/Toggle'
import './index.css';
function useFilter(type: FilterTypes) {
  const [FilterState, setFilterState] = useState<FieldStateType>('inactive')
  const component = <FilterField key={type} onChange={setFilterState} filterType={type} fieldState={FilterState} />
  return { FilterState, type, component }
}

// /**
//  * convert an array of (non nested) objects to an object of arrays.
//  * assumes all objects are the same shape
//  * */
// type IndexObject = { [index: string]: any } // hacky. :(
// function pivot<T>(arr: (T & IndexObject)[]) {
//   type Subset = { [K in keyof T]?: T[K] }
//   let ans: IndexObject & Subset = {}
//   Object.keys(arr[0]).forEach(k => {
//     ans[k] = arr.map(obj => obj[k])
//   })
//   return ans as { [K in keyof T]: T[K] }
// }
function App() {
  const [seeFollow, setseeFollow] = useState(true)
  const [minRTs, setminRTs] = useState(0)
  const [minLikes, setminLikes] = useState(0)
  const { ...search } = useInput('')
  const { ...userFrom } = useInput('', () => seeFollow && setseeFollow(false))
  const { ...userTo } = useInput('')
  const { ...datesSince } = useInput('')
  const { ...datesUntil } = useInput('')

  const filters = Object.keys(FilterTypes).map(v => useFilter(v as FilterTypes))

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    window.open(
      linkComposer(
        {
          from: userFrom,
          to: userTo,
          search: search,
          since: datesSince,
          until: datesUntil
        },
        filters,
        seeFollow,
        minLikes,
        minRTs
      )
    )
  }

  const today = new Date()
  let yrago = new Date()
  yrago = new Date(yrago.setMonth(yrago.getMonth() - 12)) // subtract 1yr
  let mthago = new Date()
  mthago = new Date(mthago.setMonth(mthago.getMonth() - 1)) // subtract 1mth;
  let mthago3 = new Date()
  mthago3 = new Date(mthago3.setMonth(mthago3.getMonth() - 3)) // subtract 3mth;

  const handleDate = (dateField: { setValue: Function }, newDate: Date) => (e: React.MouseEvent<HTMLButtonElement>) =>
    void e.preventDefault() ||
    // void console.log('handling date') ||
    dateField.setValue(newDate.toISOString().slice(0, 10))

  return (
    <>
      <header>
        <h1> Better Twitter Search </h1>
      </header>
      <main>
        <form onSubmit={submit}>
          <h2>Keyword</h2>
          <TextField inputSize="expand" fieldName="searchKeyword" {...search} placeholder={'search...'} >
            <em>leaving blank is ok</em>
          </TextField>
          <h2>User</h2>
          <Toggle isOn={seeFollow} onClick={v => void userFrom.resetValue() || setseeFollow(v)}>
            People You Follow
        </Toggle>
          <TextField {...userFrom} label="User from" fieldName="from" />
          <TextField {...userTo} label="User to" fieldName="to" />
          <TextField {...datesSince} label="Since" fieldName="Since" placeholder="YYYY-MM-DD">
            <div className="btn-group">
              <button className="tiny-btn" type="button" onClick={handleDate(datesSince, today)}>
                Today{' '}
              </button>
              <button className="tiny-btn" type="button" onClick={handleDate(datesSince, mthago)}>
                1m{' '}
              </button>
              <button className="tiny-btn" type="button" onClick={handleDate(datesSince, mthago3)}>
                3m
            </button>
              <span>
                ago
          </span>
            </div>
          </TextField>

          <TextField
            invalidWarning={
              datesSince.value && datesUntil.value && datesSince.value > datesUntil.value ? (
                <div>
                  <pre>Since</pre>
                  should come before
                  <pre>Until</pre>
                </div>
              ) : (
                  undefined
                )
            }
            {...datesUntil}
            label="Until"
            fieldName="Until"
            placeholder="YYYY-MM-DD"
          >
            <div
              className="btn-group"
            >
              <button className="tiny-btn" type="button" onClick={handleDate(datesUntil, today)}>
                Today
            </button>
              <button className="tiny-btn" type="button" onClick={handleDate(datesUntil, mthago)}>
                1m
            </button>
              <button className="tiny-btn" type="button" onClick={handleDate(datesUntil, mthago3)}>
                3m
            </button>
              <span>
                ago
          </span>
            </div>
          </TextField>
          <h2>Filters</h2>
          <div className="details-content">
            {filters.map(x => x.component)}
          </div>
          <h2>Quality</h2>

          <NumberField fieldName="minRetweets" label="min_retweets" onChange={setminRTs} />
          <NumberField fieldName="minFaves" label="min_faves" onChange={setminLikes} />


          <div id="highlight">
            <h2>Tips</h2>
            <ul>
              <li>Dont forget you can search "exact quotes", @usernames or #hashtags</li>
              <li>Minus Operator e.g. `-RT` or `beer -root`</li>
              <li>OR Operator e.g. `#Emmys OR #Emmys2015`</li>
            </ul>
          </div>

          <button type="submit">Open search results</button>
        </form>
      </main>
      <footer>
        <p>This app is definitely a work in progress. </p>
        <p>
          <a href="https://github.com/sw-yx/bettertwitter">Send ideas/Check out the todo/wishlist here.</a>
        </p>
        <p>

          Bouquets and brickbats to <a href="https://twitter.com/swyx">@swyx</a>
        </p>
      </footer>
    </>
  )
}

interface IDictionary<TValue> {
  [id: string]: TValue
}
function linkComposer(
  obj: IDictionary<{ value: string }>,
  filters: {
    FilterState: FieldStateType
    type: FilterTypes
    component: JSX.Element
  }[],
  seeFollow: boolean,
  minLikes: number,
  minRTs: number
) {
  let final = ''
  Object.keys(obj).map(k => {
    if (k === 'search') {
      // special
      final = final.concat(obj[k].value).concat(' ')
    } else if (obj[k].value) {
      final = final.concat(`${k}:${obj[k].value} `)
    }
  })
  filters.forEach(filter => {
    if (filter.FilterState == 'filterFor') final = final.concat(`filter:${filter.type} `)
    if (filter.FilterState == 'filterOut') final = final.concat(`!filter:${filter.type} `)
  })
  if (seeFollow) final = final.concat(`filter:follows `)
  if (minLikes > 0) final = final.concat(`min_faves:${minLikes} `)
  if (minRTs > 0) final = final.concat(`min_retweets:${minRTs} `)
  return `https://mobile.twitter.com/search?src=typd&f=live&q=${encodeURIComponent(final)}`
}

export default App;
