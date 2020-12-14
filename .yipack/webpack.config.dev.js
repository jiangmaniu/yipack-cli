let path = require("path");
let Webpack = require("webpack");
let { merge } = require("webpack-merge");
let configCommon = require("./webpack.config.common.js");
let myConfig = require("./webpack.config.my.js");
let yipackConfig = require("./yipack.config.js");
let currentConfig = {
    // 开发环境开启缓存
    cache: true,
    devtool: "eval-source-map",

    optimization: {
        moduleIds: "named",
        chunkIds: "named",
        // 副作用
        // sideEffects: "flag",
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    watch: true,
    // 监听文件改动，增量编译
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/,
    },
    plugins: [
        //
        new Webpack.HotModuleReplacementPlugin(),
    ],
};
let config = merge(configCommon, currentConfig, yipackConfig.webpack.dev);
module.exports = config;
