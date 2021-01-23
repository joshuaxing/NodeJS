/*
 * @Author: your name
 * @Date: 2020-12-22 09:40:27
 * @LastEditTime: 2020-12-22 14:53:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\model\Inquiry.js
 */
"use strict";
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Inquiry = app.model.define("inquiry", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: STRING,
    memberid: INTEGER,
    membername: STRING,
    offlineid: INTEGER,
    offlinename: STRING,
    reply: STRING,
    replystatus: {
      type: INTEGER,
      defaultValue: 1
    },
    checkstatus: {
      type: INTEGER,
      defaultValue: 1
    },
    title: STRING
  }, {
    tableName: 'inquirys'
  });

  Inquiry.associate = function () {
    app.model.Inquiry.belongsTo(app.model.User, {
      foreignKey: "offlineid",
      targetKey: "id"
    });
    app.model.Inquiry.belongsTo(app.model.Member, {
      foreignKey: "memberid",
      targetKey: "id"
    });
  };

  return Inquiry;
};
