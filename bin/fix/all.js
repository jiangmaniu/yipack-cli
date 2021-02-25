// 自带模块
let path = require('path');
// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let webpack = require('webpack');
let shell = require('shelljs');
let ora = require('ora');
let chalk = require('chalk');
let { table } = require('table');
let tool = require('../tool.js');
let fastGlob = require('fast-glob');
// 配置相关
let myConfig = require('../../.yipack/webpack.config.my.js');
let yipackPackage = require('../../package.json');
let yipackConfig = require('../../.yipack/yipack.config.js');
let rootFileNames = [''];
let spinner = ora();
module.exports = async function build(cmd) {
    spinner.start(chalk.green('标准模板下载中...'));
    let tempDir = path.join(myConfig.cacheDir, 'projectTemp');
    try {
        fs.removeSync(tempDir);
        fs.ensureDirSync(tempDir);
        await tool.downloadProject('https://gitee.com:banshiweichen/yipack-template-init#master', tempDir);
        spinner.succeed(chalk.green('标准模板下载成功'));
        let rootFiles = await fastGlob('*', {
            dot: true,
            absolute: true,
            cwd: tempDir,
            onlyFiles: true,
            ignore: ['package-lock.json', 'CHANGELOG.md', 'LICENSE']
        });
        rootFiles.forEach((file) => {
            let targetPath = path.normalize(path.resolve(myConfig.rootDir, path.relative('.cache\\projectTemp', file)));
            let relativePath = path.relative(myConfig.rootDir, targetPath);
            let originPath = path.normalize(file);
            if (fs.existsSync(targetPath) === false) {
                spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
                fs.copySync(originPath, targetPath);
                spinner.succeed(chalk.green(`${relativePath} 已修复...`));
            } else {
                spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
            }
        });

        let srcFiles = await fastGlob('**/*', {
            dot: true,
            absolute: true,
            cwd: path.join(tempDir, 'src'),
            onlyFiles: false,
            ignore: ['comps/**/*', 'pages/**/*', 'directives/**/*', 'filters/**/*', '**/.gitkeep']
        });
        srcFiles.forEach((file) => {
            let targetPath = path.normalize(path.resolve(myConfig.rootDir, path.relative('.cache\\projectTemp', file)));
            let relativePath = path.relative(myConfig.rootDir, targetPath);
            let originPath = path.normalize(file);
            if (fs.existsSync(targetPath) === false) {
                spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
                fs.copySync(originPath, targetPath);
                spinner.succeed(chalk.green(`${relativePath} 已修复...`));
            } else {
                spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
            }
        });

        let readmeFiles = await fastGlob('{pages,comps,filters,directives,apis}/**/index.{js,vue}', {
            dot: true,
            absolute: true,
            cwd: path.join(myConfig.srcDir),
            onlyFiles: true,
            ignore: []
        });

        readmeFiles.forEach((file) => {
            let targetPath = path.join(path.dirname(file), 'readme.md');
            let relativePath = path.relative(myConfig.rootDir, targetPath);
            if (fs.existsSync(targetPath) === false) {
                spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
                fs.ensureFileSync(targetPath);
                spinner.succeed(chalk.green(`${relativePath} 已修复...`));
            } else {
                spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
            }
        });

        let apiFiles = await fastGlob('**/index.vue', {
            dot: true,
            absolute: true,
            cwd: path.join(myConfig.srcDir, 'pages'),
            onlyFiles: true,
            ignore: ['**/comps/**/*']
        });

        apiFiles.forEach((file) => {
            let targetPath = path.join(path.dirname(file), 'api.js');
            let relativePath = path.relative(myConfig.rootDir, targetPath);
            if (fs.existsSync(targetPath) === false) {
                spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
                fs.copySync(path.join(myConfig.cliDir, '.yipack', 'template', 'pageApi.js'), targetPath);
                spinner.succeed(chalk.green(`${relativePath} 已修复...`));
            } else {
                spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
            }
        });
    } catch (err) {
        spinner.fail(chalk.red('标准模板下载失败'));
        spinner.stop();
        console.log(err);
    }
};
