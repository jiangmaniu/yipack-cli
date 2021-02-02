#!/usr/bin/env node
// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let commander = require("commander");
let program = new commander.Command();
let shell = require("shelljs");
let { table } = require("table");
// 配置相关
let myConfig = require("../.yipack/webpack.config.my.js");
let yipackPackage = require("../package.json");
let yipackConfig = require("../.yipack/yipack.config.js");
let tool = require("./tool.js");
program
    .storeOptionsAsProperties(false) // ；屏蔽参数作为cmd的属性
    .allowExcessArguments(false) // 严格控制参数顺序
    .name("yipack")
    .usage("<命令> [参数]");
program
    .command("dev")
    .addOption(new commander.Option("--env <配置文件名称>", "指定环境配置文件").choices(tool.getEnvNames()))
    .option("--write", "写入硬盘", false)
    .description("启动开发环境")
    .action((cmd) => {
        require("./dev/index.js")(cmd);
    });

program
    .command("build")
    .addOption(new commander.Option("--env <配置文件名称>", "指定环境配置文件").choices(tool.getEnvNames()))
    .option("--analyzer", "启动分析模式", false)
    .description("打包编译项目")
    .action((cmd) => {
        require("./build/index.js")(cmd);
    });
program
    .command("new")
    .option("-p,--page <name>", "创建页面")
    .option("--sp,--sub-page <name>", "创建二级页面")
    .option("--sv,--sub-view <name>", "创建二级视图")
    .option("-c,--comp <name>", "创建组件")
    .description("创建元素")
    .action((cmd) => {
        if (cmd.page) {
            require("./new/page.js")(cmd);
        }
        if (cmd.comp) {
            require("./new/comp.js")(cmd);
        }
    });
program
    .command("show")
    .option("-p,--pages", "查看所有页面")
    .option("-c,--comps", "查看所有全局组件")
    .description("查看项目相关信息")
    .action((cmd) => {
        if (cmd.pages) {
            require("./show/pages.js")(cmd);
        }
        if (cmd.comps) {
            require("./show/comps.js")(cmd);
        }
    });

program
    .command("all")
    .description("查看所有命令")
    .action((cmd) => {
        require("./all/index.js")(cmd);
    });
program
    .command("tpl")
    .addOption(new commander.Option("-t,--type <模板名称>", "初始化项目模板").choices(["init", "admin", "api", "mini"]))
    .description("初始化项目模板")
    .action((cmd) => {
        if (cmd.type === "admin") {
            require("./tpl/admin.js")();
            return;
        }
        if (cmd.type === "api") {
            require("./tpl/api.js")();
            return;
        }
        if (cmd.type === "init") {
            require("./tpl/init.js")();
            return;
        }
        // TODO: 小程序模板
        // if (cmd.type === "mini") {
        //     require("./tpl/mini.js")();
        //     return;
        // }
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
    .version(yipackPackage.version, "-v, --version", "显示yipack版本");
program.helpInformation();
program.on("--help", () => {
    // let data = [
    //     ["查看所有命令", "yipack all"],
    //     ["查看子命令帮助", "yipack <子命令> --help"],
    //     ["查看官方文档", "https://chensuiyi.com"],
    //     ["启动开发环境", "yipack dev [参数]"],
    //     ["打包编译项目", "yipack build [参数]"],
    //     ["创建元素", "yipack new [参数]"],
    //     ["初始化项目模板", "yipack tpl <--type=模板名称>"],
    //     ["查看项目相关信息", "yipack show [参数]"],
    //     ["检测项目健康性", "yipack doctor [参数]"],
    // ];
    // console.log(table(data));
});
program.parse(process.argv);
