// name of the library
// global.library = 'HumbleBundleScraper'

var command = process.argv[2],
  utils   = require('./tasks/_utils'),
  eslint  = require('./tasks/eslint'),
  test    = require('./tasks/test'),
  build   = require('./tasks/build'),
  watch   = require('./tasks/watch')

/**
 * Each task required (except watch) returns a promise so you will be able to chain them as you prefer
 */

switch (command) {
case 'eslint':
case 'lint':
  eslint()
  break
case 'build':
  eslint()
    .then(build)
  break
case 'watch':
  watch()
  break
case 'test':
  test()
  break
default:
  eslint()
    .then(build)
    // .then(test)
    .then(function() {
      utils.print('Project successfully compiled!', 'confirm')
    })
}
