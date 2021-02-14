// 自带模块
let path = require('path');
// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let webpack = require('webpack');
let shell = require('shelljs');
let { table } = require('table');
// 配置相关
let myConfig = require('../../.yipack/webpack.config.my.js');
let yipackPackage = require('../../package.json');
let yipackConfig = require('../../.yipack/yipack.config.js');
let rootFileNames = [''];
module.exports = async function build(cmd) {
    if (cmd.type === 'all') {
    }
};
