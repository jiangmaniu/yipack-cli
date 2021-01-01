let path = require("path");
let { merge } = require("webpack-merge");
let { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let configCommon = require("./webpack.config.common.js");
let myConfig = require("./webpack.config.my.js");
let yipackConfig = require("./yipack.config.js");
let currentConfig = {
    // 生产环境禁用缓存
    cache: false,
    parallelism: 100,
    profile: false,
    optimization: {
        // minimize: false,
        // namedModules: true,
        // namedChunks: true,
        moduleIds: "deterministic",
        chunkIds: "deterministic",
        // 会影响webpack性能，默认禁用
        removeAvailableModules: false,
        // 移除空的chunks
        removeEmptyChunks: true,
        // 合并相同模块的chunks
        mergeDuplicateChunks: true,
        // 生成模式优化，其他模式禁用
        flagIncludedChunks: true,
        // 生成模式优化，其他模式禁用
        concatenateModules: true,
        // 生成模式优化，其他模式禁用
        mangleExports: true,
        // 生成模式优化，其他模式禁用
        innerGraph: true,
        // 为export * from 生成更高效的代码
        providedExports: true,
        // 由webpack决定每个模块的导出内容
        usedExports: true,
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
    plugins: [
        //
    ],
};
if (process.env.NODE_ANALYZER === "true") {
    currentConfig.plugins.push(
        new WebpackConfigDumpPlugin({
            outputPath: path.resolve(myConfig.cacheDir),
            name: "webpack.config.dump.js",
            keepCircularReferences: true,
            showFunctionNames: false,
            includeFalseValues: true,
        })
    );
    currentConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            defaultSizes: "parsed",
            generateStatsFile: false,
            openAnalyzer: true,
        })
    );
}
let config = merge(configCommon, currentConfig);
module.exports = config;
