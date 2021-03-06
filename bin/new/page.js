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
let yipackConfig = require(path.join(myConfig.webpackDir, 'yipack.config.js'));

module.exports = async function newPage(cmd) {
    let spinner = ora();
    let pages = cmd.page.split('/');
    let pageParams = {
        names: {},
        path: myConfig.pageDir,
        route: '',
        relativePath: ''
    };
    pages.forEach((page) => {
        // 页面参数
        pageParams.names = tool.getNames(page);
        // 当前页面路径
        pageParams.path = path.join(pageParams.path, pageParams.names.lowerCaseName);
        // 页面相对路径
        pageParams.relativePath = path.relative(myConfig.pageDir, pageParams.path).replace(/\\/g, '/');
        pageParams.route = pageParams.route + '/' + pageParams.names.kebabCaseName;
        // 如果页面目录还不存在，则创建页面目录
        if (fs.existsSync(pageParams.path) === false) {
            fs.ensureDirSync(pageParams.path);

            // 创建页面
            let htmlFilePath = path.join(pageParams.path, 'index.vue');
            let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageHtml.js')))(pageParams);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath) + ' 页面创建成功'));

            // 创建页面路由
            let routeFilePath = path.join(pageParams.path, 'route.js');
            let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageRoute.js')))(pageParams);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath) + ' 页面路由创建成功'));

            // 创建页面接口
            let apiFilePath = path.join(pageParams.path, 'api.js');
            let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(pageParams);
            fs.outputFileSync(apiFilePath, apiFileData);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath) + ' 页面接口创建成功'));

            // 创建页面说明
            let readmeFilePath = path.join(pageParams.path, 'readme.md');
            let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(pageParams);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath) + ' 页面说明书创建成功'));

            // 创建页面组件目录
            let componentDirectory = path.join(pageParams.path, 'components');
            fs.ensureDirSync(componentDirectory);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath) + ' 页面组件目录创建成功'));
        } else {
            spinner.warn(chalk.green(chalk.red(pageParams.relativePath) + ' 页面已存在'));
        }
    });
    let compParams = {
        names: {}
    };
    // 创建页面组件
    if (cmd.comp) {
        compParams.names = tool.getNames(cmd.comp);
        // 创建页面组件目录
        let componentDirectory = path.join(pageParams.path, 'components', compParams.names.lowerCaseName);
        fs.ensureDirSync(componentDirectory);
        let htmlFilePath = path.join(componentDirectory, 'index.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            // 创建页面组件
            let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageCompHtml.js')))(compParams);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath + '/' + compParams.names.camelCaseName) + ' 页面组件创建成功'));

            // 创建页面组件说明
            let readmeFilePath = path.join(componentDirectory, 'readme.md');
            let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageReadme.js')))(compParams);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green(chalk.blue(pageParams.relativePath + '/' + compParams.names.camelCaseName) + ' 页面组件说明书创建成功'));
        } else {
            spinner.warn(chalk.green(chalk.red(pageParams.relativePath + '/' + compParams.names.camelCaseName) + ' 页面组件已存在'));
        }
    }
};
