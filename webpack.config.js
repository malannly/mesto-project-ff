const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '',
    },
    mode: 'development',
    devServer: {
      static: path.resolve(__dirname, './dist'),
      compress: true,
      port: 8080,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Убедитесь, что плагин используется
        new HtmlWebpackPlugin({
          template: './src/index.html', // Путь к шаблону HTML
        }),
      ],
  };