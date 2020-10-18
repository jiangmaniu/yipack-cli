#!/usr/bin/env node
const download = require("download-git-repo");
const fs = require("fs-extra");
const path = require("path");
const tempDir = path.resolve(process.cwd(), "temp");
const initDir = path.resolve(process.cwd());
// 下载项目
async function downloadProject() {
    return new Promise((resolve, reject) => {
        download("https://gitee.com:banshiweichen/yipack#master", tempDir, { clone: true }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function init() {
    try {
        fs.removeSync(tempDir);
        fs.ensureDirSync(tempDir);
        await downloadProject();
        fs.copySync(tempDir, initDir, { overwrite: true });
        fs.removeSync(tempDir);
        console.log("易打包下载成功");
    } catch (err) {
        console.log("易打包下载失败");
        console.log(err);
    }
}
init();
