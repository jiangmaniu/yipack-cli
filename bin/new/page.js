// 自带模块
let path = require('path');
// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let chalk = require('chalk');
let ora = require('ora');
let tool = require('../tool.js');
// 配置相关
let myConfig = require('../../.yipack/webpack.config.my.js');
let yipackPackage = require('../../package.json');
let yipackConfig = require('../../.yipack/yipack.config.js');

module.exports = async function newPage(cmd) {
    let spinner = ora();
    let rootNames = tool.getNames(cmd.page);
    // 创建目录
    let pageDirPath = path.join(myConfig.srcDir, 'pages', rootNames.camelCaseName);
    // 如果页面目录还不存在，则创建页面目录
    if (fs.existsSync(pageDirPath) === false) {
        fs.ensureDirSync(pageDirPath);

        // 创建页面
        let htmlFilePath = path.join(pageDirPath, 'index.vue');
        let htmlFileData = _.template(require('../../.yipack/template/pageHtml.js'))(rootNames);
        fs.outputFileSync(htmlFilePath, htmlFileData);
        spinner.succeed(chalk.green('页面创建成功'));

        // 创建页面说明
        let readmeFilePath = path.join(pageDirPath, 'readme.md');
        let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(rootNames);
        fs.outputFileSync(readmeFilePath, readmeFileData);
        spinner.succeed(chalk.green('页面说明创建成功'));

        // 创建页面路由
        let routeFilePath = path.join(pageDirPath, 'route.js');
        let routeFileData = _.template(require('../../.yipack/template/pageRoute.js'))(rootNames);
        fs.outputFileSync(routeFilePath, routeFileData);
        spinner.succeed(chalk.green('页面路由创建成功'));

        // 创建页面接口
        let apiFilePath = path.join(pageDirPath, 'api.js');
        let apiFileData = _.template(require('../../.yipack/template/pageApi.js'))(rootNames);
        fs.outputFileSync(apiFilePath, apiFileData);
        spinner.succeed(chalk.green('页面接口创建成功'));
    } else {
        spinner.warn(chalk.green('页面已存在'));
    }

    // 创建子页面
    if (cmd.subPage) {
        let compNames = null;
        if (cmd.comp) {
            compNames = tool.getNames(cmd.comp);
        }
        let subNames = tool.getNames(cmd.subPage);
        let names = tool.getAllNames(rootNames, subNames, compNames);
        let currentDirectory = path.join(pageDirPath, 'subPages', subNames.camelCaseName);
        // 创建二级页面
        let htmlFilePath = path.join(currentDirectory, 'index.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            // 创建子页面
            let htmlFileData = _.template(require('../../.yipack/template/subPageHtml.js'))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green('子页面创建成功'));

            // 创建子页面说明
            let readmeFilePath = path.join(currentDirectory, 'readme.md');
            let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(rootNames);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green('子页面说明创建成功'));

            // 创建子页面路由
            let routeFilePath = path.join(currentDirectory, 'routePage.js');
            let routeFileData = _.template(require('../../.yipack/template/subPageRoute.js'))(names);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green('子页面路由创建成功'));

            // 创建子页面接口
            let apiFilePath = path.join(currentDirectory, 'api.js');
            let apiFileData = _.template(require('../../.yipack/template/pageApi.js'))(rootNames);
            fs.outputFileSync(apiFilePath, apiFileData);
            spinner.succeed(chalk.green('子页面接口创建成功'));
        } else {
            spinner.warn(chalk.green('子页面已存在'));
        }

        // 如果需要创建子组件
        if (cmd.comp) {
            // 创建子页面组件目录
            let compDirPath = path.join(currentDirectory, 'comps');
            if (fs.existsSync(compDirPath) === false) {
                fs.ensureDirSync(compDirPath);
            }
            // 创建组件
            let htmlFilePath = path.join(compDirPath, compNames.camelCaseName + '.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子页面组件
                let htmlFileData = _.template(require('../../.yipack/template/subPageCompHtml.js'))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('子页面组件创建成功'));

                // 创建子页面组件说明
                let readmeFilePath = path.join(compDirPath, 'readme.md');
                let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('子页面组件说明创建成功'));
            } else {
                spinner.warn(chalk.green('子页面组件已存在'));
            }
        }
        return;
    }

    // 如果是创建子视图
    if (cmd.subView) {
        let compNames = null;
        if (cmd.comp) {
            compNames = tool.getNames(cmd.comp);
        }
        let subNames = tool.getNames(cmd.subView);
        let names = tool.getAllNames(rootNames, subNames, compNames);
        let currentDirectory = path.join(pageDirPath, 'subViews', subNames.camelCaseName);
        // 创建二级页面
        let htmlFilePath = path.join(currentDirectory, 'index.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            // 创建子视图
            let htmlFileData = _.template(require('../../.yipack/template/subViewHtml.js'))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green('子视图创建成功'));

            // 创建子视图说明
            let readmeFilePath = path.join(currentDirectory, 'readme.md');
            let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(rootNames);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green('子视图说明创建成功'));

            // 创建子视图路由
            let routeFilePath = path.join(currentDirectory, 'routeView.js');
            let routeFileData = _.template(require('../../.yipack/template/subViewRoute.js'))(names);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green('子视图路由创建成功'));

            // 创建子视图接口
            let apiFilePath = path.join(currentDirectory, 'api.js');
            let apiFileData = _.template(require('../../.yipack/template/pageApi.js'))(rootNames);
            fs.outputFileSync(apiFilePath, apiFileData);
            spinner.succeed(chalk.green('子视图接口创建成功'));
        } else {
            spinner.warn(chalk.green('子视图已存在'));
        }

        // 如果需要创建子组件
        if (cmd.comp) {
            // 创建子页面组件目录
            let compDirPath = path.join(currentDirectory, 'comps');
            // 确保子视图组件目录存在
            if (fs.existsSync(compDirPath) === false) {
                fs.ensureDirSync(compDirPath);
            }

            let htmlFilePath = path.join(compDirPath, compNames.camelCaseName + '.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子视图组件
                let htmlFileData = _.template(require('../../.yipack/template/subViewCompHtml.js'))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('子视图组件创建成功'));

                // 创建子页面组件说明
                let readmeFilePath = path.join(compDirPath, 'readme.md');
                let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('子视图组件说明创建成功'));
            } else {
                spinner.warn(chalk.green('子视图组件已存在'));
            }
        }
        return;
    }

    // 创建页面子组件
    if (cmd.comp && !cmd.subPage && !cmd.subView) {
        let compNames = tool.getNames(cmd.comp);
        let names = tool.getAllNames(rootNames, false, compNames);

        // 创建页面组件目录
        let compDirPath = path.join(pageDirPath, 'comps');
        if (fs.existsSync(compDirPath) === false) {
            fs.ensureDirSync(compDirPath);
        }
        // 创建组件
        let htmlFilePath = path.join(compDirPath, compNames.camelCaseName + '.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            let htmlFileData = _.template(require('../../.yipack/template/pageCompHtml.js'))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green('页面组件创建成功'));
        } else {
            spinner.warn(chalk.green('页面组件已存在'));
        }
    }
};
