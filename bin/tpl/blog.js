// 第三方模块
let fs = require("fs-extra");
let chalk = require("chalk");
let ora = require("ora");
// 配置相关
let myConfig = require("../../.yipack/webpack.config.my.js");
let tool = require("../tool.js");
// 初始化后台管理模板
module.exports = async function initAdminTemplate() {
    let spinner = ora();
    spinner.start(chalk.green("yiblog项目模板下载中..."));
    try {
        let files = fs.readdirSync(myConfig.rootDir);
        if (files.length > 0) {
            spinner.fail(chalk.red("请在空目录下载yiblog后台项目模板"));
            return;
        }

        fs.removeSync(myConfig.tempDir);
        fs.ensureDirSync(myConfig.tempDir);
        await tool.downloadProject("https://gitee.com:banshiweichen/yiblog#master");
        fs.copySync(myConfig.tempDir, myConfig.rootDir, { overwrite: true });
        fs.removeSync(myConfig.tempDir);
        spinner.succeed(chalk.green("yiblog项目模板下载成功"));
    } catch (err) {
        spinner.fail(chalk.red("yiblog项目模板下载失败"));
        spinner.stop();
        console.log(err);
    }
};
