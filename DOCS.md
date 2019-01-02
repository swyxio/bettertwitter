# bettertwitter

a better twitter UI

## Twitter search documentation

Search modifiers (all independently combinable with hashtags and "exact search")

- Within a list of users e.g. `elections list:TIME/time-staff`
- From user e.g. `from:BarackObama`
- To user e.g. `to:BarackObama`
- Language e.g. `lang:en`
- Retweets e.g. `min_retweets:5`
- Faves e.g. `min_faves:10`
- Geotag
  - Center e.g. `near:New York`
  - Radius e.g. `within: 15mi`
- Sites e.g. `youtube.com OR youtu.be` or `http`
- Dates e.g. `since:2016-04-01 until:2016-04-09`
- Filter
  - Media e.g. `filter:media` (images or videos)
  - Images
    - `filter:images`
    - `filter:twimg`
  - Video
    - `filter:vine`
    - `filter:native_video` (uploaded inside tweet)
    - `filter:periscope`
  - News e.g. `filter:news`
  - Links e.g. `filter:links`
  - Family Safe e.g. `filter:safe`
  - Verfied e.g. `filter:verified`
  - Retweets and Quote tweets e.g. `filter:retweets`
  - Just RTs e.g. `filter:nativeretweets`
- Operators
  - Minus e.g. `-RT`, `-filter:links`, `beer -root`
  - Combine e.g. `#Emmys OR #Emmys2015`

Neat search ideas

- untagged mentions: https://espirian.co.uk/twitter-search-advanced-guide/#untagged

sources:

- https://www.labnol.org/internet/twitter-search-tricks/13693/

unique/useful 3rd party twitter services:

- https://doesfollow.com/ check who follows whom
