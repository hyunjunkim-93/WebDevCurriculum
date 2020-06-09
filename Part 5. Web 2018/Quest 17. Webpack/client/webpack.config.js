'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

const mode = process.env.NODE_ENV || 'development'

const webpackConfig = {
    mode,
    entry: './src/main.js',
    output: {
        filename: 'js/app.[hash].js',
        chunkFilename: 'js/chunk-vendors.[hash].js',
        path: path.resolve(__dirname, './dist'),
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
    resolve: {
        alias: {
            '@': path.join(__dirname, '/src'),
        }
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
        minimizer: mode === 'production'
            ? [
                new OptimizeCssAssetsPlugin(),
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        }
                    }
                })
            ]
            : [],
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
    },
    devtool: 'source-map',
};

module.exports = webpackConfig;
