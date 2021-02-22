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
    let names = tool.getNames(cmd.directive);
    // 全局组件目录
    let currentDirectory = path.join(myConfig.srcDir, 'directives', names.camelCaseName);
    if (fs.existsSync(currentDirectory) === false) {
        fs.ensureDirSync(currentDirectory);
        // 创建全局组件
        let directiveFilePath = path.join(currentDirectory, 'index.js');
        let directiveFileData = _.template(require('../../.yipack/template/directiveTemplate.js'))(names);
        fs.outputFileSync(directiveFilePath, directiveFileData);
        spinner.succeed(chalk.green('全局指令创建成功'));

        // 创建全局组件说明
        let readmeFilePath = path.join(currentDirectory, 'readme.md');
        let readmeFileData = _.template(require('../../.yipack/template/readme.js'))(names);
        fs.outputFileSync(readmeFilePath, readmeFileData);
        spinner.succeed(chalk.green('全局指令说明创建成功'));
    } else {
        spinner.warn(chalk.green('组件目录已存在'));
    }
};
