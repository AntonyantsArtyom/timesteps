const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
   entry: "./src/index.tsx",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
   },
   resolve: {
      extensions: [".ts", ".tsx", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.js|\.jsx$/,
            use: "ts-loader",
            exclude: /node_modules/,
         },
         {
            test: /\.module\.css$/,
            use: [
               "style-loader",
               {
                  loader: "css-loader",
                  options: {
                     modules: true,
                  },
               },
            ],
         },
         {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: ["style-loader", "css-loader"],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
      }),
   ],
   devServer: {
      static: {
         directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
   },
}
