/*
 * @Author: your name
 * @Date: 2020-11-30 16:17:46
 * @LastEditTime: 2020-12-19 16:49:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\middleware\jwt.js
 */

 module.exports = ({app}) => {
   return async function check(ctx, next) {
      const { token } = ctx.request.body;
      if (!token) {
        ctx.throw(401, '没有token权限')
      }
      try {
        let ret = await app.jwt.verify(token, app.config.jwt.secret);
        await next();
      } catch (err) {
        // console.log('jwterr', err)
        if (err.name == "TokenExpiredError") {
          ctx.throw(401, 'token过期')
        } else {
          const message = err.message ? err.message : '无效token'
          ctx.throw(401, message)
        }
      }
   }
 }