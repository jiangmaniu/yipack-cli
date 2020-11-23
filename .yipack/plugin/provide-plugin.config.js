// 自带模块
let _ = require("lodash");
// 自带库枚举
let pluginMap = {
    lodash: {
        _: "lodash",
    },
    dayjs: {
        dayjs: "dayjs",
    },
};
let yipackConfig = require("../yipack.config.js");
let propObject = {};
if (_.isObject(yipackConfig.lib)) {
    for (let prop in yipackConfig.lib) {
        if (yipackConfig.lib.hasOwnProperty(prop) && pluginMap[prop]) {
            propObject = { ...propObject, ...pluginMap[prop] };
        }
    }
}
module.exports = propObject;
