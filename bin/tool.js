// 自带模块
let path = require("path");
// 第三方模块
let _ = require("lodash");
let download = require("download-git-repo");
let fs = require("fs-extra");
// 配置相关
let myConfig = require("../.yipack/webpack.config.my.js");
let yipackPackage = require("../package.json");
let yipackConfig = require("../.yipack/yipack.config.js");
// 下载项目
exports.downloadProject = async function downloadProject(gitUrl) {
    return new Promise((resolve, reject) => {
        download(gitUrl, myConfig.tempDir, { clone: true }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
exports.getNames = function getNames(name) {
    // 页面名称转化 HelL_o-wOrld
    let lowerCaseName = _.toLower(name); // hell_o-world
    let kebabCaseName = _.kebabCase(lowerCaseName); // hell-o-world
    let camelCaseName = _.camelCase(kebabCaseName); // hellOWorld
    let startCaseName = _.replace(_.startCase(camelCaseName), /\s+/g, ""); // HellOWorld

    return {
        lowerCaseName,
        kebabCaseName,
        startCaseName,
        camelCaseName,
    };
};

exports.getEnvNames = function getEnvNames() {
    let arrs = [];
    let envPath = path.resolve(myConfig.srcDir, "env");
    if (fs.existsSync(envPath)) {
        let envs = fs.readdirSync(envPath, { withFileTypes: true });
        envs.forEach((file) => {
            if (file.isFile() === true) {
                arrs.push(path.basename(file.name, ".env"));
            }
        });
        return arrs;
    } else {
        return [];
    }
};
