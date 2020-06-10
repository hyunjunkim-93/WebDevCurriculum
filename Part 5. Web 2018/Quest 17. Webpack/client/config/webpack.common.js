'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const webpackConfig = {
    entry: './src/main.js',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'development'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV === 'development'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/dist/',
                            name: '[name].[ext]?[hash]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                BASE_URL: '/',
            },
        }),
    ],
}

module.exports = webpackConfig;
