const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'redoc.lib.js',
    library: 'Redoc',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "http": false
    }
  },
  externals: nodeExternals({
    allowlist: [
      'swagger2openapi',
      'openapi-sampler',
      'json-schema-ref-parser',
      'lunr',
      'marked',
      'prismjs',
      'perfect-scrollbar',
      'stickyfill',
      'url-template',
      'slugify',
      'dompurify',
      'mark.js',
      'memoize-one',
      'polished',
      'classnames',
      'eventemitter3',
      'json-pointer',
      'decko',
      'tslib'
    ]
  }),
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      __REDOC_VERSION__: JSON.stringify(require('./package.json').version),
      __REDOC_REVISION__: JSON.stringify(
        require('child_process').execSync('git rev-parse --short HEAD').toString().trim()
      )
    })
  ]
};
