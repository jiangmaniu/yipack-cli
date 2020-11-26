#!/usr/bin/env node
// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let download = require("download-git-repo");
let webpack = require("webpack");
let { merge } = require("webpack-merge");
// let getPort = require("get-port");
let getPort = require("get-port-please");
let webpackDevServer = require("webpack-dev-server");
let { program } = require("commander");
let shell = require("shelljs");
// 配置相关
let myConfig = require("../.yipack/webpack.config.my.js");
let tempDir = path.resolve(myConfig.rootDir, "temp");
let initDir = path.resolve(myConfig.rootDir);
let pkg = require("../package.json");
let yipackConfig = require("../.yipack/yipack.config.js");

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
        let port = await getPort();
        let webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.dev.js"));
        // 获取或设置默认的开发环境配置
        if (_.isObject(yipackConfig.devServer) === false) {
            yipackConfig.devServer = {};
        }
        let currentDevServer = {
            host: "127.0.0.1",
            // noInfo: false,
            // contentBase: myConfig.distDir,
            clientLogLevel: "info",
            // quiet: false,
            hot: true,
            inline: true,
            publicPath: "/",
            // compress: true,
            // lazy: false,
            // hotOnly: true,
            // index: "index.html",
            // injectHot: true,
            // liveReload: false,
            // noInfo: false,
            open: false,
            stats: "normal",
            // watchContentBase: false,
        };

        // 合并配置参数
        let devServerConfig = merge(currentDevServer, yipackConfig.devServer);
        // 判断协议类型
        let protocol = devServerConfig.https === true ? "https" : "http";
        // 模块热替换
        webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
        let compiler = webpack(webpackConfig);
        let server = new webpackDevServer(compiler, devServerConfig);
        server.listen(port, devServerConfig.host, () => {
            console.log(`Starting server on ${protocol}://${devServerConfig.host}:${port}`);
        });
    });

program
    //
    .command("lab")
    .description("启动实验环境")
    .action((source) => {
        shell.env["NODE_ENV"] = "development";
        let webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.lab.js"));
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.log(err);
            }
        });
    });

program
    //
    .command("build")
    .option("--analyzer", "打开分析模式", false)
    .description("打包编译项目")
    .action(async (cmd) => {
        shell.env["NODE_ENV"] = "production";
        shell.env["NODE_ANALYZER"] = cmd.analyzer;
        let webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.pro.js"));
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
program
    //
    .command("format")
    .option("-p,--page <name>", "格式化页面")
    .option("-c,--comp <name>", "格式化组件")
    .description("格式化元素")
    .action((cmd) => {
        if (cmd.page) {
            let names = getNames(cmd.page);
            // 创建目录
            let pageDirPath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName);
            let js = require(`vue-loader!${pageDirPath}.vue?vue&type=script`);
            console.log(js);
            // fs.removeSync(pageDirPath);

            console.log("页面元素格式化成功");
            return;
        }
        if (cmd.comp) {
            let names = getNames(cmd.comp);
            // 创建组件
            let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName, "index.vue");
            fs.removeSync(htmlFilePath, htmlFileData);

            console.log("组件元素删除成功");
            return;
        }
    });
program
    //
    .command("doctor")
    .option("-p,--page <name>", "检测页面")
    .option("-c,--comp <name>", "检测组件")
    .description("检查元素")
    .action((cmd) => {
        if (cmd.page) {
            let names = getNames(cmd.page);
            // 创建目录
            let pageDirPath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName);
            let js = require(`vue-loader!${pageDirPath}.vue?vue&type=script`);
            console.log(js);
            // fs.removeSync(pageDirPath);

            console.log("页面元素格式化成功");
            return;
        }
        if (cmd.comp) {
            let names = getNames(cmd.comp);
            // 创建组件
            let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName, "index.vue");
            fs.removeSync(htmlFilePath, htmlFileData);

            console.log("组件元素删除成功");
            return;
        }
        // 目录数组
        console.log("src目录元素检查");
        let dirsArray = ["audio", "comps", "env", "fonts", "images", "layout", "mixin", "pages", "plugins", "router", "static", "styles", "tpls", "videos", "vuex", "App.vue", "main.js"];
        for (let value of dirsArray) {
            let _path = path.resolve(myConfig.rootDir, value);
            if (fs.existsSync(_path) === false) {
                console.log(`${_path}存在`);
            } else {
                console.error(`${_path}不存在`);
            }
        }
    });
program
    //
    .version(pkg.version, "-v, --version", "显示yipack版本")
    .helpOption("-h, --help", "显示帮助信息")
    .helpInformation();
program
    //
    .parse(process.argv);
