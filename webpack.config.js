"use strict";
const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry: require.resolve("./"),
    output: {
       path: path.join(__dirname, "dist"),
       filename: "built.js",
       publicPath: "/dist"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: { presets: ["es2015"]}
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "postcss", "sass"]
            },
            {
                test: /\.json$/,
                loaders: ["json-loader"]
            }
        ],
        noParse: [/foundation-apps/, /lodash/, /angular.js$/, /moment.js$/]
    },
    resolve: {
        extensions: ['', '.json', '.js']
    },
    sassLoader: {
        includePaths: [path.join(__dirname, "node_modules", "foundation-apps", "scss" )]
    },
    postcss: [autoprefixer({browsers: ["last 3 versions"]})],
    devtool: "inline-source-map"
};