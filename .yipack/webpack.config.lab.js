let path = require("path");
let { merge } = require("webpack-merge");
let { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let configCommon = require("./webpack.config.common.js");
let myConfig = require("./webpack.config.my.js");
let yipackConfig = require("../.yipack/yipack.config.js");
let currentConfig = {
    devtool: "eval-source-map",
    optimization: {
        moduleIds: "named",
        chunkIds: "named",
        // 副作用
        sideEffects: "flag",
    },
    devServer: {
        quiet: false,
        contentBase: myConfig.distDir,
        clientLogLevel: "silent",
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
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            defaultSizes: "parsed",
            generateStatsFile: false,
            openAnalyzer: true,
        }),
    ],
};
let config = merge(configCommon, currentConfig, yipackConfig.webpack.lab);
module.exports = config;
