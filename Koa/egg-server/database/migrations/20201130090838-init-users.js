/*
 * @Author: your name
 * @Date: 2020-11-30 17:08:38
 * @LastEditTime: 2020-12-17 14:17:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\database\migrations\20201130090838-init-users.js
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      nickname: TEXT,
      password: STRING(255),
      powerlist: STRING(100),
      status: INTEGER,
      username: {
        type: STRING(100),
        allowNull: false,
        unique: true
      },
      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
