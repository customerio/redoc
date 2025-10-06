const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/standalone.tsx',
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'redoc.standalone.js',
    library: 'RedocStandalone',
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
