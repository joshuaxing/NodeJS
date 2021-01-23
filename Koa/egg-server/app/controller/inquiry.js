/*
 * @Author: your name
 * @Date: 2020-12-22 14:13:46
 * @LastEditTime: 2020-12-22 18:17:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\controller\inquiry.js
 */
const BaseController = require("./base");

class InquiryController extends BaseController {
  constructor(ctx) {
    super(ctx);
  }
  async list() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const { count, rows } = await ctx.service.inquiry.list(data);
      this.success({
        data: rows,
        count,
      });
    } catch (error) {
      ctx.throw(error);
    }
  }
  async add() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    try {
      const result = await ctx.service.inquiry.add(data);
      this.message('提交成功');
    } catch (error) {
      ctx.throw(error);
    }
  }
}

module.exports = InquiryController;
