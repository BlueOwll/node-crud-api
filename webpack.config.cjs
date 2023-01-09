// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const { node } = require("webpack");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/server.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // devServer: {
  //   open: true,
  //   host: "localhost",
  // },
  target: "node",
  plugins: [
    new NodemonPlugin(), // Dong

  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
