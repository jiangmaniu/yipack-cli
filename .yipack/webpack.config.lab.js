let path = require("path");
let { merge } = require("webpack-merge");
let { WebpackConfigDumpPlugin } = require("webpack-config-dump-plugin");
let configCommon = require("./webpack.config.common.js");
let myConfig = require("./webpack.config.my.js");
let yipackConfig = require("../.yipack/yipack.config.js");
let config = merge(
    configCommon,
    {
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
    },
    yipackConfig.webpack.lab
);
module.exports = config;
