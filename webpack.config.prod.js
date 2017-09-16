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
    './client/src/index.js'
  ],

  output: {
    path: path.resolve(__dirname, 'client/src/build'),
    filename: 'prod_bundle.js'
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'client/build'),
    publicPath: '/',
    historyApiFallback: true
  },

  resolve: {
    extensions: ['.js', '.jsx']
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
        test: /\.jsx$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
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
    ]
  },

  plugins: [HtmlWebpackPluginConfig,
    new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true }),
    new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    // new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
