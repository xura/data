const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'data.js',
        path: path.resolve(__dirname, 'build/data'),
        library: 'data',
        libraryTarget: 'umd'
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            'babel-plugin-transform-typescript-metadata',
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            '@babel/plugin-proposal-class-properties'
                        ],
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-typescript', { jsxPragma: "h" }]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        }),
        new CopyPlugin([
            { from: 'node_modules/sql.js/dist/sql-wasm.wasm' }
        ]),
    ],
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    devtool: 'source-map',
    externals: [
        /^rxjs$/,
        /^@xura\/emporium$/,
        /^@xura\/components$/
    ],
};