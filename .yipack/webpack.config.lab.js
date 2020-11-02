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
        quiet: true,
        contentBase: path.join(__dirname, "dist"),
        clientLogLevel: "silent",
        stats: "none",
    },
    plugins: [
        //
        new WebpackConfigDumpPlugin({
            outputPath: path.resolve(myConfig.cacheDir),
            name: "webpack.config.dump.js",
            keepCircularReferences: true,
            showFunctionNames: false,
            includeFalseValues: true,
        }),
    ],
});
module.exports = config;
