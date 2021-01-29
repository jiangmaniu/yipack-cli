// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let fs = require("fs-extra");
let chalk = require("chalk");
let ora = require("ora");
let tool = require("../tool.js");
// 配置相关
let myConfig = require("../../.yipack/webpack.config.my.js");
let yipackPackage = require("../../package.json");
let yipackConfig = require("../../.yipack/yipack.config.js");
module.exports = async function newComp(cmd) {
    let spinner = ora();
    let names = tool.getNames(cmd.comp);
    // 创建组件
    let htmlFilePath = path.resolve(myConfig.srcDir, "comps", names.camelCaseName, "index.vue");
    if (fs.existsSync(htmlFilePath) === false) {
        let htmlFileData = _.template(require("../../.yipack/template/compHtml.js"))(names);
        fs.outputFileSync(htmlFilePath, htmlFileData);
        spinner.succeed(chalk.green("组件创建成功"));
    } else {
        spinner.warn(chalk.green("组件已存在"));
    }
};
