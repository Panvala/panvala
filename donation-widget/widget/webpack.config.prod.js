const path = require('path');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: false,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
  optimization: {
    minimize: true,
    nodeEnv: 'production',
  },
  plugins: [
    new CleanWebpackPlugin(),
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

// module.exports = {
//   mode: 'production',
//   entry: path.resolve(__dirname, './src/index.js'),
//   devtool: false,

//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.css$/i,
//         exclude: /node_modules/,
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx', '.css'],
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'widget.js',
//     library: 'panWidget',
//     libraryTarget: 'umd',
//     umdNamedDefine: true,
//   },
//   optimization: {
//     minimize: true,
//     nodeEnv: 'production',
//     minimizer: [
//       new TerserPlugin({
//         parallel: true,
//         cache: true,
//         sourceMap: true,
//       }),
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'index.html',
//       inject: true,
//       template: path.resolve(__dirname, 'src', 'index.html'),
//     }),
//     new CompressionPlugin({ test: /\.(js|css)$/ }),
//   ],
//   performance: {
//     hints: false,
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000,
//   },
// };
