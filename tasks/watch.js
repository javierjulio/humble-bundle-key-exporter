var utils = require('./_utils')

module.exports = function(options) {

  return utils.exec('./node_modules/.bin/rollup', ['-cw'])

}
