const webpack = require("webpack");
const path = require("path");
const DeclarationBundlerPlugin = require("./declaration-bundler-webpack-plugin.fix");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    mylib: path.resolve(__dirname, "src/index.ts"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "ts-loader",
      },
    ],
  },
  resolve: { extensions: [".ts"] },
  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
  },

  mode: "development",
  plugins: [
    new UglifyJSPlugin(),
    new DeclarationBundlerPlugin({
      moduleName: '"mylib"',
      out: "@types/index.d.ts",
    }),
  ],
  devtool: "source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};
