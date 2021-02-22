// 自带模块
let path = require('path');
// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let { merge } = require('webpack-merge');
let shell = require('shelljs');
let { table } = require('table');
let chalk = require('chalk');
let ora = require('ora');
let tool = require('../tool.js');
// 配置相关
let myConfig = require('../../.yipack/webpack.config.my.js');
let yipackPackage = require('../../package.json');
let yipackConfig = require('../../.yipack/yipack.config.js');
module.exports = async function newComp(cmd) {
    console.log(chalk.blueBright('yipack all 查看所有命令'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack dev 启动开发环境'));
    console.log(chalk.green('yipack dev --env <环境配置文件名称>'));
    console.log(chalk.green('yipack dev --write 编译打包写入硬盘'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack build 打包编译项目'));
    console.log(chalk.green('yipack build --env 环境配置文件名称 '));
    console.log(chalk.green('yipack build --analyzer 启动分析模式'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack new 创建元素'));
    console.log(chalk.green('yipack new -f,--filter <过滤器名称> 创建全局过滤器'));
    console.log(chalk.green('yipack new -d,--directive <指令名称> 创建全局指令'));
    console.log(chalk.green('yipack new -p,--page <页面名称> 创建页面'));
    console.log(chalk.green('yipack new -c,--comp <组件名称> 创建全局组件'));
    console.log(chalk.green('yipack new --sp,--sub-page <子页面名称> 创建子页面'));
    console.log(chalk.green('yipack new --sv,--sub-view <子视图名称> 创建子视图'));
    console.log(chalk.green('yipack new --page <页面名称> -c,--comp <组件名称> 创建页面组件'));
    console.log(chalk.green('yipack new --page <页面名称> --sp,--sub-page <子页面名称> -c,--comp <组件名称> 创建子页面组件'));
    console.log(chalk.green('yipack new --page <页面名称> --sv,--sub-view <子视图名称> -c,--comp <组件名称> 创建子视图组件'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack rename 重命名元素'));
    console.log(chalk.green('yipack rename -p,--page <页面名称> --np,--new-page <新页面名称> 重命名页面'));
    console.log(chalk.green('yipack rename -c,--comp <组件名称> --nc,--new-comp <新组件名称> 重命名全局组件'));
    console.log(chalk.green('yipack rename -p,--page <页面名称> --sp,--sub-page <子页面名称> --nsp,--new-sub-page <新子页面名称> 重命名子页面'));
    console.log(chalk.green('yipack rename -p,--page <页面名称> --sv,--sub-view <子视图名称> --nsv,--new-sub-view <新子视图名称> 重命名子视图'));
    console.log(chalk.green('yipack rename -p,--page <页面名称> -c,--comp <组件名称> --nc,--new-comp <新组件名称> 重命名页面组件'));
    console.log(chalk.green('yipack rename -p,--page <页面名称> --sp,--sub-page <子页面名称> -c,--comp <组件名称> --nc,--new-comp <新组件名称> 重命名子页面组件'));
    console.log(chalk.green('yipack rename -p,--page <页面名称> --sv,--sub-view <子视图名称> -c,--comp <组件名称> --nc,--new-comp <新组件名称> 重命名子视图组件'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack tpl 初始化项目模板'));
    console.log(chalk.green('yipack tpl --type=init 初始化通用前端项目模板'));
    console.log(chalk.green('yipack tpl --type=admin 初始化后台项目模板'));
    console.log(chalk.green('yipack tpl --type=api 初始化接口项目模板'));
    console.log(chalk.green('yipack tpl --type=mini 初始化uniapp项目模板'));
    console.log(chalk.green('yipack tpl --type=blog 初始化博客项目模板'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack fix 修复元素'));
    console.log(chalk.green('yipack tpl --type=readme 修复说明文件'));
    console.log('------------------------------');
    console.log(chalk.blueBright('yipack show 查看项目相关信息'));
    console.log(chalk.green('yipack show --pages 查看所有页面'));
    console.log(chalk.green('yipack show --comps 查看所有全局组件'));
};
