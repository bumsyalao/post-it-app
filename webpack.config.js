const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});


const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    // 'webpack-hot-middleware/./client',
    './client/src/index.js'
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'client/build'),
    publicPath: '/',
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: false,
              },
            },
          ],
        }),
      }
      // { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
      // { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      // { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  },

  plugins: [HtmlWebpackPluginConfig,
    new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true })
    // new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
