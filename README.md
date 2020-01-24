# NUDC (Northern Universities Dance Competition) organisation system

This forms the functional half of organisation system used for NUDC 2019, the other half of which was [the webform](https://nudc-2019-entryform.firebaseapp.com/home), the source code for which is at [penguinoneshaw/nudc-2019-webform](https://github.com/penguinoneshaw/nudc-2019-webform).

## What's going on

The project is roughly laid out in two blocks:

- The presentation framework
- The event details and invoices system

which are both served from the main `index.js` file.
When run with `npm start`, spins up a server which has the backend available at `/invoices` and the presentation at `/presentation`.

## What is there to do?

- Refactor the whole thing to be less silly
- Change to static generation for the competition details parts
