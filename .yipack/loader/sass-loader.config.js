module.exports = {
    loader: "sass-loader",
    options: {
        sourceMap: process.env.NODE_ENV === "development" ? true : false,
    },
};
