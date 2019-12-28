const rules = require("./webpack.rules")
const plugins = require("./webpack.plugins")
const path = require("path")

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
})

module.exports = {
  // entry: path.resolve(__dirname, "src", "renderer.tsx"),
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
}
