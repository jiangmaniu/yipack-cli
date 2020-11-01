const myConfig = require("../webpack.config.my.js");
module.exports = {
    loader: "babel-loader",
    options: {
        cwd: myConfig.cliDir,
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: "3",
                },
            ],
        ],
        plugins: [
            [
                "@babel/plugin-transform-runtime",
                {
                    absoluteRuntime: false,
                    corejs: 3,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                },
            ],
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-proposal-nullish-coalescing-operator",
        ],
    },
};
