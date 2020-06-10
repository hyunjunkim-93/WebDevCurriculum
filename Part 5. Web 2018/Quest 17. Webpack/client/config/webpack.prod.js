'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const commonConfig = require('./webpack.common.js');

const webpackConfig = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: 'js/app.[hash].js',
        chunkFilename: 'js/chunk-vendors.[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/app.[hash].css',
            chunkFilename: 'css/chunk-vendors.[hash].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({}),
        new CopyPlugin({
            patterns: [
                {
                    from: './node_modules/axios/dist/axios.min.js',
                    to: './js/axios.min.js'
                },
            ],
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    devtool: 'source-map',
});

module.exports = webpackConfig;
