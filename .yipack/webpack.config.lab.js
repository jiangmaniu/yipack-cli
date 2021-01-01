let path = require("path");
let { merge } = require("webpack-merge");
let { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let configCommon = require("./webpack.config.common.js");
let myConfig = require("./webpack.config.my.js");
let yipackConfig = require("./yipack.config.js");
let currentConfig = {
    devtool: "eval-source-map",
    optimization: {
        moduleIds: "named",
        chunkIds: "named",
        // 副作用
        sideEffects: "flag",
    },
    // 限制并行处理的模块数量。可以用于调优性能或获取更可靠的性能分析结果
    parallelism: 100,
    profile: true,
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
let config = merge(configCommon, currentConfig);
module.exports = config;
