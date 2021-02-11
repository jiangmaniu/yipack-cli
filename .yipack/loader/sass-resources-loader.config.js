let path = require("path");
let myConfig = require("../webpack.config.my.js");
module.exports = {
    loader: "sass-resources-loader",
    options: {
        sourceMap: process.env.NODE_MODE === "development" ? true : false,
        resources: [path.join(myConfig.srcDir, "styles", "variable.scss")],
    },
};
