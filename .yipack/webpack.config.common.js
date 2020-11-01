const path = require("path");
const Webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
const myConfig = require("./webpack.config.my.js");
/**
 * loader配置文件
 */
const _loaderPostCssConfig = require("./loader/postcss-loader.config.js");
const _loaderBabelConfig = require("./loader/babel-loader.config.js");
const _loaderCssConfig = require("./loader/css-loader.config.js");
const _loaderSassResourcesConfig = require("./loader/sass-resources-loader.config.js");
const _loaderSassConfig = require("./loader/sass-loader.config.js");
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : "none",
    entry: path.resolve(myConfig.srcDir, "main.js"),
    output: {
        path: myConfig.distDir,
        filename: "js/[name].js",
        publicPath: "./",
    },
    stats: "errors-warnings",
    cache: true,
    resolve: {
        alias: {
            "@src": myConfig.srcDir,
            "@static": path.resolve(myConfig.srcDir, "static"),
        },
        modules: [
            //
            path.resolve(myConfig.cliDir, "node_modules"),
            path.resolve(__dirname, "node_modules"),
            "node_modules",
        ],
    },
    resolveLoader: {
        modules: [
            //
            path.resolve(myConfig.cliDir, ".yipack"),
            path.resolve(myConfig.cliDir, "node_modules"),
            "node_modules",
        ],
    },
    // externals: {
    //     jquery: "$",
    // },
    // node: {
    //     fs: "empty",
    // },
    // performance: {
    //     maxEntrypointSize: 1024 * 1024,
    //     maxAssetSize: 1024 * 1024,
    // },
    optimization: {
        // 运行时
        // runtimeChunk: {
        //     name: "runtime",
        // },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //
                    {
                        loader: myConfig.nodeEnv === "development" ? "vue-style-loader" : MiniCssExtractPlugin.loader,
                    },
                    _loaderCssConfig,
                    _loaderPostCssConfig,
                ],
                sideEffects: true,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: myConfig.nodeEnv === "development" ? "vue-style-loader" : MiniCssExtractPlugin.loader,
                    },
                    _loaderCssConfig,
                    _loaderPostCssConfig,
                    _loaderSassConfig,
                    _loaderSassResourcesConfig,
                ],
                sideEffects: true,
            },
            {
                test: /\.js$/,
                use: [_loaderBabelConfig],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1000,
                        name: "[hash:7].[ext]",
                        outputPath: "assets",
                        esModule: false,
                    },
                },
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            //     use: {
            //         loader: "url-loader",
            //         options: {
            //             limit: 1000,
            //             name: "[hash:7].[ext]",
            //             outputPath: "fonts",
            //             esModule: false,
            //         },
            //     },
            //     exclude: /node_modules/,
            // },
            // {
            //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
            //     use: {
            //         loader: "url-loader",
            //         options: {
            //             limit: 1000,
            //             name: "[hash:7].[ext]",
            //             outputPath: "video",
            //             esModule: false,
            //         },
            //     },
            //     exclude: /node_modules/,
            // },
        ],
    },
    plugins: [
        //
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(myConfig.srcDir, "static"),
                    to: path.resolve(myConfig.distDir, "static"),
                    cacheTransform: true,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            // hmr: myConfig.nodeEnv === "development",
            // reloadAll: myConfig.nodeEnv === "development",
        }),
        // new Dotenv({
        //     path: myConfig.srcDir + '/env/' + myConfig.nodeEnv + '.env'
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(myConfig.srcDir, "tpls", "index.html"),
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin({}),
        // new Webpack.ProvidePlugin({
        //     _: 'lodash'
        // })
    ],
};
