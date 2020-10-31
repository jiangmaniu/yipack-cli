const path = require("path");
const cliDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(process.cwd());
const srcDir = path.resolve(rootDir, "src");
const distDir = path.resolve(rootDir, "dist");
const webpackDir = path.resolve(rootDir, ".yipack");
module.exports = {
    cliDir,
    rootDir,
    srcDir,
    distDir,
    webpackDir,
};
