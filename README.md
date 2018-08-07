# HumbleBundle Key Scraper

A bookmarklet to scrape [your HumbleBundle Keys page](https://www.humblebundle.com/home/keys) for unredeemed keys that once parsed will download that data in a formatted JSON file. This is meant for personal use.

I've been a HumbleBundle supporter since it first started. As you might imagine, I have a large number of unredeemed game keys that I won't ever have the time for or am not interested in using. Since the data isn't exportable, this is a tool I created to get that data into an easy to use file so it can be modified and more easily shared with friends to give away games.

## Usage

- Create a bookmark in your browser and name it what you like
- Edit the address field and [paste the copied contents of dist/bookmarklet-loader.js](https://raw.githubusercontent.com/javierjulio/humble-bundle-key-scraper/master/dist/bookmarklet-loader.js)
- Go to [your HumbleBundle Keys page](https://www.humblebundle.com/home/keys) and click the bookmark
- Once parsing is complete, a file named `humble-bundle-keys.json` will be downloaded

Note: the source code is in ES6 only. This will work in Safari 10.1+, Chrome 55+, Firefox 52+ and Edge 15+.

## Development

- Clone the repository
- Run `npm install`

### Todo List

- [ ] update tests to run as ES6
  - https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0
- [ ] consider updates to JSON output
- [ ] use visual elements like a progress bar?
  - use ES6 template strings https://github.com/KDuverge/bookmarklet/blob/master/index.js

### Resources

- https://devhints.io/rollup (cheatsheet)
- https://air.ghost.io/using-rollup-js-to-create-js-modules/ (testing and usage sections)
- https://github.com/skyllo/js-rollup-module
- https://github.com/rollup/rollup-starter-lib
