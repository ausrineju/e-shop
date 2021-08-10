# e-shop

Step #1
● Decide on what type of e-shop you are going to build
● Create a basic, HTML+CSS-only layout
● Create a remote repository, from now on always push your solutions to
this repository

Step #2
● Add interactivity to carousel (back/next)
● Carousel should have at least 3 items
● Each carousel item should have text (overlaid on top?) and the carousel
itself should be a link( Checkout .link-streched in bootstrap 4.6 for
inspiration).

● Polish overall styling: add hover/focus/transition effects to clickable items,
ensure proper spacing (margins and paddings are used). Try to make
spacing tokens, for example: --spacer-3: 1rem, --spacer-2: 0.5rem, --
spacer-4: 2rem.
● Ensure each item has at least title
● Implement header sticking to the top (css only)

Step #3
● Use mocked API to replace hard-coded data in page
- Use json-server to create mock endpoints
- Your shop and carousel items have to be fetched from API
- Consider either creating different endpoints or having a flag
on a shop item (if carousel features some items)
- Consider using fetch instead of additional libraries
- You are free to configure this solution to either require globally
installed dependencies or be a self-contained app with required
dependencies and configuration to run the app

Step #4
● Add “Create, update, delete” capabilities to the items below the carousel.
User should be able to:
- Add a new item
- Update an existing item
- Delete an item
- Make the item featured in the carousel
● (Bonus) Add sorting, filtering controls to the items below the carousel.
