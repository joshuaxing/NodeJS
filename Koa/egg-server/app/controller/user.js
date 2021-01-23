/*
 * @Author: your name
 * @Date: 2020-11-30 10:59:03
 * @LastEditTime: 2020-12-19 16:30:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\controller\user.js
 */
const BaseController = require('./base');
/**
 * @Controller ⽤户管理
 */
class UserController extends BaseController {
  constructor(ctx) {
    super(ctx);
  }
  async list() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const {count, rows} = await ctx.service.user.list(data);
      this.success({
        data: rows,
        count
      });
    } catch (error) {
      ctx.throw(error)
    }
    
  }

  async add() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const result = await ctx.service.user.add(data);
      this.message('创建成功');
    } catch (error) {
      ctx.throw(error)
    }
  }

  async delete() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const result = await ctx.service.user.delete(data);
      this.message('删除成功');
    } catch (error) {
      ctx.throw(error)
    }
  }

  async login() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const result = await ctx.service.user.login(data);      
      this.success(result);
    } catch (error) {
      ctx.throw(error)
    }
  }
}
module.exports = UserController;
