const path = require("path");
const { merge } = require("webpack-merge");
const { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");
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
        contentBase: path.join(__dirname, "dist"),
        clientLogLevel: "debug",
        port: 9000,
    },
    plugins: [
        //
        new WebpackConfigDumpPlugin({
            outputPath: path.resolve(myConfig.cacheDir),
            name: "webpack.config.dump.js",
            depth: 10,
            // keepCircularReferences: true,
        }),
    ],
});
module.exports = config;
