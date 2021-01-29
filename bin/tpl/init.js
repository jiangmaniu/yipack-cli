// 第三方模块
let fs = require("fs-extra");
let chalk = require("chalk");
let ora = require("ora");
// 配置相关
let myConfig = require("../../.yipack/webpack.config.my.js");
let tool = require("../tool.js");

// 初始化yipack开发模板
module.exports = async function initYipackTemplate() {
    let spinner = ora();
    spinner.start(chalk.green("yipack模板下载中..."));
    try {
        fs.removeSync(myConfig.tempDir);
        fs.ensureDirSync(myConfig.tempDir);
        await tool.downloadProject("https://gitee.com:banshiweichen/yipack-template#master");
        fs.copySync(myConfig.tempDir, myConfig.rootDir, { overwrite: true });
        fs.removeSync(myConfig.tempDir);
        spinner.succeed(chalk.green("yipack模板下载成功"));
    } catch (err) {
        spinner.fail(chalk.red("yipack模板下载失败"));
        spinner.stop();
        console.log(err);
    }
};
