#!/usr/bin/env node
const download = require("download-git-repo");
download("https://gitee.com:banshiweichen/yipack#master", "./", { clone: true }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("yipack项目下载成功");
    }
});
