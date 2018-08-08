const utils = require('./_utils')

module.exports = function(_options) {

  const defaults = { folders: ['tasks', 'src', 'test'] }
  const options = Object.assign(defaults, _options)

  return utils.exec('./node_modules/.bin/eslint', options.folders)

}
