/*
 * @Author: your name
 * @Date: 2020-11-30 15:10:28
 * @LastEditTime: 2020-12-22 17:01:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\middleware\error_handler.js
 */
module.exports = () => {
  
  return async function errorHandler(ctx, next) {
    try {
      await next();
      // 接口404处理
      if (ctx.response.status === 404) {
        ctx.throw(404, 'Not Found')
      }
    } catch (err) {

      // console.log('handle-err', err)
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let error =
        status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      if (status === 422) {
        error = err.errors;
      }
      
      ctx.body = {
        code: -1,
        msg: error,
      };

      ctx.status = status;

    }
  };
};
