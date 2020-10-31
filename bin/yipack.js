#!/usr/bin/env node

const download = require("download-git-repo");
const webpack = require("webpack");
const fs = require("fs-extra");
const path = require("path");
const tempDir = path.resolve(process.cwd(), "temp");
const initDir = path.resolve(process.cwd());
const { program } = require("commander");
const shell = require("shelljs");
const myConfig = require("../.yipack/webpack.config.my.js");
program
    //
    .version("0.0.1", "-v, --version", "显示yipack版本")
    .helpOption("-h, --help", "显示帮助信息")
    .helpInformation();
program
    //
    .command("dev")
    .description("启动开发环境")
    .action((source) => {
        const webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.lab.js"));
        webpack(webpackConfig, (err, stats) => {
            console.log(err);
            console.log(stats.errors);
        });
    });
program
    //
    .command("lab")
    .description("启动实验环境")
    .action((source) => {
        // shell.cd(path.resolve(__dirname));
        shell.env["NODE_ENV"] = "development";
        const webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.lab.js"));
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.log(err);
            } else {
                console.log(stats);
            }
        });
    });
program
    //
    .command("build")
    .description("打包编译项目")
    .action((source) => {
        const webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.lab.js"));
        webpack(webpackConfig, (err, stats) => {
            console.log(err);
            console.log(stats.errors);
        });
    });
program
    //
    .parse(process.argv);
// 下载项目
async function downloadProject() {
    return new Promise((resolve, reject) => {
        download("https://gitee.com:banshiweichen/yipack#master", tempDir, { clone: true }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function init() {
    try {
        fs.removeSync(tempDir);
        fs.ensureDirSync(tempDir);
        await downloadProject();
        fs.copySync(tempDir, initDir, { overwrite: true });
        fs.removeSync(tempDir);
        console.log("易打包下载成功");
    } catch (err) {
        console.log("易打包下载失败");
        console.log(err);
    }
}
