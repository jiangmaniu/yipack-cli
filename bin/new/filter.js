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
module.exports = async function newComp(cmd) {
    let spinner = ora();
    let names = tool.getNames(cmd.filter);
    // 全局过滤器目录
    let currentDirectory = path.join(myConfig.srcDir, 'filters', names.camelCaseName);
    if (fs.existsSync(currentDirectory) === false) {
        fs.ensureDirSync(currentDirectory);
        // 创建全局组件
        let filterFilePath = path.join(currentDirectory, 'index.js');
        let filterFileData = _.template(require('../../.yipack/template/filterTemplate.js'))(names);
        fs.outputFileSync(filterFilePath, filterFileData);
        spinner.succeed(chalk.green('全局过滤器创建成功'));

        // 创建全局组件说明
        let readmeFilePath = path.join(currentDirectory, 'readme.md');
        let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(names);
        fs.outputFileSync(readmeFilePath, readmeFileData);
        spinner.succeed(chalk.green('全局过滤器说明创建成功'));
    } else {
        spinner.warn(chalk.green('组件目录已存在'));
    }
};
