/*
 * @Author: your name
 * @Date: 2020-12-19 10:03:58
 * @LastEditTime: 2020-12-19 16:02:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\extend\helper.js
 */

exports.message = (ctx, options) => {
  const config = {
    data: null,
    code: 0,
    msg: "请求成功",
    ...options
  }
  ctx.body = {
    code: 0,
    data: config.data,
    msg: config.msg
  };
};
