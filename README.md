# HumbleBundle Key Exporter

A bookmarklet to export [your unredeemed HumbleBundle Keys](https://www.humblebundle.com/home/keys) that will download that data in a formatted JSON file. This is meant for personal use.

I've been a HumbleBundle supporter since it first started. As you might imagine, I have a large number of unredeemed game keys that I won't ever have the time for or am not interested in using. Since the data isn't exportable, this is a tool I created to get that data into an easy to use file so it can be modified and more easily shared with friends.

## Usage

- Create a bookmark in your browser and name it what you like
- Edit the address field and [paste the copied contents of dist/bookmarklet-loader.js](https://raw.githubusercontent.com/javierjulio/humble-bundle-key-exporter/master/dist/bookmarklet-loader.js)
- Go to [your HumbleBundle Keys page](https://www.humblebundle.com/home/keys) and click the bookmark
- Once parsing is complete, a file named `humble-bundle-keys.json` will be downloaded

Note: the bookmarklet code is in ES6 only. This will work in Safari 10.1+, Chrome 55+, Firefox 52+ and Edge 15+.

## Development

- Clone the repository
- Run `yarn install` which will also lint and build
- Make any code changes
- Run `npm run build`

### Notes

- create GitHub Page for project
  - https://help.github.com/articles/user-organization-and-project-pages/
  - add a searchable data table for my own keys (consider trying Vue.js)
    - https://datatables.net
    - https://bootstrap-vue.js.org/docs/components/table/#complete-example
- add integration tests with stubbed page content
  - [use Cypress for E2E](https://www.cypress.io/blog/2019/11/20/drastically-simplify-your-testing-with-cypress-github-action/)
  - [use Playwright for E2E](https://medium.com/@rogger.fernandes10/e2e-tests-integrating-microsoft-playwright-with-mocha-and-chai-cb37016b63c3) and [CI](https://github.com/microsoft/playwright-github-action)
- consider updates to JSON output
- display an indeterminate progress bar while parsing

### Resources

- https://devhints.io/rollup (cheatsheet)
- https://github.com/KDuverge/bookmarklet/blob/master/index.js
