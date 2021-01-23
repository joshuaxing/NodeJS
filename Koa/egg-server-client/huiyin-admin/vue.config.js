/*
 * @Author: your name
 * @Date: 2019-11-26 15:33:24
 * @LastEditTime: 2020-04-14 08:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\vue.demo.js
 */
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://122.112.236.214:8001',
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: false,
};
