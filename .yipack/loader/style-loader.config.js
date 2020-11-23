let MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    loader: process.env.NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
    options: {},
};
