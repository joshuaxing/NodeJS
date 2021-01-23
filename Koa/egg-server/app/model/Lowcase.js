/*
 * @Author: your name
 * @Date: 2020-12-22 10:24:59
 * @LastEditTime: 2020-12-22 11:19:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\model\Lowcase.js
 */
"use strict";
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Lowcase = app.model.define("lowcase", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    amount: INTEGER,
    casecontent: STRING,
    casetitle: STRING,
    status: INTEGER,
    showamount: INTEGER,
    memberid: INTEGER,
  });

  Lowcase.associate = function () {
    app.model.Lowcase.belongsTo(app.model.Member, {
      foreignKey: "memberid",
      targetKey: "id"
    });
  };

  return Lowcase;
};
