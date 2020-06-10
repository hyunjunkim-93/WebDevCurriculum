'use strict'

const merge = require('webpack-merge');
const friendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const commonConfig = require('./webpack.common.js');

const webpackConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
        quiet: true,
    },
    plugins: [
        new friendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:8080'],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
              },
        }),
    ],
})

module.exports = webpackConfig;
