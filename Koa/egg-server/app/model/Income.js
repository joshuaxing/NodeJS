/*
 * @Author: your name
 * @Date: 2020-12-22 10:26:49
 * @LastEditTime: 2020-12-22 11:19:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\model\income.js
 */
"use strict";
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Income = app.model.define("income", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    amount: INTEGER,
    incometype: {
      type: STRING,
      comment: '类型 1注册 2案子 3兑换'
    },
    level: STRING,
    memberid: INTEGER,
    membername: STRING,
    paystatus: {
      type: INTEGER,
      comment: '付款状态 1未付款 2已付 3拒绝'
    },
    sourcememberid: INTEGER,
    sourcemembername: STRING,
  });

  Income.associate = function () {
    app.model.Income.belongsTo(app.model.Member, {
      foreignKey: "memberid",
      targetKey: "id",
    });
  };

  return Income;
};