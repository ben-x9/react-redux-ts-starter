const config = require('./webpack.config.dev.js');
const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {...config,
  entry: {
    bundle: config.entry.bundle.slice(1) // remove "react-hot-loader/patch"
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  plugins: [
    ...config.plugins.slice(1), // remove "NODE_ENV": "development"
    new webpack.EnvironmentPlugin({
      "NODE_ENV": "production"
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi]
    }),
    new CompressionPlugin({
      asset: "bundle.js",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ]
};
