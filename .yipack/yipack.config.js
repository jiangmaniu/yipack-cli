// 自带模块
let path = require("path");
let fs = require("fs-extra");
let _ = require("lodash");
let myConfig = require("../.yipack/webpack.config.my.js");
let yipackConfigPath = path.resolve(myConfig.rootDir, "yipack.config.js");
let yipackConfig = {};
if (fs.existsSync(yipackConfigPath)) {
    let yipackConfig2 = require(yipackConfigPath);
    if (_.isObject(yipackConfig2)) {
        yipackConfig = yipackConfig2;
    }
    if (_.isObject(yipackConfig.providePlugin) === false) {
        yipackConfig.providePlugin = {};
    }
    if (_.isObject(yipackConfig.webpack) === false || _.isObject(yipackConfig.webpack.common) === false) {
        yipackConfig.webpack.common = {};
    }
    if (_.isObject(yipackConfig.webpack) === false || _.isObject(yipackConfig.webpack.dev) === false) {
        yipackConfig.webpack.dev = {};
    }
    if (_.isObject(yipackConfig.webpack) === false || _.isObject(yipackConfig.webpack.pro) === false) {
        yipackConfig.webpack.pro = {};
    }
    if (_.isObject(yipackConfig.webpack) === false || _.isObject(yipackConfig.webpack.lab) === false) {
        yipackConfig.webpack.lab = {};
    }
}
module.exports = yipackConfig;
