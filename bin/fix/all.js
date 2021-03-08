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
    // 项目临时目录
    let tempDir = path.join(myConfig.cacheDir, 'projectTemp');
    try {
        fs.removeSync(tempDir);
        fs.ensureDirSync(tempDir);
        await tool.downloadProject('https://gitee.com:banshiweichen/yipack-template-init#master', tempDir);
        spinner.succeed(chalk.green('标准模板下载成功'));

        /**
         * 修复根目录下的配置文件等
         */
        let rootFiles = await fastGlob('*', {
            dot: true,
            absolute: true,
            cwd: tempDir,
            onlyFiles: true,
            ignore: ['package-lock.json', 'CHANGELOG.md', 'LICENSE']
        });
        // rootFiles.forEach((file) => {
        //     let targetPath = path.normalize(path.resolve(myConfig.rootDir, path.relative('.cache\\projectTemp', file)));
        //     let relativePath = path.relative(myConfig.rootDir, targetPath);
        //     let originPath = path.normalize(file);
        //     if (fs.existsSync(targetPath) === false) {
        //         spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
        //         fs.copySync(originPath, targetPath);
        //         spinner.succeed(chalk.green(`${relativePath} 已修复...`));
        //     } else {
        //         spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
        //     }
        // });

        /**
         * 修复源码目录下的文件结构
         */
        let srcFiles = await fastGlob('**/*', {
            dot: true,
            absolute: true,
            cwd: path.join(tempDir, 'src'),
            onlyFiles: false,
            // 排除文件，只修复目录
            ignore: ['components/**/*', 'pages/**/*', '**/.gitkeep']
        });
        // srcFiles.forEach((file) => {
        //     let targetPath = path.normalize(path.resolve(myConfig.rootDir, path.relative('.cache\\projectTemp', file)));
        //     let relativePath = path.relative(myConfig.rootDir, targetPath);
        //     let originPath = path.normalize(file);
        //     if (fs.existsSync(targetPath) === false) {
        //         spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
        //         fs.copySync(originPath, targetPath);
        //         spinner.succeed(chalk.green(`${relativePath} 已修复...`));
        //     } else {
        //         spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
        //     }
        // });

        /**
         * 修复说明文件
         */
        let readmeFiles = await fastGlob('{pages,components,filters,directives,apis,plugins}/**/index.{js,vue}', {
            dot: true,
            absolute: true,
            cwd: path.join(myConfig.srcDir),
            onlyFiles: true,
            ignore: []
        });

        // readmeFiles.forEach((file) => {
        //     let targetPath = path.join(path.dirname(file), 'readme.md');
        //     let relativePath = path.relative(myConfig.rootDir, targetPath);
        //     if (fs.existsSync(targetPath) === false) {
        //         spinner.warn(chalk.yellow(`${relativePath} 不存在，正在修复...`));
        //         fs.ensureFileSync(targetPath);
        //         spinner.succeed(chalk.green(`${relativePath} 已修复...`));
        //     } else {
        //         spinner.succeed(chalk.green(`${relativePath} 检测通过...`));
        //     }
        // });

        // 修复页面相关的文件
        let apiFiles = await fastGlob('**/index.vue', {
            dot: true,
            absolute: true,
            cwd: path.join(myConfig.srcDir, 'pages'),
            onlyFiles: true,
            ignore: ['**/components/**/*']
        });

        let pageParams = {
            names: {},
            path: myConfig.pageDir,
            // 小写短横线文件名数组
            lowerCaseNameRoute: [],
            lowerCaseNameRouteDot: '', // 点号拼接
            lowerCaseNameRouteBackslash: '', // 反斜杠拼接
            lowerCaseNameRoutePath: '', // 路径路径
            // 小驼峰文件名数组
            camelCaseNameRoute: [],
            camelCaseNameRouteDot: '',
            camelCaseNameRouteBackslash: '',
            camelCaseNameRoutePath: '',
            // 大驼峰文件名数组
            startCaseNameRoute: [],
            startCaseNameRouteDot: '',
            startCaseNameRouteBackslash: '',
            startCaseNameRoutePath: ''
        };
        apiFiles.forEach((file) => {
            file = path.normalize(file);
            let apiPath = path.join(path.dirname(file), 'api.js');
            let pageName = path.relative(path.dirname(path.dirname(file)), path.dirname(file));
            let pagePath = path.relative(myConfig.pageDir, path.dirname(file));
            console.log(pagePath);
            // 页面参数
            // pageParams.names = tool.getNames(pageName);
            // // 当前页面路径
            // pageParams.path = path.join(pageParams.path, pageParams.names.lowerCaseName);
            // // 页面相对路径
            // pageParams.lowerCaseNameRoute.push(pageParams.names.lowerCaseName);
            // pageParams.camelCaseNameRoute.push(pageParams.names.camelCaseName);
            // pageParams.startCaseNameRoute.push(pageParams.names.startCaseName);
            // // 点号拼接
            // pageParams.lowerCaseNameRouteDot = pageParams.lowerCaseNameRoute.join('.');
            // pageParams.camelCaseNameRouteDot = pageParams.camelCaseNameRoute.join('.');
            // pageParams.startCaseNameRouteDot = pageParams.startCaseNameRoute.join('.');
            // // 反斜杠拼接
            // pageParams.lowerCaseNameRouteBackslash = pageParams.lowerCaseNameRoute.join('/');
            // pageParams.camelCaseNameRouteBackslash = pageParams.camelCaseNameRoute.join('/');
            // pageParams.startCaseNameRouteBackslash = pageParams.startCaseNameRoute.join('/');
            // // 路径路径拼接
            // pageParams.lowerCaseNameRoutePath = '/' + pageParams.lowerCaseNameRouteBackslash;
            // pageParams.camelCaseNameRoutePath = '/' + pageParams.camelCaseNameRouteBackslash;
            // pageParams.startCaseNameRoutePath = '/' + pageParams.startCaseNameRouteBackslash;
            // if (fs.existsSync(apiPath) === false) {
            //     let apiRelativePath = path.relative(myConfig.rootDir, apiPath);
            //     spinner.warn(chalk.yellow(`${apiRelativePath} 不存在，正在修复...`));
            //     let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(pageParams);
            //     fs.outputFileSync(apiFilePath, apiFileData);
            //     fs.copySync(path.join(myConfig.cliDir, '.yipack', 'template', 'api.js'), apiPath);
            //     spinner.succeed(chalk.green(`${apiRelativePath} 已修复...`));
            // } else {
            //     spinner.succeed(chalk.green(`${apiRelativePath} 检测通过...`));
            // }
        });
    } catch (err) {
        spinner.fail(chalk.red('标准模板下载失败'));
        spinner.stop();
        console.log(err);
    }
};
