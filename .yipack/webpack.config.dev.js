let path = require("path");
let Webpack = require("webpack");
let { merge } = require("webpack-merge");
let configCommon = require("./webpack.config.common.js");
let myConfig = require("./webpack.config.my.js");
let yipackConfig = require("./yipack.config.js");
let shell = require("shelljs");
let currentConfig = {
    // 开发环境开启缓存
    cache: true,
    devtool: "eval-source-map",
    parallelism: 1,
    // 打包发生错误时停止打包
    bail: false,
    optimization: {
        moduleIds: "named",
        chunkIds: "named",
        // 副作用
        // sideEffects: "flag",
        removeAvailableModules: false,
        removeEmptyChunks: false,
        // 副作用
        sideEffects: "flag",
        splitChunks: {
            chunks: "all",
            maxAsyncRequests: 5,
            maxInitialRequests: 10,
            minChunks: 1,
            minSize: 0,
            maxSize: 0,
            maxAsyncSize: 0,
            maxInitialSize: 0,
            // name: (_module, _chunks, cacheGroupKey) => {
            //     return `${cacheGroupKey}`;
            // },
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    priority: -10,
                    reuseExistingChunk: true,
                    name(_module) {
                        let packageName = _module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace("@", "")}`;
                    },
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: "default.vendors",
                },
            },
        },
    },
    // watch: true,
    // 监听文件改动，增量编译
    // watchOptions: {
    // aggregateTimeout: 500,
    // poll: 1000,
    // ignored: /node_modules/,
    // },
    plugins: [
        //
        new Webpack.HotModuleReplacementPlugin(),
    ],
};
let config = merge(configCommon, currentConfig);
module.exports = config;
