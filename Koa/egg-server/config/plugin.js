/*
 * @Author: your name
 * @Date: 2020-11-30 10:34:12
 * @LastEditTime: 2020-12-22 17:02:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\config\plugin.js
 */
"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt'
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  }
};
