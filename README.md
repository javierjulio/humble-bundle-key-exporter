# HumbleBundle Key Exporter

A bookmarklet to export [your unredeemed HumbleBundle Keys](https://www.humblebundle.com/home/keys) games data into a formatted JSON file for download. The bookmarklet will **not** trigger key redemption or include the actual keys in the JSON. That is intentional. This is meant for personal use.

I've been a HumbleBundle supporter since it first started. Since I have many unredeemed game keys that I won't have any interest in playing or in some cases I already own, I built this tool to export my data into an easy to use file that I can then share with friends to gift them games they'd want.

## Usage

- Create a bookmark in your browser and name it what you like
- Edit the address field and [paste the copied contents of dist/bookmarklet-loader.js](https://raw.githubusercontent.com/javierjulio/humble-bundle-key-exporter/master/dist/bookmarklet-loader.js)
- Go to [your HumbleBundle Keys page](https://www.humblebundle.com/home/keys) and click the bookmark
- Once parsing is complete, a file named `humble-bundle-keys.json` will be downloaded

## Development

- Clone the repository
- Run `npm install` which will also lint and build
- `npm run build` after updating code
- `npm run eslint` to run linter
- `npm run watch`

### Notes & Resources

- add searchable data table for keys https://datatables.net
- display an indeterminate progress bar while parsing
- add integration tests using Playwright with stubbed page content
- Rollup cheatsheet https://devhints.io/rollup
- https://github.com/KDuverge/bookmarklet/blob/master/index.js
