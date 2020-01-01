import * as webpack from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path'

const { HotModuleReplacementPlugin } = webpack;
const port = 3000;
const context = __dirname + '/src';

interface WebpackEnvironment {
  NODE_ENV: string;
}

module.exports = (env: WebpackEnvironment, argv: { mode: string }) => {

  const config: webpack.Configuration = {
    name: 'client',
    target: 'web',
    entry: {
      app: path.resolve(__dirname, './src/index.tsx')
    },
    output: {
      filename: 'solo.js',
      path: path.resolve(__dirname, 'build/solo'),
      library: 'solo',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    },
    devtool: argv.mode === 'production' ? 'source-map' : 'cheap-eval-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ],
              presets: [
                "preact",
                '@babel/preset-env',
                ['@babel/preset-typescript', { jsxPragma: "h" }]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/sql.js/dist/sql-wasm.js' },
        { from: 'node_modules/sql.js/dist/sql-wasm.wasm' }
      ]),
      new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
        result.request = result.request.replace(/typeorm/, "typeorm/browser");
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        hash: true,
        filename: 'index.html',
        inject: 'body'
      }),
      new HotModuleReplacementPlugin()
    ],
    externals: [
      /^@xura\/components$/,
      /^@xura\/data$/
    ],
  };

  if (argv.mode === 'development') {
    config.devServer = {
      contentBase: join(__dirname, 'dist'),
      compress: true,
      port: 9000
    };
  }

  return config;
};
