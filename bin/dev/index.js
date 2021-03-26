// 自带模块
let path = require('path');
// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let webpack = require('webpack');
let { merge } = require('webpack-merge');
let portfinder = require('portfinder');
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let updateNotifier = require('update-notifier');
let webpackDevServer = require('webpack-dev-server');
let shell = require('shelljs');
let { table } = require('table');
// 配置相关
let myConfig = require('../../.yipack/webpack.config.my.js');
let yipackPackage = require('../../package.json');
let yipackConfig = require('../../.yipack/yipack.config.js');
module.exports = async function dev(cmd) {
    shell.env['NODE_MODE'] = 'development';
    shell.env['NODE_ENV_FILE'] = cmd.env;
    shell.env['NODE_COUNT'] = 'start';
    updateNotifier({ pkg: yipackPackage }).notify();
    let webpackConfig = require(path.join(myConfig.cliDir, '.yipack', 'webpack.config.dev.js'));
    let currentDevServer = {
        host: '127.0.0.1',
        // noInfo: false,
        contentBase: myConfig.distDir,
        clientLogLevel: 'debug',
        quiet: false,
        hot: true,
        inline: true,
        publicPath: '/',
        compress: true,
        // lazy: false,
        hotOnly: true,
        // 全屏显示错误
        overlay: false,
        index: 'index.html',
        injectHot: true,
        liveReload: false,
        // noInfo: false,
        open: false,
        // stats: "normal",
        stats: 'errors-warnings',
        watchContentBase: false,
        writeToDisk: cmd.write
    };
    // 获取端口
    let port = await portfinder.getPortPromise({ port: 8000, stopPort: 9000 });
    port = yipackConfig.devServer.port || port;
    // 合并开发服务配置参数
    let devServerConfig = merge(currentDevServer, yipackConfig.devServer);
    // 判断协议类型
    let protocol = devServerConfig.https === true ? 'https' : 'http';
    webpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`应用已启动：${protocol}://${devServerConfig.host}:${port}`],
                notes: ['使用文档请访问网址 [ https://yipack-cli.com ]']
            }
        })
    );

    // 模块热替换
    webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
    let compiler = webpack(webpackConfig);
    let server = new webpackDevServer(compiler, devServerConfig);

    server.listen(port, devServerConfig.host, () => {
        // console.log(`开发环境已启动：${protocol}://${devServerConfig.host}:${port}`);
    });
};
