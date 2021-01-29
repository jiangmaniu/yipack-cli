// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let chalk = require("chalk");
let ora = require("ora");
let tool = require("../tool.js");
// 配置相关
let myConfig = require("../../.yipack/webpack.config.my.js");
let yipackPackage = require("../../package.json");
let yipackConfig = require("../../.yipack/yipack.config.js");
module.exports = async function newPage(cmd) {
    let spinner = ora();
    let rootPageNames = tool.getNames(cmd.page);
    // 创建目录
    let pageDirPath = path.resolve(myConfig.srcDir, "pages", rootPageNames.camelCaseName);
    // 如果页面目录还不存在，则创建页面目录
    if (fs.existsSync(pageDirPath) === false) {
        fs.ensureDirSync(pageDirPath);

        // 创建页面
        let htmlFilePath = path.resolve(pageDirPath, "index.vue");
        let htmlFileData = _.template(require("../../.yipack/template/pageHtml.js"))(rootPageNames);
        fs.outputFileSync(htmlFilePath, htmlFileData);

        // 创建路由
        let routeFilePath = path.resolve(pageDirPath, "route.js");
        let routeFileData = _.template(require("../../.yipack/template/pageRoute.js"))(rootPageNames);
        fs.outputFileSync(routeFilePath, routeFileData);

        spinner.succeed(chalk.green("页面创建成功"));
    } else {
        spinner.warn(chalk.green("页面已存在"));
    }

    // 创建二级页面
    if (cmd.subPage) {
        let subPageNames = tool.getNames(cmd.subPage);
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
            let htmlFileData = _.template(require("../../.yipack/template/subPageHtml.js"))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);

            spinner.succeed(chalk.green("二级页面创建成功"));
            // 创建二级路由
            let routeFilePath = path.resolve(pageDirPath, "subPages", subPageNames.camelCaseName, "routePage.js");
            let routeFileData = _.template(require("../../.yipack/template/subPageRoute.js"))(names);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green("二级页面路由创建成功"));
        } else {
            spinner.warn(chalk.green("二级页面已存在"));
        }
    }
    if (cmd.subView) {
        let subViewNames = tool.getNames(cmd.subView);
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
            let htmlFileData = _.template(require("../../.yipack/template/subViewHtml.js"))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green("二级视图创建成功"));
            // 创建二级路由
            let routeFilePath = path.resolve(pageDirPath, "subViews", subViewNames.camelCaseName, "routeView.js");
            let routeFileData = _.template(require("../../.yipack/template/subViewRoute.js"))(names);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green("二级视图路由创建成功"));
        } else {
            spinner.warn(chalk.green("二级视图已存在"));
        }
    }
};
