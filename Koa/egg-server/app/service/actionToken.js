/*
 * @Author: your name
 * @Date: 2020-12-19 10:12:58
 * @LastEditTime: 2020-12-19 10:18:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\service\actionToken.js
 */
const Service = require("egg").Service;

class ActionTokenService extends Service {
  async token(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign(
      {
        data: {
          _id: _id,
        },
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 7),
      },
      ctx.app.config.jwt.secret
    );
  }
}

module.exports = ActionTokenService;
