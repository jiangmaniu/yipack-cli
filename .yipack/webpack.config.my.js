let path = require('path');
let cliDir = path.join(__dirname, '..');
let rootDir = path.join(process.cwd());
let srcDir = path.join(rootDir, 'src');
let pageDir = path.join(srcDir, 'pages');
let distDir = path.join(rootDir, 'dist');
let webpackDir = path.join(cliDir, '.yipack');
let tempDir = path.join(rootDir, 'temp');
let cacheDir = path.join(rootDir, '.cache');
module.exports = {
    cliDir,
    rootDir,
    srcDir,
    pageDir,
    distDir,
    webpackDir,
    cacheDir,
    tempDir
};
