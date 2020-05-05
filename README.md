 ## How to run the project locally:

1. Download the files to your hard-drive.
1. Install Node.js as the runtime engine (https://nodejs.org/en/).
1. In the console, navigate to the downloaded directory, then run  `npm install` to install the dependent Node modules.
1. The firebase config.js file contains sensitive API key information and is not included on Github.  Contact me at <alex@wensley.dev> for a copy of the file if you want to install this project.  The file will go in /src/firebase/.
1. Run `npm start` to initialize the website.
1. Run `npm run lint` to run ESLint.
1. Run `npm run style` to run StyleLint.
1. Run `npm test` to run Jest/Enzyme tests.

## How to view the webpage online:
https://www.warhammer40kbuilder.info

## Thought process when creating the website
I wanted to make a website with CRUD functionality, and I hadn't found any Warhammer 40k army builder websites that looked good on mobile.  So I decided to make my own.

## Any trade offs you made?

The website was very data heavy, which didn't leave a lot of time for CSS styling.

## Anything you might implement with more time (features, fixes, technical debt corrections etc).

More CSS styling to make the website have a better visual appeal.  I would also add displays for army variables as Command Points (CP) and faction specific rules (Necron Dynasty traits, Tyranid Hive Fleet Adaptations, etc.) 

