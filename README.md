# HumbleBundle Key Scraper

A bookmarklet to scrape [your HumbleBundle Keys page](https://www.humblebundle.com/home/keys) for unredeemed keys that once parsed will download that data in a formatted JSON file. This is meant for personal use.

I've been a HumbleBundle supporter since it first started. As you might imagine, I have a large number of unredeemed game keys that I won't ever have the time for or am not interested in using. Since the data isn't exportable, this is a tool I created to get that data into an easy to use file so it can be modified and more easily shared with friends.

## Usage

- Create a bookmark in your browser and name it what you like
- Edit the address field and [paste the copied contents of dist/bookmarklet-loader.js](https://raw.githubusercontent.com/javierjulio/humble-bundle-key-scraper/master/dist/bookmarklet-loader.js)
- Go to [your HumbleBundle Keys page](https://www.humblebundle.com/home/keys) and click the bookmark
- Once parsing is complete, a file named `humble-bundle-keys.json` will be downloaded

Note: the bookmarklet code is in ES6 only. This will work in Safari 10.1+, Chrome 55+, Firefox 52+ and Edge 15+.

## Development

- Clone the repository
- Run `npm install`, once finished will lint and build

### Todo List

- [ ] create GitHub Page for project
  - https://getbootstrap.com/docs/4.1/getting-started/build-tools/#tooling-setup
  - consider trying out Parcel https://parceljs.org
  - add a searchable data table for my own keys (consider trying Vue.js)
    - https://datatables.net
    - http://allenfang.github.io/react-bootstrap-table/start.html
    - https://bootstrap-vue.js.org/docs/components/table
- [ ] create project for PlayStation Downloads exporter (Untitled-2.js)
  - use modal to ask what platform(s) are collected
  - consider building an app to accept that exported JSON to search
- [ ] update tests to run as ES6 ([possible example using mocha](https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0))
- [ ] consider updates to JSON output
- [ ] use visual elements like a progress bar?
  - use ES6 template strings https://github.com/KDuverge/bookmarklet/blob/master/index.js

### Resources

- https://michael-kuehnel.de/tooling/2018/03/22/helpers-and-tips-for-npm-run-scripts.html
- https://devhints.io/rollup (cheatsheet)
- https://air.ghost.io/using-rollup-js-to-create-js-modules/ (testing and usage sections)
- https://github.com/skyllo/js-rollup-module
- https://github.com/rollup/rollup-starter-lib
