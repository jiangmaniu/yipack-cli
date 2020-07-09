#!/usr/bin/env node
const download = require("download-git-repo");
const fs = require("fs-extra");
const path = require("path");
const tempDir = path.resolve(process.cwd(), "temp");
function _download() {
    return new Promise((resole, reject) => {
        download("https://gitee.com:banshiweichen/yipack#master", tempDir, { clone: true }, function (err) {
            if (err) {
                reject(err);
            } else {
                fs.copySync(tempDir, path.resolve(tempDir, ".."), { overwrite: true });
                fs.removeSync(tempDir);
                console.log("yipack下载成功");
                resole();
            }
        });
    });
}

async function execute() {
    fs.removeSync(tempDir);
    fs.ensureDirSync(tempDir);
    await _download();
}
execute();
