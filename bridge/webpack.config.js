const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
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
            { parser: { System: false } },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
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
        /^@xura\/emporium$/
    ],
};