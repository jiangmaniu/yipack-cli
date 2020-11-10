const path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const configCommon = require("./webpack.config.common.js");
const myConfig = require("./webpack.config.my.js");
const config = merge(configCommon, {
    // optimization: {
    //     minimize: false,
    //     occurrenceOrder: false,
    //     providedExports: false,
    //     concatenateModules: false,
    //     sideEffects: false,
    //     usedExports: false,
    //     namedModules: true,
    //     namedChunks: true,
    // },
    // watchOptions: {
    //     poll: 1000,
    //     aggregateTimeout: 600,
    //     ignored: /node_modules|\.cache/,
    // },
    devServer: {
        quiet: false,
        contentBase: path.join(__dirname, "dist"),
        // clientLogLevel: "silent",
        // stats: "none",
        hot: true,
        publicPath: "/",
    },
    plugins: [
        //
        new Webpack.HotModuleReplacementPlugin(),
    ],
});
module.exports = config;
