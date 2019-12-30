import * as webpack from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path'

const { HotModuleReplacementPlugin } = webpack;
const port = 3000;
const context = __dirname + '/src';

interface WebpackEnvironment {
  NODE_ENV: string;
}

module.exports = (env: WebpackEnvironment, argv: { mode: string }) => {
  const appEntryPoints = argv.mode === 'production'
    ? ['./index']
    : [
      'webpack/hot/only-dev-server',
      './index'
    ];

  const config: webpack.Configuration = {
    name: 'client',
    target: 'web',
    context,
    entry: {
      app: appEntryPoints
    },
    output: {
      filename: 'data.js',
      path: path.resolve(__dirname, 'build/data'),
      library: 'data',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devtool: argv.mode === 'production' ? 'source-map' : 'cheap-eval-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
        filename: 'index.html',
        inject: 'body'
      }),
      new HotModuleReplacementPlugin()
    ],
    externals: [
      /^@xura\/components$/
    ]
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
