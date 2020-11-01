const path = require("path");
const myConfig = require("../webpack.config.my.js");
module.exports = {
    loader: "sass-resources-loader",
    options: {
        sourceMap: process.env.NODE_ENV === "development" ? true : false,
        resources: [path.resolve(myConfig.srcDir, "styles", "variable.scss")],
    },
};
