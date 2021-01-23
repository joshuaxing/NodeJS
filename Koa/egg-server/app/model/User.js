/*
 * @Author: your name
 * @Date: 2020-11-30 19:56:13
 * @LastEditTime: 2020-12-22 11:18:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\models\user.js
 */
"use strict";
module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    nickname: TEXT,
    password: STRING(255),
    username: {
      type: STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z]+$/i
      }
    },
    powerlist: {
      type: STRING(100),
      get() {
        const powerlist = this.getDataValue('powerlist');
        return powerlist ? JSON.parse(powerlist) : [];
      }
    },
    status: INTEGER
  });

  User.associate = function () {
    app.model.User.hasMany(app.model.Inquiry, {
      foreignKey: 'offlineid',
      targetKey: 'id'
    })
  }

  return User;
};
