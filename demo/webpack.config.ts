import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

function webpackIgnore(regexp) {
  return new webpack.NormalModuleReplacementPlugin(regexp, 'lodash.noop');
}

const VERSION = JSON.stringify('2.5.1');
const REVISION = JSON.stringify('main');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function root(filename) {
  return resolve(__dirname + '/' + filename);
}

export default (env: { playground?: boolean; bench?: boolean } = {}) => ({
  entry: [
    root('../src/polyfills.ts'),
    root(
      env.playground
        ? 'playground/hmr-playground.tsx'
        : env.bench
        ? '../benchmark/index.tsx'
        : 'index.tsx',
    ),
  ],
  target: 'web',
  output: {
    filename: 'redoc-demo.bundle.js',
    path: root('dist'),
    globalObject: 'this',
  },

  devServer: {
    static: __dirname,
    port: 9090,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
  stats: {
    children: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      path: 'path-browserify',
      buffer: 'buffer',
      http: false,
      fs: false,
      os: false,
    },
  },

  performance: false,

  externals: {
    esprima: 'esprima',
    'node-fetch': 'null',
    'node-fetch-h2': 'null',
    yaml: 'null',
    'safe-json-stringify': 'null',
  },

  module: {
    rules: [
      { test: [/\.eot$/, /\.gif$/, /\.woff$/, /\.svg$/, /\.ttf$/], use: 'null-loader' },
      {
        test: /\.(tsx?|[cm]?js)$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
          tsconfigRaw: {
            compilerOptions: {
              experimentalDecorators: true,
              moduleResolution: 'node',
              target: 'es5',
              noImplicitAny: false,
              noUnusedParameters: true,
              noUnusedLocals: true,
              strictNullChecks: true,
              sourceMap: true,
              declaration: true,
              noEmitHelpers: true,
              importHelpers: true,
              outDir: 'lib',
              pretty: true,
              lib: ['es2015', 'es2016', 'es2017', 'dom', 'WebWorker.ImportScripts'],
              jsx: 'react',
              types: ['webpack', 'webpack-env', 'jest'],
            },
            compileOnSave: false,
            exclude: ['node_modules', '.tmp', 'lib', 'e2e/**'],
            include: [
              './custom.d.ts',
              './demo/playground/hmr-playground.tsx',
              './src/**/*.ts?',
              'demo/*.tsx',
              'src/empty.js',
            ],
          },
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              minify: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __REDOC_VERSION__: VERSION,
      __REDOC_REVISION__: REVISION,
      'process.env': '{}',
      'process.platform': '"browser"',
      'process.stdout': 'null',
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: env.playground
        ? 'demo/playground/index.html'
        : env.bench
        ? 'benchmark/index.html'
        : 'demo/index.html',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new ForkTsCheckerWebpackPlugin({ logger: { infrastructure: 'silent', issues: 'console' } }),
    webpackIgnore(/js-yaml\/dumper\.js$/),
    webpackIgnore(/json-schema-ref-parser\/lib\/dereference\.js/),
    webpackIgnore(/^\.\/SearchWorker\.worker$/),
    new CopyWebpackPlugin({
      patterns: ['demo/museum.yaml'],
    }),
  ],
});
