/*
 * @Author: your name
 * @Date: 2020-03-03 00:35:39
 * @LastEditTime: 2020-04-12 20:05:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-mobile-qqMusic\build\webpack.base.conf.js
 */
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias:{
      '@':path.join(__dirname,'../src')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve('node_modules/swiper'),resolve('node_modules/dom7'),resolve('node_modules/ssr-window')],
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "modules": false,
                "targets": {
                  "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                },
                "useBuiltIns": "entry",
                "corejs": {
                  "version": 3, // 使用core-js@3
                  "proposals": true
                }
              }],
              "@babel/preset-react"
            ],
            "plugins": [
              "@babel/plugin-transform-runtime",
              // Stage 0
              "@babel/plugin-proposal-function-bind",
              // Stage 1
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-logical-assignment-operators",
              ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
              ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
              ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
              "@babel/plugin-proposal-do-expressions",
              // Stage 2
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions",
              // Stage 3
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              ["@babel/plugin-proposal-class-properties", { "loose": false }],
              "@babel/plugin-proposal-json-strings",
              ["import", { "libraryName": "antd-mobile" ,"style": true}]
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
