// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let webpack = require("webpack");
let { merge } = require("webpack-merge");
let portfinder = require("portfinder");
let FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
let updateNotifier = require("update-notifier");
let webpackDevServer = require("webpack-dev-server");
let { program } = require("commander");
let shell = require("shelljs");
let { table } = require("table");
let chalk = require("chalk");
let ora = require("ora");
let tool = require("../tool.js");
// 配置相关
let myConfig = require("../../.yipack/webpack.config.my.js");
let yipackPackage = require("../../package.json");
let yipackConfig = require("../../.yipack/yipack.config.js");
module.exports = async function newComp(cmd) {
    let spinner = ora();
    let files = fs.readdirSync(path.resolve(myConfig.srcDir, "comps"));
    files.forEach((item) => {
        console.log(item);
    });
};
