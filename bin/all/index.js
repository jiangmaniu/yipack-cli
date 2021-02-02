// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let { merge } = require("webpack-merge");
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
    console.log(chalk.blueBright("yipack all 查看所有命令"));
    console.log("------------------------------");
    console.log(chalk.blueBright("yipack init 初始化通用前端项目模板"));
    console.log("------------------------------");
    console.log(chalk.blueBright("yipack dev 启动开发环境"));
    console.log(chalk.green("yipack dev --env <环境配置文件名称>"));
    console.log(chalk.green("yipack dev --write 编译打包写入硬盘"));
    console.log("------------------------------");
    console.log(chalk.blueBright("yipack build 打包编译项目"));
    console.log(chalk.green("yipack build --env 环境配置文件名称 "));
    console.log(chalk.green("yipack build --analyzer 启动分析模式"));
    console.log("------------------------------");
    console.log(chalk.blueBright("yipack new 创建元素"));
    console.log(chalk.green("yipack new -p,--page <页面名称> 一键新建页面"));
    console.log(chalk.green("yipack new -c,--comp <组件名称> 一键创建组件"));
    console.log(chalk.green("yipack new --sp,--sub-page <子页面名称> 一键创建子页面"));
    console.log(chalk.green("yipack new --sv,--sub-view <子视图名称> 一键创建子视图"));
    console.log("------------------------------");
    console.log(chalk.blueBright("yipack tpl 初始化项目模板"));
    console.log(chalk.green("yipack tpl --type=init 初始化通用前端项目模板"));
    console.log(chalk.green("yipack tpl --type=admin 初始化后台项目模板"));
    console.log(chalk.green("yipack tpl --type=api 初始化接口项目模板"));
    console.log("------------------------------");
    console.log(chalk.blueBright("yipack show 查看项目相关信息"));
    console.log(chalk.green("yipack show --pages 查看所有页面"));
    console.log(chalk.green("yipack show --comps 查看所有全局组件"));
};
