const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const { DefinePlugin } = require("webpack")

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false,
  }),
  new DefinePlugin({
    "process.env.TRANSLATE_API_KEY": JSON.stringify(
      process.env.TRANSLATE_API_KEY,
    ),
  }),
]
