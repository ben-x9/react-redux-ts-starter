const path = require("path");
var webpack = require("webpack");
// const CompressionPlugin = require("compression-webpack-plugin");

function absPath(filePath) {
  return path.join(__dirname, filePath)
}

module.exports = {
  entry: {
    bundle: [
      "react-hot-loader/patch",
      absPath("src/Root.tsx")
    ],
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].js",
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('.'),
      "node_modules"
    ],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    symlinks: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      "NODE_ENV": "development"
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: true,
    //   compress: {
    //     warnings: false,
    //     pure_getters: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //     screw_ie8: true
    //   },
    //   output: {
    //     comments: false,
    //   },
    //   exclude: [/\.min\.js$/gi]
    // }),
    // new CompressionPlugin({
    //   asset: "public/bundle.js",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0
    // })
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: absPath("./public"),
    port: 9090,
    hotOnly: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "react-hot-loader/webpack"
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
