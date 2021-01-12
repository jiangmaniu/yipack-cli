let MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    loader: process.env.NODE_MODE === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    options: {
        publicPath: "../",
    },
};
