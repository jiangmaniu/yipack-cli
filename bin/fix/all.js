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
    let tempDir = path.join(myConfig.cacheDir, 'temp');
    try {
        fs.removeSync(tempDir);
        fs.ensureDirSync(tempDir);
        await tool.downloadProject('https://gitee.com:banshiweichen/yipack-template#master', tempDir);
        spinner.succeed(chalk.green('标准模板下载成功'));
        // ======================================================
        spinner.info(chalk.white('检测 yipack.config.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'yipack.config.js')) === false) {
            spinner.warn(chalk.yellow('yipack.config.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'yipack.config.js'), path.join(myConfig.rootDir, 'yipack.config.js'));
            spinner.succeed(chalk.green('yipack.config.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('yipack.config.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 vetur.config.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'vetur.config.js')) === false) {
            spinner.warn(chalk.yellow('vetur.config.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'vetur.config.js'), path.join(myConfig.rootDir, 'vetur.config.js'));
            spinner.succeed(chalk.green('vetur.config.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('vetur.config.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 README.md 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'README.md')) === false) {
            spinner.warn(chalk.yellow('README.md 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'README.md'), path.join(myConfig.rootDir, 'README.md'));
            spinner.succeed(chalk.green('README.md 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('README.md 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 package.json 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'package.json')) === false) {
            spinner.warn(chalk.yellow('package.json 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'package.json'), path.join(myConfig.rootDir, 'package.json'));
            spinner.succeed(chalk.green('package.json 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('package.json 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 LICENSE 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'LICENSE')) === false) {
            spinner.warn(chalk.yellow('LICENSE 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'LICENSE'), path.join(myConfig.rootDir, 'LICENSE'));
            spinner.succeed(chalk.green('LICENSE 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('LICENSE 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 jsconfig.json 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'jsconfig.json')) === false) {
            spinner.warn(chalk.yellow('jsconfig.json 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'jsconfig.json'), path.join(myConfig.rootDir, 'jsconfig.json'));
            spinner.succeed(chalk.green('jsconfig.json 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('jsconfig.json 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 commitlint.config.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'commitlint.config.js')) === false) {
            spinner.warn(chalk.yellow('commitlint.config.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'commitlint.config.js'), path.join(myConfig.rootDir, 'commitlint.config.js'));
            spinner.succeed(chalk.green('commitlint.config.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('commitlint.config.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 .prettierrc 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, '.prettierrc')) === false) {
            spinner.warn(chalk.yellow('.prettierrc 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', '.prettierrc'), path.join(myConfig.rootDir, '.prettierrc'));
            spinner.succeed(chalk.green('.prettierrc 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('.prettierrc 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 .npmrc 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, '.npmrc')) === false) {
            spinner.warn(chalk.yellow('.npmrc 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', '.npmrc'), path.join(myConfig.rootDir, '.npmrc'));
            spinner.succeed(chalk.green('.npmrc 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('.npmrc 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 .gitignore 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, '.gitignore')) === false) {
            spinner.warn(chalk.yellow('.gitignore 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', '.gitignore'), path.join(myConfig.rootDir, '.gitignore'));
            spinner.succeed(chalk.green('.gitignore 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('.gitignore 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 .eslintrc.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, '.eslintrc.js')) === false) {
            spinner.warn(chalk.yellow('.eslintrc.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', '.eslintrc.js'), path.join(myConfig.rootDir, '.eslintrc.js'));
            spinner.succeed(chalk.green('.eslintrc.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('.eslintrc.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/apis 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'apis')) === false) {
            spinner.warn(chalk.yellow('src/apis 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'apis'), path.join(myConfig.rootDir, 'src', 'apis'));
            spinner.succeed(chalk.green('src/apis 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/apis 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/assets 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'assets')) === false) {
            spinner.warn(chalk.yellow('src/assets 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'assets'), path.join(myConfig.rootDir, 'src', 'assets'));
            spinner.succeed(chalk.green('src/assets 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/assets 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/assets/audio 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'assets', 'audio')) === false) {
            spinner.warn(chalk.yellow('src/assets/audio 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'assets', 'audio'), path.join(myConfig.rootDir, 'src', 'assets', 'audio'));
            spinner.succeed(chalk.green('src/assets/audio 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/assets/audio 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/assets/fonts 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'assets', 'fonts')) === false) {
            spinner.warn(chalk.yellow('src/assets/fonts 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'assets', 'fonts'), path.join(myConfig.rootDir, 'src', 'assets', 'fonts'));
            spinner.succeed(chalk.green('src/assets/fonts 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/assets/fonts 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/assets/images 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'assets', 'images')) === false) {
            spinner.warn(chalk.yellow('src/assets/images 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'assets', 'images'), path.join(myConfig.rootDir, 'src', 'assets', 'images'));
            spinner.succeed(chalk.green('src/assets/images 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/assets/images 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/assets/videos 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'assets', 'videos')) === false) {
            spinner.warn(chalk.yellow('src/assets/videos 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'assets', 'videos'), path.join(myConfig.rootDir, 'src', 'assets', 'videos'));
            spinner.succeed(chalk.green('src/assets/videos 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/assets/videos 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/comps 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'comps')) === false) {
            spinner.warn(chalk.yellow('src/comps 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'comps'), path.join(myConfig.rootDir, 'src', 'comps'));
            spinner.succeed(chalk.green('src/comps 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/comps 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/directives 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'directives')) === false) {
            spinner.warn(chalk.yellow('src/directives 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'directives'), path.join(myConfig.rootDir, 'src', 'directives'));
            spinner.succeed(chalk.green('src/directives 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/directives 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/env 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'env')) === false) {
            spinner.warn(chalk.yellow('src/env 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'env'), path.join(myConfig.rootDir, 'src', 'env'));
            spinner.succeed(chalk.green('src/env 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/env 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/env/development.env 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'env', 'development.env')) === false) {
            spinner.warn(chalk.yellow('src/env/development.env 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'env', 'development.env'), path.join(myConfig.rootDir, 'src', 'env', 'development.env'));
            spinner.succeed(chalk.green('src/env/development.env 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/env/development.env 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/env/production.env 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'env', 'production.env')) === false) {
            spinner.warn(chalk.yellow('src/env/production.env 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'env', 'production.env'), path.join(myConfig.rootDir, 'src', 'env', 'production.env'));
            spinner.succeed(chalk.green('src/env/production.env 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/env/production.env 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/filters 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'filters')) === false) {
            spinner.warn(chalk.yellow('src/filters 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'filters'), path.join(myConfig.rootDir, 'src', 'filters'));
            spinner.succeed(chalk.green('src/filters 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/filters 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/lang/index.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'lang', 'index.js')) === false) {
            spinner.warn(chalk.yellow('src/lang/index.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'lang', 'index.js'), path.join(myConfig.rootDir, 'src', 'lang', 'index.js'));
            spinner.succeed(chalk.green('src/lang/index.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/lang/index.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/lang/zh.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'lang', 'zh.js')) === false) {
            spinner.warn(chalk.yellow('src/lang/zh.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'lang', 'zh.js'), path.join(myConfig.rootDir, 'src', 'lang', 'zh.js'));
            spinner.succeed(chalk.green('src/lang/zh.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/lang/zh.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/lang/en.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'lang', 'en.js')) === false) {
            spinner.warn(chalk.yellow('src/lang/en.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'lang', 'en.js'), path.join(myConfig.rootDir, 'src', 'lang', 'en.js'));
            spinner.succeed(chalk.green('src/lang/en.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/lang/en.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/layout 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'layout')) === false) {
            spinner.warn(chalk.yellow('src/layout 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'layout'), path.join(myConfig.rootDir, 'src', 'layout'));
            spinner.succeed(chalk.green('src/layout 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/layout 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/mixin 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'mixin')) === false) {
            spinner.warn(chalk.yellow('src/mixin 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'mixin'), path.join(myConfig.rootDir, 'src', 'mixin'));
            spinner.succeed(chalk.green('src/mixin 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/mixin 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/mixin/index.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'mixin', 'index.js')) === false) {
            spinner.warn(chalk.yellow('src/mixin/index.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'mixin', 'index.js'), path.join(myConfig.rootDir, 'src', 'mixin', 'index.js'));
            spinner.succeed(chalk.green('src/mixin/index.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/mixin/index.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/pages 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'pages')) === false) {
            spinner.warn(chalk.yellow('src/pages 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'pages'), path.join(myConfig.rootDir, 'src', 'pages'));
            spinner.succeed(chalk.green('src/pages 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/pages 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins')) === false) {
            spinner.warn(chalk.yellow('src/plugins 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins'), path.join(myConfig.rootDir, 'src', 'plugins'));
            spinner.succeed(chalk.green('src/plugins 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins/index.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins', 'index.js')) === false) {
            spinner.warn(chalk.yellow('src/plugins/index.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins', 'index.js'), path.join(myConfig.rootDir, 'src', 'plugins', 'index.js'));
            spinner.succeed(chalk.green('src/plugins/index.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins/index.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins/api.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins', 'api.js')) === false) {
            spinner.warn(chalk.yellow('src/plugins/api.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins', 'api.js'), path.join(myConfig.rootDir, 'src', 'plugins', 'api.js'));
            spinner.succeed(chalk.green('src/plugins/api.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins/api.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins/basil.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins', 'basil.js')) === false) {
            spinner.warn(chalk.yellow('src/plugins/basil.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins', 'basil.js'), path.join(myConfig.rootDir, 'src', 'plugins', 'basil.js'));
            spinner.succeed(chalk.green('src/plugins/basil.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins/basil.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins/comps.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins', 'comps.js')) === false) {
            spinner.warn(chalk.yellow('src/plugins/comps.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins', 'comps.js'), path.join(myConfig.rootDir, 'src', 'plugins', 'comps.js'));
            spinner.succeed(chalk.green('src/plugins/comps.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins/comps.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins/directive.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins', 'directive.js')) === false) {
            spinner.warn(chalk.yellow('src/plugins/directive.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins', 'directive.js'), path.join(myConfig.rootDir, 'src', 'plugins', 'directive.js'));
            spinner.succeed(chalk.green('src/plugins/directive.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins/directive.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/plugins/filter.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'plugins', 'filter.js')) === false) {
            spinner.warn(chalk.yellow('src/plugins/filter.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'plugins', 'filter.js'), path.join(myConfig.rootDir, 'src', 'plugins', 'filter.js'));
            spinner.succeed(chalk.green('src/plugins/filter.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/plugins/filter.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/request 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'request')) === false) {
            spinner.warn(chalk.yellow('src/request 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'request'), path.join(myConfig.rootDir, 'src', 'request'));
            spinner.succeed(chalk.green('src/request 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/request 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/request/api.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'request', 'api.js')) === false) {
            spinner.warn(chalk.yellow('src/request/api.js 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'request', 'api.js'), path.join(myConfig.rootDir, 'src', 'request', 'api.js'));
            spinner.succeed(chalk.green('src/reques/api.jst 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/request/api.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/router 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'router')) === false) {
            spinner.warn(chalk.yellow('src/router 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'router'), path.join(myConfig.rootDir, 'src', 'router'));
            spinner.succeed(chalk.green('src/router 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/router 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/router/index.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'router', 'index.js')) === false) {
            spinner.warn(chalk.yellow('src/router/index.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'router', 'index.js'), path.join(myConfig.rootDir, 'src', 'router', 'index.js'));
            spinner.succeed(chalk.green('src/router/index.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/router/index.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/static 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'static')) === false) {
            spinner.warn(chalk.yellow('src/static 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'static'), path.join(myConfig.rootDir, 'src', 'static'));
            spinner.succeed(chalk.green('src/static 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/static 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/static/css 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'static', 'css')) === false) {
            spinner.warn(chalk.yellow('src/static/css 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'static', 'css'), path.join(myConfig.rootDir, 'src', 'static', 'css'));
            spinner.succeed(chalk.green('src/static/css 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/static/css 目录文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/static/js 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'static', 'js')) === false) {
            spinner.warn(chalk.yellow('src/static/js 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'static', 'js'), path.join(myConfig.rootDir, 'src', 'static', 'js'));
            spinner.succeed(chalk.green('src/static/js 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/static/js 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/static/images 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'static', 'images')) === false) {
            spinner.warn(chalk.yellow('src/static/images 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'static', 'images'), path.join(myConfig.rootDir, 'src', 'static', 'images'));
            spinner.succeed(chalk.green('src/static/images 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/static/images 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/styles 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'styles')) === false) {
            spinner.warn(chalk.yellow('src/styles 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'styles'), path.join(myConfig.rootDir, 'src', 'styles'));
            spinner.succeed(chalk.green('src/styles 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/styles 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/styles/index.css 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'styles', 'index.css')) === false) {
            spinner.warn(chalk.yellow('src/styles/index.css 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'styles', 'index.css'), path.join(myConfig.rootDir, 'src', 'styles', 'index.css'));
            spinner.succeed(chalk.green('src/styles/index.css 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/styles/index.css 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/styles/reset.css 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'styles', 'reset.css')) === false) {
            spinner.warn(chalk.yellow('src/styles/reset.css 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'styles', 'reset.css'), path.join(myConfig.rootDir, 'src', 'styles', 'reset.css'));
            spinner.succeed(chalk.green('src/styles/reset.css 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/styles/reset.css 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/styles/normalize.css 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'styles', 'normalize.css')) === false) {
            spinner.warn(chalk.yellow('src/styles/normalize.css 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'styles', 'normalize.css'), path.join(myConfig.rootDir, 'src', 'styles', 'normalize.css'));
            spinner.succeed(chalk.green('src/styles/normalize.css 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/styles/normalize.css 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/styles/variable.css 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'styles', 'variable.css')) === false) {
            spinner.warn(chalk.yellow('src/styles/variable.css 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'styles', 'variable.css'), path.join(myConfig.rootDir, 'src', 'styles', 'variable.css'));
            spinner.succeed(chalk.green('src/styles/variable.css 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/styles/variable.css 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/styles/global.css 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'styles', 'global.css')) === false) {
            spinner.warn(chalk.yellow('src/styles/global.css 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'styles', 'global.css'), path.join(myConfig.rootDir, 'src', 'styles', 'global.css'));
            spinner.succeed(chalk.green('src/styles/global.css 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/styles/global.css 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/tpls 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'tpls')) === false) {
            spinner.warn(chalk.yellow('src/tpls 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'tpls'), path.join(myConfig.rootDir, 'src', 'tpls'));
            spinner.succeed(chalk.green('src/tpls 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/tpls 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/tpls/index.html 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'tpls', 'index.html')) === false) {
            spinner.warn(chalk.yellow('src/tpls/index.html 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'tpls', 'index.html'), path.join(myConfig.rootDir, 'src', 'tpls', 'index.html'));
            spinner.succeed(chalk.green('src/tpls/index.html 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/tpls/index.html 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/utils 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'utils')) === false) {
            spinner.warn(chalk.yellow('src/utils 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'utils'), path.join(myConfig.rootDir, 'src', 'utils'));
            spinner.succeed(chalk.green('src/utils 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/utils 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/vuex 目录...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'vuex')) === false) {
            spinner.warn(chalk.yellow('src/vuex 目录不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'vuex'), path.join(myConfig.rootDir, 'src', 'vuex'));
            spinner.succeed(chalk.green('src/vuex 目录已修复...'));
        } else {
            spinner.succeed(chalk.green('src/vuex 目录检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/vuex/index.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'vuex', 'index.js')) === false) {
            spinner.warn(chalk.yellow('src/vuex/index.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'vuex', 'index.js'), path.join(myConfig.rootDir, 'src', 'vuex', 'index.js'));
            spinner.succeed(chalk.green('src/vuex/index.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/vuex/index.js 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/App.vue 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'App.vue')) === false) {
            spinner.warn(chalk.yellow('src/App.vue 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'App.vue'), path.join(myConfig.rootDir, 'src', 'App.vue'));
            spinner.succeed(chalk.green('src/App.vue 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/App.vue 文件检测通过...'));
        }

        // ======================================================
        spinner.info(chalk.white('检测 src/main.js 文件...'));
        if (fs.existsSync(path.join(myConfig.rootDir, 'src', 'main.js')) === false) {
            spinner.warn(chalk.yellow('src/main.js 文件不存在，正在修复...'));
            fs.copySync(path.join(myConfig.cacheDir, 'temp', 'src', 'main.js'), path.join(myConfig.rootDir, 'src', 'main.js'));
            spinner.succeed(chalk.green('src/main.js 文件已修复...'));
        } else {
            spinner.succeed(chalk.green('src/main.js 文件检测通过...'));
        }
    } catch (err) {
        spinner.fail(chalk.red('标准模板下载失败'));
        spinner.stop();
        console.log(err);
    }
};
