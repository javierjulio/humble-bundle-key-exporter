var utils = require('./_utils')//,
  // rollup = require( 'rollup' )

module.exports = function(options) {

  // delete the old ./dist folder
  // utils.clean('./dist')

  return utils.exec('./node_modules/.bin/rollup', ['-c'])

}
