/*
 * @Author: your name
 * @Date: 2020-11-30 19:58:52
 * @LastEditTime: 2020-12-27 08:36:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\service\user.js
 */
const Service = require("egg").Service;
class UserService extends Service {
  async add(payload) {
    const { ctx, service } = this;
    payload.powerlist = JSON.stringify(payload.powerlist);
    payload.password = await ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  async delete(payload) {
    const { ctx, service } = this;
    const { id } = payload;
    return ctx.model.User.destroy({
      where: {
        id: id
      },
    });
  }

  async list(payload) {
    const { ctx, service } = this;
    const { Op } = ctx.app.Sequelize;
    const { pagenum, pagesize, status, createtime } = payload;
    let statusList = [];
    if (status === "") {
      statusList = [1, 2];
    } else {
      statusList[0] = status;
    }

    let where = {
      status: {
        [Op.or]: statusList,
      },
    };

    if (createtime) {
      where.createdAt = createtime;
    }

    return ctx.model.User.findAndCountAll({
      order: [["id", "desc"]],
      where: where,
      offset: (pagenum - 1) * pagesize,
      limit: pagesize,
    });
  }

  async login(payload) {
    const { ctx, service } = this;
    const data = await ctx.model.User.findOne({
      where: {
        username: payload.username,
      }
    });
    if (!data) {
      return {
        code: -1,
        msg: 'user not found'
      }
    }
    const verifyPsw = await ctx.compare(payload.password, data.password);
    if (!verifyPsw) {
      return {
        code: -1,
        msg: 'password is error'
      }
    }
    try {
       // 生成Token令牌
      const token = await service.actionToken.token(data.id)
      return {
        data: {
          token: token,
          id: data.id,
          nickname: data.nickname,
          powerlist: data.powerlist
        }
      };
    } catch (error) {
      ctx.throw(error);
    }
    
  }
}

module.exports = UserService;
