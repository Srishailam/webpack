const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/kiwi.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:9002/',
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024 // 3kb
          }
        }
      },
      {
        test: /\.txt/,
        type: 'asset/source'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { // babel options
            presets: ['@babel/env'],
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader'
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'kiwi.html',
      title: 'Kiwi',
      template: 'src/page-template.hbs',
      description: 'Kiwi',
    }),
    new ModuleFederationPlugin({
      name: 'KiwiApp',
      filename: 'remoteEntry.js',
      exposes: {
        './KiwiPage': './src/components/kiwi-page/kiwi-page.js',
      },
    }),
  ],
}