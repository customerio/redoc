const webpack = require('webpack');

function webpackIgnore(regexp) {
  return new webpack.NormalModuleReplacementPlugin(regexp, require.resolve('lodash.noop'));
}

module.exports = { webpackIgnore };
