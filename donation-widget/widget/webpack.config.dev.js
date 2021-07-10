const path = require('path');
const webpack = require('webpack');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.css'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'widget.js',
      library: 'panWidget',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(
          __dirname,
          'src',
          'index.html'
        ),
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      hot: true,
    },
  };
};
