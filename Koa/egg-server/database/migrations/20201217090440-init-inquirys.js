/*
 * @Author: your name
 * @Date: 2020-12-17 17:04:40
 * @LastEditTime: 2020-12-17 17:22:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\database\migrations\20201217090440-init-inquirys.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('inquirys', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('inquirys', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: STRING,
      memberid: INTEGER,
      membername: STRING,
      offlineid: INTEGER,
      offlinename: STRING,
      reply: STRING,
      replystatus: INTEGER,
      title: STRING,
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
     * await queryInterface.dropTable('inquirys');
     */
    await queryInterface.dropTable('inquirys');
  }
};
