let myConfig = require("../webpack.config.my.js");
let yipackConfig = require("../yipack.config.js");
let autoprefixer = require("autoprefixer");
let postcssPlugin = [autoprefixer()];
if (yipackConfig.px2viewport && yipackConfig.px2viewport.enable === true) {
    postcssPlugin.push([
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
    ]);
}
module.exports = {
    loader: "postcss-loader",
    options: {
        sourceMap: process.env.NODE_ENV === "development" ? true : false,
        postcssOptions: {
            plugins: postcssPlugin,
        },
    },
};
