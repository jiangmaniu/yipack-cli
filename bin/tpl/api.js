// 第三方模块
let fs = require("fs-extra");
let chalk = require("chalk");
let ora = require("ora");
// 配置相关
let myConfig = require("../../.yipack/webpack.config.my.js");
let tool = require("../tool.js");
// 初始化api项目模板
module.exports = async function initApiTemplate() {
    let spinner = ora();
    spinner.start(chalk.green("yima接口开发项目模板下载中..."));
    try {
        let files = fs.readdirSync(myConfig.rootDir);
        if (files.length > 0) {
            spinner.fail(chalk.red("请在空目录下载yima接口开发项目模板"));
            return;
        }
        fs.removeSync(myConfig.tempDir);
        fs.ensureDirSync(myConfig.tempDir);
        await tool.downloadProject("https://gitee.com:banshiweichen/yima#master");
        fs.copySync(myConfig.tempDir, myConfig.rootDir, { overwrite: true });
        fs.removeSync(myConfig.tempDir);
        spinner.succeed(chalk.green("yima接口开发项目模板下载成功"));
    } catch (err) {
        spinner.fail(chalk.red("yima接口开发项目模板下载失败"));
        spinner.stop();
        console.log(err);
    }
};
