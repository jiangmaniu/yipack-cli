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
    parallelism: 1,
    optimization: {
        moduleIds: "named",
        chunkIds: "named",
        // 副作用
        // sideEffects: "flag",
        removeAvailableModules: false,
        removeEmptyChunks: false,
        // 副作用
        sideEffects: true,
        splitChunks: {
            chunks: "all",
            minSize: 1024 * 1024,
            maxAsyncRequests: 5,
            maxInitialRequests: 10,
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    priority: -10,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace("@", "")}`;
                    },
                },
                default: {
                    minChunks: 5,
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
