const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入
const DefineWebpackPlugin = require("./plugins/define-webpack-plugin");

module.exports = {
  entry: "./src/index.js", //需要打包文件的入口路径
  output: {
    filename: "bundle.js", //打包后文件的名称
    path: path.resolve(__dirname, "./dist"), //打包后文件的输出路径
  },
  devServer: {
    static: "./dist",
    hot: true,
  },
  optimization: {
    usedExports: true, // 启用 Tree Shaking
    minimize: true, // 启用代码压缩
    splitChunks: {
      chunks: "all", // 分割代码块
    },
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({}),
    new DefineWebpackPlugin({ yxy: "heart" }),
  ],
  devtool: "inline-source-map",
};
