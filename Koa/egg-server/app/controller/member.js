/*
 * @Author: your name
 * @Date: 2020-12-22 11:24:52
 * @LastEditTime: 2020-12-22 11:36:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\controller\member.js
 */
const BaseController = require("./base");
class MemberController extends BaseController {
  constructor(ctx) {
    super(ctx);
  }
  async list() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const { count, rows } = await ctx.service.member.list(data);
      this.success({
        data: rows,
        count,
      });
    } catch (error) {
      ctx.throw(error);
    }
  }
  async register() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const result = await ctx.service.member.register(data);
      this.message('注册成功');
    } catch (error) {
      ctx.throw(error);
    }
  }
}

module.exports = MemberController;