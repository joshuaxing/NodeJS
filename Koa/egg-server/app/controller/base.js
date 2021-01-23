/*
 * @Author: your name
 * @Date: 2020-11-30 20:11:21
 * @LastEditTime: 2020-12-22 11:54:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\controller\base.js
 */
const Controller = require("egg").Controller;

// controller的父类， 提供公用方法
class BaseController extends Controller {
  
  // 提供成功数据的
  success(options) {
    const config = {
      data: null,
      code: 0,
      count: 0,
      msg: "请求成功",
      ...options
    }
    this.ctx.body = {
      code: config.code,
      data: config.data,
      msg: config.msg,
      count: config.count,
    };
  }

  // 提供成功消息
  message(msg = "请求成功") {
    this.ctx.body = {
      code: 0,
      msg: msg,
    };
  }
  
  // 提供失败消息
  error(msg = "请求失败") {
    this.ctx.body = {
      code: -1,
      msg: msg,
    };
  }

}

module.exports = BaseController;
