const myConfig = require("../webpack.config.my.js");
const autoprefixer = require("autoprefixer");
module.exports = {
    loader: "postcss-loader",
    options: {
        sourceMap: process.env.NODE_ENV === "development" ? true : false,
        postcssOptions: {
            plugins: [
                //
                autoprefixer(),
                [
                    "postcss-px-to-viewport",
                    {
                        unitToConvert: "px",
                        viewportWidth: 750,
                        unitPrecision: 5,
                        propList: ["*"],
                        viewportUnit: "vw",
                        fontViewportUnit: "vw",
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: [],
                        landscape: false,
                        landscapeUnit: "vw",
                        landscapeWidth: 568,
                    },
                ],
            ],
        },
    },
};
