let path = require("path");
let cliDir = path.join(__dirname, "..");
let rootDir = path.join(process.cwd());
let srcDir = path.join(rootDir, "src");
let distDir = path.join(rootDir, "dist");
let webpackDir = path.join(rootDir, ".yipack");
let tempDir = path.join(rootDir, "temp");
let cacheDir = path.join(rootDir, ".cache");
module.exports = {
    cliDir,
    rootDir,
    srcDir,
    distDir,
    webpackDir,
    cacheDir,
    tempDir,
};
