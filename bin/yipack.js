#!/usr/bin/env node
const myConfig = require("../.yipack/webpack.config.my.js");
const figletFont = require("../.yipack/fonts/Epic.js");
const download = require("download-git-repo");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const fs = require("fs-extra");
const path = require("path");
const tempDir = path.resolve(myConfig.rootDir, "temp");
const initDir = path.resolve(myConfig.rootDir);
const _ = require("lodash");
const { program } = require("commander");
const shell = require("shelljs");
const figlet = require("figlet");

figlet.parseFont("figletFont", figletFont);

const pkg = require("../package.json");
// 下载项目
async function downloadProject() {
    return new Promise((resolve, reject) => {
        download("https://gitee.com:banshiweichen/yipack-template#master", tempDir, { clone: true }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
// 初始化项目
async function init() {
    try {
        fs.removeSync(tempDir);
        fs.ensureDirSync(tempDir);
        await downloadProject();
        fs.copySync(tempDir, initDir, { overwrite: true });
        fs.removeSync(tempDir);
        console.log("yipack模板下载成功");
    } catch (err) {
        console.log("yipack模板下载失败");
        console.log(err);
    }
}
program
    //
    .version("0.0.1", "-v, --version", "显示yipack版本");
program
    //
    .command("init")
    .description("创建项目和结构")
    .action(async (source) => {
        await init();
    });

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
            }
        });
        // let server = new webpackDevServer(compiler, {});
        // server.listen(9000, "127.0.0.1", () => {
        //     console.log("Starting server on http://localhost:8080");
        // });
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
    .command("new-page")
    .arguments("<页面名称>", "页面名称")
    .description("创建页面元素")
    .action((pageName) => {
        // 页面名称转化
        let lowerCaseName = _.toLower(pageName);
        // console.log(lowerCaseName);
        let kebabCaseName = _.kebabCase(lowerCaseName);
        // console.log(kebabCaseName);
        let camelCaseName = _.camelCase(kebabCaseName);
        // console.log(camelCaseName);
        let startCaseName = _.replace(_.startCase(camelCaseName), /\s+/g, "");
        // console.log(startCaseName);

        let paramsName = {
            lowerCaseName,
            kebabCaseName,
            startCaseName,
            camelCaseName,
        };
        // 页面目录路径
        let dirPath = path.resolve(myConfig.srcDir, "pages", camelCaseName);
        if (fs.existsSync(dirPath)) {
            console.log(`pages/${camelCaseName} 页面目录已存在`);
            return;
        }
        // 页面文件路径
        let htmlFilePath = path.resolve(myConfig.srcDir, "pages", camelCaseName, "index.vue");
        if (fs.existsSync(htmlFilePath)) {
            console.log(`pages/${camelCaseName}/index.vue 页面模板已存在`);
            return;
        }
        // 页面路由路径
        let routePath = path.resolve(myConfig.srcDir, "pages", camelCaseName, "route.js");
        if (fs.existsSync(routePath)) {
            console.log(`pages/${camelCaseName}/route.js 页面路由已存在`);
            return;
        }

        // 页面模板字符
        let htmlStrings = require("../.yipack/page/html.js");
        // 页面编译器
        let htmlCompile = _.template(htmlStrings);
        // 页面源码
        let htmlText = htmlCompile(paramsName);
        // 创建页面目录
        let resDir = fs.mkdirSync(dirPath, { recursive: true });
        if (resDir) {
            console.log(resDir);
            return;
        }
        // 创建页面文件
        let resHtml = fs.writeFileSync(htmlFilePath, htmlText);
        if (resHtml) {
            console.log(resHtml);
            return;
        }

        // 路由模板字符
        let routeStrings = require("../.yipack/page/route.js");
        // 路由编译器
        let routeCompile = _.template(routeStrings);
        // 路由源码
        let routeText = routeCompile(paramsName);
        // 创建路由文件
        let resRoute = fs.writeFileSync(routePath, routeText);
        if (resRoute) {
            console.log(resRoute);
            return;
        }
        console.log("页面元素创建成功");
    });

program
    //
    .command("new-comp")
    .arguments("<组件名称>", "组件名称")
    .description("创建全局组件元素")
    .action((compName) => {
        // 页面名称转化
        let lowerCaseName = _.toLower(compName);
        let kebabCaseName = _.kebabCase(lowerCaseName);
        let camelCaseName = _.camelCase(kebabCaseName);
        let startCaseName = _.replace(_.startCase(camelCaseName), /\s+/g, "");

        let paramsName = {
            lowerCaseName,
            kebabCaseName,
            startCaseName,
            camelCaseName,
        };
        // 页面目录路径
        let dirPath = path.resolve(myConfig.srcDir, "comps", camelCaseName);
        if (fs.existsSync(dirPath)) {
            console.log(`comps/${camelCaseName} 组件目录已存在`);
            return;
        }
        // 页面文件路径
        let htmlFilePath = path.resolve(myConfig.srcDir, "comps", camelCaseName, "index.vue");
        if (fs.existsSync(htmlFilePath)) {
            console.log(`comps/${camelCaseName}/index.vue 组件模板已存在`);
            return;
        }

        // 组件模板字符
        let htmlStrings = require("../.yipack/comp/html.js");
        // 组件编译器
        let htmlCompile = _.template(htmlStrings);
        // 组件源码
        let htmlText = htmlCompile(paramsName);
        // 创建组件目录
        let resDir = fs.mkdirSync(dirPath, { recursive: true });
        if (resDir) {
            console.log(resDir);
            return;
        }
        // 创建组件文件
        let resHtml = fs.writeFileSync(htmlFilePath, htmlText);
        if (resHtml) {
            console.log(resHtml);
            return;
        }

        console.log("组件元素创建成功");
    });

program
    //
    .helpOption("-h, --help", "显示帮助信息")
    .helpInformation((info) => {
        // console.log("ddddddd");
        // let text = "YIPACK - " + pkg.version;
        // figlet(
        //     text,
        //     {
        //         font: "figletFont",
        //         horizontalLayout: "default",
        //         verticalLayout: "default",
        //         width: 200,
        //         whitespaceBreak: false,
        //     },
        //     function(err, data) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log(data);
        //         }
        //     }
        // );
        // return info;
    });
program
    //
    .parse(process.argv);
