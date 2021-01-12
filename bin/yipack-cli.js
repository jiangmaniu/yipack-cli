#!/usr/bin/env node
// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let download = require("download-git-repo");
let webpack = require("webpack");
let { merge } = require("webpack-merge");
let portfinder = require("portfinder");
let FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
let updateNotifier = require("update-notifier");
// let vueTemplateCompiler = require("vue-template-compiler");
// let vueCompilerSfc = require("@vue/compiler-sfc");
// let vueLoader = require("vue-loader");
let webpackDevServer = require("webpack-dev-server");
let { program } = require("commander");
let shell = require("shelljs");
// 配置相关
let myConfig = require("../.yipack/webpack.config.my.js");
let yipackPackage = require("../package.json");
let yipackConfig = require("../.yipack/yipack.config.js");

// 下载项目
async function downloadProject() {
    return new Promise((resolve, reject) => {
        download("https://gitee.com:banshiweichen/yipack-template#master", myConfig.tempDir, { clone: true }, function(err) {
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
        fs.removeSync(myConfig.tempDir);
        fs.ensureDirSync(myConfig.tempDir);
        await downloadProject();
        fs.copySync(myConfig.tempDir, myConfig.rootDir, { overwrite: true });
        fs.removeSync(myConfig.tempDir);
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
program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .name("yipack")
    .usage("[命令] [参数]");
program
    //
    .command("init")
    .description("创建项目和结构")
    .action(async (cmd) => {
        await init();
    });

// dev
program
    .command("dev")
    .option("--env <name>", "环境配置文件", "")
    .description("启动开发环境")
    .action(async (cmd) => {
        shell.env["NODE_MODE"] = "development";
        shell.env["NODE_ENV"] = cmd.env;
        shell.env["NODE_COUNT"] = "start";
        updateNotifier({ pkg: yipackPackage }).notify();
        let webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.dev.js"));
        let currentDevServer = {
            host: "127.0.0.1",
            // noInfo: false,
            contentBase: myConfig.distDir,
            clientLogLevel: "debug",
            quiet: false,
            hot: true,
            inline: true,
            publicPath: "/",
            compress: true,
            // lazy: false,
            hotOnly: true,
            // 全屏显示错误
            overlay: false,
            index: "index.html",
            injectHot: true,
            liveReload: false,
            // noInfo: false,
            open: false,
            // stats: "normal",
            stats: "errors-warnings",
            // watchContentBase: false,
            writeToDisk: true,
        };
        // 获取端口
        let port = await portfinder.getPortPromise({ port: 8000, stopPort: 9000 });
        port = yipackConfig.devServer.port || port;
        // 合并开发服务配置参数
        let devServerConfig = merge(currentDevServer, yipackConfig.devServer);
        // 判断协议类型
        let protocol = devServerConfig.https === true ? "https" : "http";
        webpackConfig.plugins.push(
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`应用已启动：${protocol}://${devServerConfig.host}:${port}`],
                    notes: ["yipack-cli脚手架使用文档请访问域名 [ chensuiyi.com ]"],
                },
                // onErrors: (severity, errors) => {
                //     console.log("=======");
                //     console.log(severity);
                //     console.log(errors);
                // },
            })
        );

        // 模块热替换
        webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
        let compiler = webpack(webpackConfig);
        let server = new webpackDevServer(compiler, devServerConfig);

        server.listen(port, devServerConfig.host, () => {
            // console.log(`开发环境已启动：${protocol}://${devServerConfig.host}:${port}`);
        });
    });

// build
program
    .command("build")
    .option("--env <name>", "指定环境配置文件", "")
    .option("--analyzer", "启动分析模式", false)
    .description("打包编译项目")
    .action(async (cmd) => {
        shell.env["NODE_MODE"] = "production";
        shell.env["NODE_ANALYZER"] = cmd.analyzer;
        shell.env["NODE_ENV"] = cmd.env;
        let webpackConfig = require(path.resolve(myConfig.cliDir, ".yipack", "webpack.config.pro.js"));
        webpack(webpackConfig, (err, stats) => {
            /**
             * stats.compilation
             * hooks
                name
                startTime
                endTime
                compiler
                resolverFactory
                inputFileSystem
                fileSystemInfo
                requestShortener
                compilerPath
                logger
                options
                outputOptions
                bail
                profile
                mainTemplate
                chunkTemplate
                runtimeTemplate
                moduleTemplates
                moduleGraph
                chunkGraph
                codeGenerationResults
                factorizeQueue
                addModuleQueue
                buildQueue
                rebuildQueue
                processDependenciesQueue
                creatingModuleDuringBuild
                entries
                globalEntry
                entrypoints
                asyncEntrypoints
                chunks
                chunkGroups
                namedChunkGroups
                namedChunks
                modules
                _modules
                records
                additionalChunkAssets
                assets
                assetsInfo
                _assetsRelatedIn
                errors
                warnings
                children
                logging
                dependencyFactories
                dependencyTemplates
                childrenCounters
                usedChunkIds
                usedModuleIds
                needAdditionalPass
                builtModules
                codeGeneratedModules
                _rebuildingModules
                emittedAssets
                comparedForEmitAssets
                fileDependencies
                contextDependencies
                missingDependencies
                buildDependencies
                compilationDependencies
                _modulesCache
                _assetsCache
                _codeGenerationCache
                fullHash
                hash
             */
            if (err) {
                console.log(err);
            } else {
                let fileds = [
                    //
                    "name",
                    "startTime",
                    "endTime",
                    "bail",
                    "profile",
                    "errors",
                    "assets",
                ];
                let result = _.pick(stats.compilation, fileds);
                console.log(result);
            }
        });
    });
// new
program
    .command("new")
    .option("-p,--page <name>", "创建页面")
    .option("--sp,--sub-page <name>", "创建二级页面")
    .option("--sv,--sub-view <name>", "创建二级视图")
    .option("-c,--comp <name>", "创建组件")
    .description("创建元素")
    .action((cmd) => {
        if (cmd.page) {
            let rootPageNames = getNames(cmd.page);
            // 创建目录
            let pageDirPath = path.resolve(myConfig.srcDir, "pages", rootPageNames.camelCaseName);
            // 如果页面目录还不存在，则创建页面目录
            if (fs.existsSync(pageDirPath) === false) {
                fs.ensureDirSync(pageDirPath);

                // 创建页面
                let htmlFilePath = path.resolve(pageDirPath, "index.vue");
                let htmlFileData = _.template(require("../.yipack/template/pageHtml.js"))(rootPageNames);
                fs.outputFileSync(htmlFilePath, htmlFileData);

                // 创建路由
                let routeFilePath = path.resolve(pageDirPath, "route.js");
                let routeFileData = _.template(require("../.yipack/template/pageRoute.js"))(rootPageNames);
                fs.outputFileSync(routeFilePath, routeFileData);

                console.log("页面创建成功");
            } else {
                console.log("页面已存在");
            }

            // 创建二级页面
            if (cmd.subPage) {
                let subPageNames = getNames(cmd.subPage);
                let names = {
                    page: {
                        lowerCaseName: rootPageNames.lowerCaseName,
                        kebabCaseName: rootPageNames.kebabCaseName,
                        startCaseName: rootPageNames.startCaseName,
                        camelCaseName: rootPageNames.camelCaseName,
                    },
                    sp: {
                        lowerCaseName: subPageNames.lowerCaseName,
                        kebabCaseName: subPageNames.kebabCaseName,
                        startCaseName: subPageNames.startCaseName,
                        camelCaseName: subPageNames.camelCaseName,
                    },
                };
                // 创建二级页面
                let htmlFilePath = path.resolve(pageDirPath, "subPages", subPageNames.camelCaseName, "index.vue");
                if (fs.existsSync(htmlFilePath) === false) {
                    let htmlFileData = _.template(require("../.yipack/template/subPageHtml.js"))(names);
                    fs.outputFileSync(htmlFilePath, htmlFileData);
                    console.log("二级页面创建成功");
                    // 创建二级路由
                    let routeFilePath = path.resolve(pageDirPath, "subPages", subPageNames.camelCaseName, "routePage.js");
                    let routeFileData = _.template(require("../.yipack/template/subPageRoute.js"))(names);
                    fs.outputFileSync(routeFilePath, routeFileData);
                    console.log("二级页面路由创建成功");
                } else {
                    console.log("二级页面已存在");
                }
            }
            if (cmd.subView) {
                let subViewNames = getNames(cmd.subView);
                let names = {
                    page: {
                        lowerCaseName: rootPageNames.lowerCaseName,
                        kebabCaseName: rootPageNames.kebabCaseName,
                        startCaseName: rootPageNames.startCaseName,
                        camelCaseName: rootPageNames.camelCaseName,
                    },
                    sv: {
                        lowerCaseName: subViewNames.lowerCaseName,
                        kebabCaseName: subViewNames.kebabCaseName,
                        startCaseName: subViewNames.startCaseName,
                        camelCaseName: subViewNames.camelCaseName,
                    },
                };
                // 创建二级页面
                let htmlFilePath = path.resolve(pageDirPath, "subViews", subViewNames.camelCaseName, "index.vue");
                if (fs.existsSync(htmlFilePath) === false) {
                    let htmlFileData = _.template(require("../.yipack/template/subViewHtml.js"))(names);
                    fs.outputFileSync(htmlFilePath, htmlFileData);
                    console.log("二级视图创建成功");
                    // 创建二级路由
                    let routeFilePath = path.resolve(pageDirPath, "subViews", subViewNames.camelCaseName, "routeView.js");
                    let routeFileData = _.template(require("../.yipack/template/subViewRoute.js"))(names);
                    fs.outputFileSync(routeFilePath, routeFileData);
                    console.log("二级视图路由创建成功");
                } else {
                    console.log("二级视图已存在");
                }
            }

            return;
        }
        if (cmd.comp) {
            let names = getNames(cmd.comp);

            // 创建组件
            let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName, "index.vue");
            if (fs.existsSync(htmlFilePath) === false) {
                let htmlFileData = _.template(require("../.yipack/template/compHtml.js"))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                console.log("组件创建成功");
            } else {
                console.log("组件已存在");
            }

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
        // 删除页面
        if (cmd.page) {
            let names = getNames(cmd.page);
            // 创建目录
            let pageDirPath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName);
            fs.removeSync(pageDirPath);

            console.log("页面元素删除成功");
            return;
        }
        // 删除组件
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
//             let filePath = path.resolve(myConfig.srcDir, "pages", names.camelCaseName, "index.vue");
//             let fileData = fs.readFileSync(filePath).toString("utf-8");
//             let scriptData = fileData.replace(/<script>([\s\S]+)<\/script>/gim, function(match, p1) {
//                 console.log(match);
//                 console.log(p1);

//                 let data = eval(p1);

//                 console.log(data);
//                 console.log(aaa);
//             });
//             // let js = require("vue-loader!" + pageDirPath + ".vue?vue&type=script");
//             // let ddd = vueTemplateCompiler.compile("<div>1111</div>");
//             // let js = require("vue-loader");
//             // console.log(ddd);
//             // fs.removeSync(pageDirPath);
//             // let dd = vueCompilerSfc.parse(fs.readFileSync(file));
//             // console.log(dd);
//             // console.log(new vueLoader.VueLoaderPlugin(fs.readFileSync(file)));

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
// program
//     //
//     .command("doctor")
//     .option("-p,--page <name>", "检测页面")
//     .option("-c,--comp <name>", "检测组件")
//     .description("检查元素")
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
//         // 目录数组
//         console.log("src目录元素检查");
//         let dirsArray = ["audio", "comps", "env", "fonts", "images", "layout", "mixin", "pages", "plugins", "router", "static", "styles", "tpls", "videos", "vuex", "App.vue", "main.js"];
//         for (let value of dirsArray) {
//             let _path = path.resolve(myConfig.rootDir, value);
//             if (fs.existsSync(_path) === false) {
//                 console.log(`${_path}存在`);
//             } else {
//                 console.error(`${_path}不存在`);
//             }
//         }
//     });
program
    //
    .version(yipackPackage.version, "-v, --version", "显示yipack版本")
    .helpOption("-h, --help", "显示帮助信息");
program.on("--help", () => {
    console.log("");
    console.log("Example call:");
    console.log("  $ custom-help --help");
});
program
    //
    .parse(process.argv);
