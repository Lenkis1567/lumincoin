const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',  // main JS entry
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'templates', to: 'templates' }, // e.g. templates/index.html
        { from: 'styles', to: 'styles' },       // e.g. styles/style.css
        { from: 'static', to: 'static' },       // e.g. static/Logo.png
       
      ],
    }),
  ],
  mode: 'development', // 
};