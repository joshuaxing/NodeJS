/*
 * @Author: your name
 * @Date: 2020-12-22 10:28:40
 * @LastEditTime: 2020-12-22 11:17:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\model\member.js
 */
"use strict";
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Member = app.model.define("member", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    truename: STRING,
    recommendname: STRING,
    phone: STRING,
    recommendmemberid: INTEGER,
    recommendmembername: {
      type: STRING,
      comment: "推荐人真实姓名",
    },
    recommendname: {
      type: STRING,
      comment: "推荐人",
    },
    checkstatus: {
      type: INTEGER,
      comment: "1待审核 2审核通过 3审核拒绝",
    },
  });

  Member.associate = function () {
    
    // 会员和咨询内容 一对多
    app.model.Member.hasMany(app.model.Inquiry, {
      foreignKey: "memberid",
      targetKey: "id",
    });

    // 会员和案子 一对多
    app.model.Member.hasMany(app.model.Lowcase, {
      foreignKey: "memberid",
      targetKey: "id",
    });

    // 会员和收益 一对多
    app.model.Member.hasMany(app.model.Lowcase, {
      foreignKey: "memberid",
      targetKey: "id",
    });

  };

  return Member;
};
