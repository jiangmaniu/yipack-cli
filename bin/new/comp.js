// TODO: 增加多级目录组件
// 案例：yipack new --comp a/b/c.vue 创建多级目录组件
// TODO: 创建局部组件，也需要用文件夹包裹
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
module.exports = async function newComp(cmd) {
    let spinner = ora();
    let compNames = tool.getNames(cmd.comp);
    // 全局组件目录
    let compDirectory = path.join(myConfig.srcDir, 'components', compNames.camelCaseName);
    if (fs.existsSync(compDirectory) === false) {
        fs.ensureDirSync(compDirectory);
        // 创建全局组件
        let compFilePath = path.join(compDirectory, 'index.vue');
        let compFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'compHtml.js')))(compNames);
        fs.outputFileSync(compFilePath, compFileData);
        spinner.succeed(chalk.green('全局组件创建成功'));

        // 创建全局组件说明
        let readmeFilePath = path.join(compDirectory, 'readme.md');
        let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(compNames);
        fs.outputFileSync(readmeFilePath, readmeFileData);
        spinner.succeed(chalk.green('全局组件说明创建成功'));
    } else {
        spinner.warn(chalk.green('组件目录已存在'));
    }
};
