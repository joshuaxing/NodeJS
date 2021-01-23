/*
 * @Author: your name
 * @Date: 2020-12-22 11:27:13
 * @LastEditTime: 2020-12-23 09:46:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\service\member.js
 */
const Service = require("egg").Service;
class MemberService extends Service {
  async list(payload) {
    const { ctx, service } = this;
    const { pagenum, pagesize } = payload;
    return ctx.model.Member.findAndCountAll({
      order: [["id", "desc"]],
      offset: (pagenum - 1) * pagesize,
      limit: pagesize,
    });
  }
  async register(payload) {
    const { ctx, service } = this;
    let recommendmembername = '';
    if (payload.recommendmemberid) {
      const member = await ctx.model.Member.findByPk(payload.recommendmemberid);
      if (member) {
        recommendmembername = member.truename
      }
    }
    const data = {
      ...payload,
      recommendmembername: recommendmembername
    };
    return ctx.model.Member.create(data);
  }
}

module.exports = MemberService;
