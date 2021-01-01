// 自带模块
let path = require("path");
let fs = require("fs-extra");
let _ = require("lodash");
let myConfig = require("../.yipack/webpack.config.my.js");
let projectConfigPath = path.resolve(myConfig.rootDir, "yipack.config.js");
let yipackConfig = {
    /**
     * 描述：是否开启手机自适应模式
     * 默认值：false
     */
    px2viewport: {
        enable: false,
    },
    providePlugin: {},
    // 开发配置
    devServer: {},
};
if (fs.existsSync(projectConfigPath)) {
    // 项目yipack配置参数
    let projectConfig = require(projectConfigPath);
    if (_.isObject(projectConfig)) {
        yipackConfig = _.merge(yipackConfig, projectConfig);
    }
}
module.exports = yipackConfig;
