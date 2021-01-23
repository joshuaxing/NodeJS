/*
 * @Author: your name
 * @Date: 2020-12-17 16:43:16
 * @LastEditTime: 2020-12-17 17:06:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\database\migrations\20201217084316-init-income.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('incomes', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('incomes', {
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
      createdAt: DATE,
      updatedAt: DATE,
      deletedAt: DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('incomes');
     */
    await queryInterface.dropTable('incomes');
  }
};
