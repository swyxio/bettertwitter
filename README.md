# bettertwitter

This is a better twitter search UI for power users. This helps you build queries for [the Twitter search API](/DOCS.md) better than the Twitter "Advanced Search" can

## Opinions currently baked in

- Opens searches to mobile Twitter
- Sorts by latest results instead of "top"
- "People you follow" is checked by default
- Less-used Filters and numerical Quality is collapsed

## Roadmap

- Easy
  - decide on datepicker
  - basic design refactoring
  - persist choices to cookies
  - put state in URL to make it sharable/bookmarkable
  - recent searches
  - document what each filter does and how useful it is. Tooltip?
- Harder
  - advanced design refactoring
  - autocomplete usernames based on logged-in account's follows
  - OR logic builder on applicable fields
- Hard/Maybe never
  - search logged-in user's lists
