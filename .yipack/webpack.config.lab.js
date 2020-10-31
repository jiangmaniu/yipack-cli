const path = require("path");
const { merge } = require("webpack-merge");
const { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");
const configCommon = require("./webpack.config.common.js");
const myConfig = require("./webpack.config.my.js");
console.log("process.cwd()");
console.log(process.cwd());
console.log("process.env.NODE_ENV");
console.log(process.env.NODE_ENV);
const config = merge(configCommon, {
    mode: "development",
    devtool: "inline-cheap-source-map",
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
    plugins: [
        //
        new WebpackConfigDumpPlugin({
            outputPath: path.resolve(myConfig.webpackDir),
            name: "webpack.config.dump.js",
            depth: 10,
            // keepCircularReferences: true,
        }),
    ],
});
module.exports = config;
