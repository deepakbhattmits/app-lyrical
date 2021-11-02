// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'client', 'index.jsx'),
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'client/components'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/public', 'index.html'),
    }),
  ],
}
