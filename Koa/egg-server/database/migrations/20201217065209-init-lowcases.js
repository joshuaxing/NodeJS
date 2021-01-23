/*
 * @Author: your name
 * @Date: 2020-12-17 14:52:09
 * @LastEditTime: 2020-12-17 17:08:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\database\migrations\20201217065209-init-lowcases.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('lowcases', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('lowcases', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      amount: INTEGER,
      casecontent: STRING,
      casetitle: STRING,
      status: INTEGER,
      showamount: INTEGER,
      memberid: INTEGER,
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
     * await queryInterface.dropTable('lowcases');
     */
    await queryInterface.dropTable('lowcases');
  }
};
