module.exports = {
    loader: "css-loader",
    options: {
        sourceMap: process.env.NODE_ENV === "development" ? true : false,
    },
};
