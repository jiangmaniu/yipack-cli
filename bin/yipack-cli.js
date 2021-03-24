#!/usr/bin/env node
// 自带模块
let path = require('path');
// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let commander = require('commander');
let program = new commander.Command();
let shell = require('shelljs');
let { table } = require('table');
let execa = require('execa');
// 配置相关
let myConfig = require('../.yipack/webpack.config.my.js');
let yipackPackage = require('../package.json');
let yipackConfig = require('../.yipack/yipack.config.js');
let tool = require('./tool.js');
const { exec } = require('child_process');
// TODO: 还需要严格验证yipack.config.js文件的有效性
program
    .storeOptionsAsProperties(false) // ；屏蔽参数作为cmd的属性
    .allowExcessArguments(false) // 严格控制参数顺序
    .name('yipack')
    .usage('<命令> [参数]');
program
    .command('dev')
    .addOption(new commander.Option('--env <配置文件名称>', '指定环境配置文件').choices(tool.getEnvNames()))
    .option('--write', '写入硬盘', false)
    .description('启动开发环境')
    .action((cmd) => {
        require('./dev/index.js')(cmd);
    });

program
    .command('build')
    .addOption(new commander.Option('--env <配置文件名称>', '指定环境配置文件').choices(tool.getEnvNames()))
    .option('--analyzer', '启动分析模式', false)
    .description('打包编译项目')
    .action((cmd) => {
        require('./build/index.js')(cmd);
    });

/**
 * 创建命令
 */
program
    .command('new')
    .option('-p,--page <name>', '创建页面')
    .option('-c,--comp <name>', '创建全局组件')
    .option('-f,--filter <name>', '创建全局过滤器')
    .option('-d,--directive <name>', '创建全局指令')
    .option('-i,--api <name>', '创建通用接口')
    .description('创建元素')
    .action((cmd) => {
        if (cmd.api) {
            require('./new/api.js')(cmd);
            return;
        }
        if (cmd.filter) {
            require('./new/filter.js')(cmd);
            return;
        }
        if (cmd.directive) {
            require('./new/directive.js')(cmd);
            return;
        }
        if (cmd.comp && !cmd.page && !cmd.subPage && !cmd.subView) {
            require('./new/comp.js')(cmd);
            return;
        }
        if (cmd.page) {
            require('./new/page.js')(cmd);
            return;
        }
    });
// TODO: 重命名元素
program
    .command('rename')
    .option('-p,--page <原页面名称>', '原页面')
    .option('-c,--comp <原组件名称>', '原组件')
    .option('--nc,--new-comp <新组件名称>', '新组件')
    .description('修改元素')
    .action((cmd) => {
        // 如果指定了页面参数
        if (cmd.page) {
            // 如果重命名子页面
            if (cmd.subPage) {
                require('./rename/subPage.js')(cmd);
                return;
            }
            // 如果重命名子视图
            if (cmd.subView) {
                require('./rename/subView.js')(cmd);
                return;
            }
            // 如果重命名页面
            require('./rename/page.js')(cmd);
            return;
        }
        if (cmd.comp && cmd.newComp) {
            require('./rename/comp.js')(cmd);
            return;
        }
    });
program
    .command('show')
    .option('-p,--pages', '查看所有页面')
    .option('-c,--comps', '查看所有全局组件')
    .description('查看项目相关信息')
    .action((cmd) => {
        if (cmd.pages) {
            require('./show/pages.js')(cmd);
        }
        if (cmd.comps) {
            require('./show/comps.js')(cmd);
        }
    });

/**
 * 查看所有命令
 */
program
    .command('all')
    .description('查看所有命令')
    .action((cmd) => {
        require('./all/index.js')(cmd);
    });
program
    .command('tpl')
    .addOption(new commander.Option('-t,--type <模板名称>', '初始化项目模板').choices(['init', 'admin', 'api', 'uniapp', 'blog']))
    .description('初始化项目模板')
    .action((cmd) => {
        if (cmd.type === 'admin') {
            require('./tpl/admin.js')();
            return;
        }
        if (cmd.type === 'api') {
            require('./tpl/api.js')();
            return;
        }
        if (cmd.type === 'init') {
            require('./tpl/init.js')();
            return;
        }
        if (cmd.type === 'uniapp') {
            require('./tpl/uniapp.js')();
            return;
        }
        if (cmd.type === 'blog') {
            require('./tpl/blog.js')();
            return;
        }
    });

program
    //
    .command('doctor')
    .option('-t,--type', '检测元素')
    .description('检测元素')
    .action((cmd) => {
        require('./doctor/all.js')(cmd);
    });
program
    //
    .command('lint')
    .option('-t,--type <规范类型>', '规范类型')
    .description('检测规范')
    .action((cmd) => {
        // 检测脚本规范
        if (cmd.type === 'script') {
            require('./lint/script.js')(cmd);
            return;
        }

        // 检测样式规范
        if (cmd.type === 'style') {
            require('./lint/style.js')(cmd);
            return;
        }

        // 检测所有规范
        require('./lint/all.js')(cmd);
        return;
    });
program
    //
    .command('format <file>')
    .description('格式化文件')
    .action((file) => {
        // 检测所有规范
        require('./format/all.js')(file);
        return;
    });
program
    //
    .command('fix')
    .option('-t,--type <元素类型名>', '修复元素')
    .description('修复元素')
    .action((cmd) => {
        if (cmd.type === 'all') {
            require('./fix/all.js')(cmd);
        }
        if (cmd.type === 'readme') {
            require('./fix/readme.js')(cmd);
        }
    });
program
    //
    .command('test')
    .description('测试')
    .action(async (cmd) => {
        let dd = await execa.commandSync('ls -al --color=always');
        process.stdout.write(dd.stdout);
    });
program
    //
    .command('print')
    .description('测试')
    .action((cmd) => {
        console.log('test');
    });
program.version(yipackPackage.version, '-v, --version', '显示yipack版本');
program.helpInformation();
program.on('--help', () => {
    // let data = [
    //     ["查看所有命令", "yipack all"],
    //     ["查看子命令帮助", "yipack <子命令> --help"],
    //     ["查看官方文档", "https://chensuiyi.com"],
    //     ["启动开发环境", "yipack dev [参数]"],
    //     ["打包编译项目", "yipack build [参数]"],
    //     ["创建元素", "yipack new [参数]"],
    //     ["初始化项目模板", "yipack tpl <--type=模板名称>"],
    //     ["查看项目相关信息", "yipack show [参数]"],
    //     ["检测项目健康性", "yipack doctor [参数]"],
    // ];
    // console.log(table(data));
});
program.parse(process.argv);
