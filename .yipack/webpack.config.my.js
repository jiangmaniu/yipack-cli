let path = require("path");
let cliDir = path.resolve(__dirname, "..");
let rootDir = path.resolve(process.cwd());
let srcDir = path.resolve(rootDir, "src");
let distDir = path.resolve(rootDir, "dist");
let webpackDir = path.resolve(rootDir, ".yipack");
let cacheDir = path.resolve(rootDir, ".cache");
module.exports = {
    cliDir,
    rootDir,
    srcDir,
    distDir,
    webpackDir,
    cacheDir,
};
