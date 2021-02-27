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
    let rootNames = tool.getNames(cmd.page);
    let names = tool.getAllNames(rootNames, {}, {}, {});
    // 创建目录
    let pageDirPath = path.join(myConfig.srcDir, 'pages', rootNames.camelCaseName);
    // 如果页面目录还不存在，则创建页面目录
    if (fs.existsSync(pageDirPath) === false) {
        fs.ensureDirSync(pageDirPath);

        // 创建页面
        let htmlFilePath = path.join(pageDirPath, 'index.vue');
        let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageHtml.js')))(names);
        fs.outputFileSync(htmlFilePath, htmlFileData);
        spinner.succeed(chalk.green('页面创建成功'));

        // 创建页面说明
        let readmeFilePath = path.join(pageDirPath, 'readme.md');
        let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(names);
        fs.outputFileSync(readmeFilePath, readmeFileData);
        spinner.succeed(chalk.green('页面说明创建成功'));

        // 创建页面路由
        let routeFilePath = path.join(pageDirPath, 'route.js');
        let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageRoute.js')))(names);
        fs.outputFileSync(routeFilePath, routeFileData);
        spinner.succeed(chalk.green('页面路由创建成功'));

        // 创建页面接口
        let apiFilePath = path.join(pageDirPath, 'api.js');
        let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(names);
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
        let names = tool.getAllNames(rootNames, subNames, {}, compNames, { subName: 'subPages' });
        let subDirectory = path.join(pageDirPath, 'subPages', subNames.camelCaseName);
        // 创建二级页面
        let htmlFilePath = path.join(subDirectory, 'index.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            // 创建子页面框架
            let layoutDirectory = path.join(subDirectory, 'layout');
            fs.ensureDirSync(layoutDirectory);
            let layoutFilePath = path.join(layoutDirectory, 'index.vue');
            let layoutFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subLayout.js')))(names);
            fs.outputFileSync(layoutFilePath, layoutFileData);
            spinner.succeed(chalk.green('子页面框架创建成功'));

            // 创建子页面
            let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subPageHtml.js')))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green('子页面创建成功'));

            // 创建子页面说明
            let readmeFilePath = path.join(subDirectory, 'readme.md');
            let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green('子页面说明创建成功'));

            // 创建子页面路由
            let routeFilePath = path.join(subDirectory, 'subPageRoute.js');
            let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subPageRoute.js')))(names);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green('子页面路由创建成功'));

            // 创建子页面接口
            let apiFilePath = path.join(subDirectory, 'api.js');
            let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(rootNames);
            fs.outputFileSync(apiFilePath, apiFileData);
            spinner.succeed(chalk.green('子页面接口创建成功'));
        } else {
            spinner.warn(chalk.green('子页面已存在'));
        }

        if (cmd.tailPage) {
            let compNames = null;
            if (cmd.comp) {
                compNames = tool.getNames(cmd.comp);
            }
            let tailNames = tool.getNames(cmd.tailPage);
            let names = tool.getAllNames(rootNames, subNames, tailNames, compNames, { subName: 'subPages', subType: 'sp', tailName: 'tailPages', tailType: 'tp' });
            let tailDirectory = path.join(subDirectory, 'tailPages', tailNames.camelCaseName);
            // 创建二级页面
            let htmlFilePath = path.join(tailDirectory, 'index.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子页面
                let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailPageHtml.js')))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('尾页面创建成功'));

                // 创建子页面说明
                let readmeFilePath = path.join(tailDirectory, 'readme.md');
                let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('尾页面说明创建成功'));

                // 创建子页面路由
                let routeFilePath = path.join(tailDirectory, 'tailPageRoute.js');
                let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailPageRoute.js')))(names);
                fs.outputFileSync(routeFilePath, routeFileData);
                spinner.succeed(chalk.green('尾页面路由创建成功'));

                // 创建子页面接口
                let apiFilePath = path.join(tailDirectory, 'api.js');
                let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(rootNames);
                fs.outputFileSync(apiFilePath, apiFileData);
                spinner.succeed(chalk.green('尾页面接口创建成功'));
                // 如果需要创建子组件
                if (cmd.comp) {
                    // 创建子页面组件目录
                    let compDirPath = path.join(tailDirectory, 'comps', compNames.camelCaseName);
                    if (fs.existsSync(compDirPath) === false) {
                        fs.ensureDirSync(compDirPath);
                    }
                    // 创建组件
                    let htmlFilePath = path.join(compDirPath, 'index.vue');
                    if (fs.existsSync(htmlFilePath) === false) {
                        // 创建子页面组件
                        let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailPageCompHtml.js')))(names);
                        fs.outputFileSync(htmlFilePath, htmlFileData);
                        spinner.succeed(chalk.green('尾页面组件创建成功'));

                        // 创建子页面组件说明
                        let readmeFilePath = path.join(compDirPath, 'readme.md');
                        let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                        fs.outputFileSync(readmeFilePath, readmeFileData);
                        spinner.succeed(chalk.green('尾页面组件说明创建成功'));
                    } else {
                        spinner.warn(chalk.green('尾页面组件已存在'));
                    }
                    return;
                }
            } else {
                spinner.warn(chalk.green('尾页面已存在'));
            }
            return;
        }

        if (cmd.tailView) {
            let compNames = null;
            if (cmd.comp) {
                compNames = tool.getNames(cmd.comp);
            }
            let tailNames = tool.getNames(cmd.tailView);
            let names = tool.getAllNames(rootNames, subNames, tailNames, compNames, { subName: 'subPages', subType: 'sp', tailName: 'tailViews', tailType: 'tv' });
            let tailDirectory = path.join(subDirectory, 'tailViews', tailNames.camelCaseName);
            // 创建二级页面
            let htmlFilePath = path.join(tailDirectory, 'index.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子页面
                let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailViewHtml.js')))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('尾页面创建成功'));

                // 创建子页面说明
                let readmeFilePath = path.join(tailDirectory, 'readme.md');
                let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('尾页面说明创建成功'));

                // 创建子页面路由
                let routeFilePath = path.join(tailDirectory, 'tailViewRoute.js');
                let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailViewRoute.js')))(names);
                fs.outputFileSync(routeFilePath, routeFileData);
                spinner.succeed(chalk.green('尾页面路由创建成功'));

                // 创建子页面接口
                let apiFilePath = path.join(tailDirectory, 'api.js');
                let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(rootNames);
                fs.outputFileSync(apiFilePath, apiFileData);
                spinner.succeed(chalk.green('尾页面接口创建成功'));
                // 如果需要创建子组件
                if (cmd.comp) {
                    // 创建子页面组件目录
                    let compDirPath = path.join(tailDirectory, 'comps', compNames.camelCaseName);
                    if (fs.existsSync(compDirPath) === false) {
                        fs.ensureDirSync(compDirPath);
                    }
                    // 创建组件
                    let htmlFilePath = path.join(compDirPath, 'index.vue');
                    if (fs.existsSync(htmlFilePath) === false) {
                        // 创建子页面组件
                        let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailViewCompHtml.js')))(names);
                        fs.outputFileSync(htmlFilePath, htmlFileData);
                        spinner.succeed(chalk.green('尾页面组件创建成功'));

                        // 创建子页面组件说明
                        let readmeFilePath = path.join(compDirPath, 'readme.md');
                        let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                        fs.outputFileSync(readmeFilePath, readmeFileData);
                        spinner.succeed(chalk.green('尾页面组件说明创建成功'));
                    } else {
                        spinner.warn(chalk.green('尾页面组件已存在'));
                    }
                    return;
                }
            } else {
                spinner.warn(chalk.green('尾页面已存在'));
            }
            return;
        }

        // 如果需要创建子组件
        if (cmd.comp) {
            // 创建子页面组件目录
            let compDirPath = path.join(subDirectory, 'comps', compNames.camelCaseName);
            if (fs.existsSync(compDirPath) === false) {
                fs.ensureDirSync(compDirPath);
            }
            // 创建组件
            let htmlFilePath = path.join(compDirPath, 'index.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子页面组件
                let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subPageCompHtml.js')))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('子页面组件创建成功'));

                // 创建子页面组件说明
                let readmeFilePath = path.join(compDirPath, 'readme.md');
                let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('子页面组件说明创建成功'));
            } else {
                spinner.warn(chalk.green('子页面组件已存在'));
            }
            return;
        }
        return;
    }

    // 创建子视图
    if (cmd.subView) {
        let compNames = null;
        if (cmd.comp) {
            compNames = tool.getNames(cmd.comp);
        }
        let subNames = tool.getNames(cmd.subView);
        let names = tool.getAllNames(rootNames, subNames, {}, compNames);
        let currentDirectory = path.join(pageDirPath, 'subViews', subNames.camelCaseName);
        // 创建二级页面
        let htmlFilePath = path.join(currentDirectory, 'index.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            // 创建子视图框架
            let layoutDirectory = path.join(subDirectory, 'layout');
            fs.ensureDirSync(layoutDirectory);
            let layoutFilePath = path.join(layoutDirectory, 'index.vue');
            let layoutFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subLayout.js')))(names);
            fs.outputFileSync(layoutFilePath, layoutFileData);
            spinner.succeed(chalk.green('子视图框架创建成功'));
            // 创建子视图
            let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subViewHtml.js')))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green('子视图创建成功'));

            // 创建子视图说明
            let readmeFilePath = path.join(currentDirectory, 'readme.md');
            let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green('子视图说明创建成功'));

            // 创建子视图路由
            let routeFilePath = path.join(currentDirectory, 'subViewRoute.js');
            let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subViewRoute.js')))(names);
            fs.outputFileSync(routeFilePath, routeFileData);
            spinner.succeed(chalk.green('子视图路由创建成功'));

            // 创建子视图接口
            let apiFilePath = path.join(currentDirectory, 'api.js');
            let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(rootNames);
            fs.outputFileSync(apiFilePath, apiFileData);
            spinner.succeed(chalk.green('子视图接口创建成功'));
        } else {
            spinner.warn(chalk.green('子视图已存在'));
        }

        if (cmd.tailPage) {
            let compNames = null;
            if (cmd.comp) {
                compNames = tool.getNames(cmd.comp);
            }
            let tailNames = tool.getNames(cmd.tailPage);
            let names = tool.getAllNames(rootNames, subNames, tailNames, compNames, { subName: 'subViews', subType: 'sv', tailName: 'tailPages', tailType: 'tp' });
            let tailDirectory = path.join(subDirectory, 'tailPages', tailNames.camelCaseName);
            // 创建二级页面
            let htmlFilePath = path.join(tailDirectory, 'index.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子页面
                let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailPageHtml.js')))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('尾页面创建成功'));

                // 创建子页面说明
                let readmeFilePath = path.join(tailDirectory, 'readme.md');
                let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('尾页面说明创建成功'));

                // 创建子页面路由
                let routeFilePath = path.join(tailDirectory, 'routePage.js');
                let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailPageRoute.js')))(names);
                fs.outputFileSync(routeFilePath, routeFileData);
                spinner.succeed(chalk.green('尾页面路由创建成功'));

                // 创建子页面接口
                let apiFilePath = path.join(tailDirectory, 'api.js');
                let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(rootNames);
                fs.outputFileSync(apiFilePath, apiFileData);
                spinner.succeed(chalk.green('尾页面接口创建成功'));
                // 如果需要创建子组件
                if (cmd.comp) {
                    // 创建子页面组件目录
                    let compDirPath = path.join(tailDirectory, 'comps', compNames.camelCaseName);
                    if (fs.existsSync(compDirPath) === false) {
                        fs.ensureDirSync(compDirPath);
                    }
                    // 创建组件
                    let htmlFilePath = path.join(compDirPath, 'index.vue');
                    if (fs.existsSync(htmlFilePath) === false) {
                        // 创建子页面组件
                        let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailPageCompHtml.js')))(names);
                        fs.outputFileSync(htmlFilePath, htmlFileData);
                        spinner.succeed(chalk.green('尾页面组件创建成功'));

                        // 创建子页面组件说明
                        let readmeFilePath = path.join(compDirPath, 'readme.md');
                        let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                        fs.outputFileSync(readmeFilePath, readmeFileData);
                        spinner.succeed(chalk.green('尾页面组件说明创建成功'));
                    } else {
                        spinner.warn(chalk.green('尾页面组件已存在'));
                    }
                    return;
                }
            } else {
                spinner.warn(chalk.green('尾页面已存在'));
            }
            return;
        }

        if (cmd.tailView) {
            let compNames = null;
            if (cmd.comp) {
                compNames = tool.getNames(cmd.comp);
            }
            let tailNames = tool.getNames(cmd.tailView);
            let names = tool.getAllNames(rootNames, subNames, tailNames, compNames, { subName: 'subViews', subType: 'sv', tailName: 'tailViews', tailType: 'tv' });
            let tailDirectory = path.join(subDirectory, 'tailViews', tailNames.camelCaseName);
            // 创建二级页面
            let htmlFilePath = path.join(tailDirectory, 'index.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子页面
                let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailViewHtml.js')))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('尾视图创建成功'));

                // 创建子页面说明
                let readmeFilePath = path.join(tailDirectory, 'readme.md');
                let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('尾视图说明创建成功'));

                // 创建子页面路由
                let routeFilePath = path.join(tailDirectory, 'routePage.js');
                let routeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailViewRoute.js')))(names);
                fs.outputFileSync(routeFilePath, routeFileData);
                spinner.succeed(chalk.green('尾视图路由创建成功'));

                // 创建子页面接口
                let apiFilePath = path.join(tailDirectory, 'api.js');
                let apiFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'api.js')))(rootNames);
                fs.outputFileSync(apiFilePath, apiFileData);
                spinner.succeed(chalk.green('尾视图接口创建成功'));
                // 如果需要创建子组件
                if (cmd.comp) {
                    // 创建子页面组件目录
                    let compDirPath = path.join(tailDirectory, 'comps', compNames.camelCaseName);
                    if (fs.existsSync(compDirPath) === false) {
                        fs.ensureDirSync(compDirPath);
                    }
                    // 创建组件
                    let htmlFilePath = path.join(compDirPath, 'index.vue');
                    if (fs.existsSync(htmlFilePath) === false) {
                        // 创建子页面组件
                        let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'tailViewCompHtml.js')))(names);
                        fs.outputFileSync(htmlFilePath, htmlFileData);
                        spinner.succeed(chalk.green('尾视图组件创建成功'));

                        // 创建子页面组件说明
                        let readmeFilePath = path.join(compDirPath, 'readme.md');
                        let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                        fs.outputFileSync(readmeFilePath, readmeFileData);
                        spinner.succeed(chalk.green('尾视图组件说明创建成功'));
                    } else {
                        spinner.warn(chalk.green('尾视图组件已存在'));
                    }
                    return;
                }
            } else {
                spinner.warn(chalk.green('尾视图已存在'));
            }
            return;
        }

        // 如果需要创建子组件
        if (cmd.comp) {
            // 创建子页面组件目录
            let compDirPath = path.join(currentDirectory, 'comps', compNames.camelCaseName);
            // 确保子视图组件目录存在
            if (fs.existsSync(compDirPath) === false) {
                fs.ensureDirSync(compDirPath);
            }

            let htmlFilePath = path.join(compDirPath, 'index.vue');
            if (fs.existsSync(htmlFilePath) === false) {
                // 创建子视图组件
                let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'subViewCompHtml.js')))(names);
                fs.outputFileSync(htmlFilePath, htmlFileData);
                spinner.succeed(chalk.green('子视图组件创建成功'));

                // 创建子页面组件说明
                let readmeFilePath = path.join(compDirPath, 'readme.md');
                let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(rootNames);
                fs.outputFileSync(readmeFilePath, readmeFileData);
                spinner.succeed(chalk.green('子视图组件说明创建成功'));
            } else {
                spinner.warn(chalk.green('子视图组件已存在'));
            }
        }
        return;
    }

    // 创建页面组件
    if (cmd.comp && !cmd.subPage && !cmd.subView) {
        let compNames = tool.getNames(cmd.comp);
        let names = tool.getAllNames(rootNames, {}, {}, compNames);

        // 创建页面组件目录
        let compDirPath = path.join(pageDirPath, 'comps', compNames.camelCaseName);
        if (fs.existsSync(compDirPath) === false) {
            fs.ensureDirSync(compDirPath);
        }
        let htmlFilePath = path.join(compDirPath, 'index.vue');
        if (fs.existsSync(htmlFilePath) === false) {
            // 创建页面组件
            let htmlFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'pageCompHtml.js')))(names);
            fs.outputFileSync(htmlFilePath, htmlFileData);
            spinner.succeed(chalk.green('页面组件创建成功'));

            // 创建页面组件说明
            let readmeFilePath = path.join(compDirPath, 'readme.md');
            let readmeFileData = _.template(require(path.join(myConfig.webpackDir, 'template', 'readme.js')))(names);
            fs.outputFileSync(readmeFilePath, readmeFileData);
            spinner.succeed(chalk.green('页面组件说明创建成功'));
        } else {
            spinner.warn(chalk.green('页面组件已存在'));
        }
    }
};
