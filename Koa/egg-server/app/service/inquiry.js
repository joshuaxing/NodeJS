/*
 * @Author: your name
 * @Date: 2020-12-22 14:24:47
 * @LastEditTime: 2020-12-23 09:42:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\service\inquiry.js
 */
const Service = require("egg").Service;
class InquiryService extends Service {
  async list(payload) {
    const { ctx, service, app } = this;
    const { pagenum, pagesize } = payload;
    return ctx.model.Inquiry.findAndCountAll({
      attributes: { exclude: [ 'deletedAt'] },
      order: [["id", "desc"]],
      offset: (pagenum - 1) * pagesize,
      limit: pagesize,
      include: {
        model: app.model.Member
      }
    });
  }
  async add(payload) {
    const { ctx, service } = this;
    const data = {
      ...payload
    };
    return ctx.model.Inquiry.create(data);
  }
}
module.exports = InquiryService;
