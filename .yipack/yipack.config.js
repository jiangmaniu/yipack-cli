// 自带模块
let os = require('os');
let path = require('path');
let fs = require('fs-extra');
let _ = require('lodash');
let myConfig = require('../.yipack/webpack.config.my.js');
let projectConfigPath = path.join(myConfig.rootDir, 'yipack.config.js');
let yipackConfig = {
    version: 2,
    type: 'init',
    /**
     * 描述：是否开启手机自适应模式
     * 默认值：false
     */
    px2viewport: {
        enable: false,
        options: {}
    },
    providePlugin: {},
    externals: {},
    // 开发配置
    devServer: {},
    eslint: {
        options: {
            // 检测根目录
            cwd: myConfig.srcDir,
            // 检测的扩展文件
            extensions: ['.js', '.vue'],
            // 解析插件的相对路径，指定为yipck-cli目录，可以减少项目的依赖
            resolvePluginsRelativeTo: myConfig.cliDir,
            // 是否自动修复
            fix: false,
            // 修复的类型
            fixTypes: ['problem', 'suggestion', 'layout'],
            // 是否缓存
            cache: true,
            cacheLocation: path.join(myConfig.rootDir, '.cache', '.eslintcache'),
            overrideConfigFile: path.join(myConfig.cliDir, '.eslintrc.js'),
            // 只检测改变的文件，一开始启动不检测
            lintDirtyModulesOnly: true,
            // 并行数量
            threads: os.cpus().length
        }
    },
    stylelint: {
        options: {
            configFile: path.join(myConfig.cliDir, 'stylelint.config.js'),
            context: myConfig.srcDir,
            configBasedir: myConfig.cliDir,
            cache: true,
            fix: true,
            cacheLocation: path.join(myConfig.rootDir, '.cache'),
            // 只检测改变的文件
            lintDirtyModulesOnly: true
        }
    }
};
if (fs.existsSync(projectConfigPath)) {
    // 项目yipack配置参数
    let projectConfig = require(projectConfigPath);
    if (_.isObject(projectConfig)) {
        yipackConfig = _.merge(yipackConfig, projectConfig);
    }
}
module.exports = yipackConfig;
