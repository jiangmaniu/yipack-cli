#!/usr/bin/env node
const myConfig = require("../.yipack/webpack.config.my.js");
const figletFont = require("../.yipack/fonts/Epic.js");
const download = require("download-git-repo");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackDevServer = require("webpack-dev-server");
const fs = require("fs-extra");
const path = require("path");
const getPort = require("get-port");
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

function getNames(name) {
    // 页面名称转化 HelL_o-wOrld
    let lowerCaseName = _.toLower(name); // hell_o-world
    let kebabCaseName = _.kebabCase(lowerCaseName); // hell-o-world
    let camelCaseName = _.camelCase(kebabCaseName); // hellOWorld
    let startCaseName = _.replace(_.startCase(camelCaseName), /\s+/g, ""); // HellOWorld

    return {
        lowerCaseName,
        kebabCaseName,
        startCaseName,
        camelCaseName,
    };
}
program.name("yipack").usage("[command] [options]");
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
    .action(async (source) => {
        shell.env["NODE_ENV"] = "development";
        let port = await getPort({ port: getPort.makeRange(8000, 9000) });
        let webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.dev.js"));
        let devServerConfig = merge(webpackConfig.devServer, {
            noInfo: true,
            clientLogLevel: "silent",
            quiet: true,
        });
        let compiler = webpack(webpackConfig);
        let server = new webpackDevServer(compiler, devServerConfig);
        server.listen(port, "127.0.0.1", () => {
            console.log(`Starting server on http://127.0.0.1:${port}`);
        });
    });

program
    //
    .command("lab")
    .description("启动实验环境")
    .action((source) => {
        shell.env["NODE_ENV"] = "development";
        const webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.lab.js"));
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.log(err);
            }
        });
    });

program
    //
    .command("build")
    .description("打包编译项目")
    .action(async (source) => {
        shell.env["NODE_ENV"] = "production";
        const webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.pro.js"));
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.log(err);
            }
        });
    });
program
    //
    .command("new")
    .option("-p,--page <name>", "创建页面")
    .option("-c,--comp <name>", "创建组件")
    .description("创建元素")
    .action((cmd) => {
        if (cmd.page) {
            let names = getNames(cmd.page);
            // 创建目录
            let pageDirPath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName);
            fs.ensureDirSync(pageDirPath);

            // 创建图片目录
            let imageDirPath = path.resolve(myConfig.srcDir, "images", names.camelCaseName);
            fs.ensureDirSync(imageDirPath);

            // 创建页面
            let htmlFilePath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName, "index.vue");
            let htmlFileData = _.template(require("../.yipack/page/html.js"))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);

            // 创建路由
            let routeFilePath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName, "route.js");
            let routeFileData = _.template(require("../.yipack/page/route.js"))(names);
            fs.outputFileSync(routeFilePath, routeFileData);

            console.log("页面元素创建成功");
            return;
        }
        if (cmd.comp) {
            let names = getNames(cmd.comp);
            // 创建组件
            let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName, "index.vue");
            let htmlFileData = _.template(require("../.yipack/comp/html.js"))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);

            console.log("组件元素创建成功");
            return;
        }
    });
program
    //
    .command("del")
    .option("-p,--page <name>", "删除页面")
    .option("-c,--comp <name>", "删除组件")
    .description("删除元素")
    .action((cmd) => {
        if (cmd.page) {
            let names = getNames(cmd.page);
            // 创建目录
            let pageDirPath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName);
            fs.removeSync(pageDirPath);

            console.log("页面元素删除成功");
            return;
        }
        if (cmd.comp) {
            let names = getNames(cmd.comp);
            // 创建组件
            let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName);
            fs.removeSync(htmlFilePath);

            console.log("组件元素删除成功");
            return;
        }
    });
// program
//     //
//     .command("format")
//     .option("-p,--page <name>", "格式化页面")
//     .option("-c,--comp <name>", "格式化组件")
//     .description("格式化元素")
//     .action((cmd) => {
//         if (cmd.page) {
//             let names = getNames(cmd.page);
//             // 创建目录
//             let pageDirPath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName);
//             let js = require(`vue-loader!${pageDirPath}.vue?vue&type=script`);
//             console.log(js);
//             // fs.removeSync(pageDirPath);

//             console.log("页面元素格式化成功");
//             return;
//         }
//         if (cmd.comp) {
//             let names = getNames(cmd.comp);
//             // 创建组件
//             let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName, "index.vue");
//             fs.removeSync(htmlFilePath, htmlFileData);

//             console.log("组件元素删除成功");
//             return;
//         }
//     });
program
    //
    .version("0.0.1", "-v, --version", "显示yipack版本")
    .helpOption("-h, --help", "显示帮助信息")
    .helpInformation();
program
    //
    .parse(process.argv);
