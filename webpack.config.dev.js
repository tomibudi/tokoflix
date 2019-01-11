const path = require('path');
const webpack = require('webpack');
const postcssInlineComment = require('postcss-inline-comment');
const postcssNested = require('postcss-nested');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssMqPacker = require('css-mqpacker');
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  node : {
    fs : "empty"
  },
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true // hide any errors
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(['public/*']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src'),
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        include: path.resolve(__dirname, '/')
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(gif|eot|woff|woff2|ttf|svg)$/,
        loaders: [
          'url-loader'
        ]
      }
    ]
  },
  postcss: function() {
    return [
      postcssImport,
      postcssVars,
      postcssNested,
      postcssInlineComment,
      postcssMixins,
      postcssMqPacker,
      autoprefixer,
      csswring
    ];
  }
};