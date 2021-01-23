/*
 * @Author: your name
 * @Date: 2020-12-17 17:04:25
 * @LastEditTime: 2020-12-17 17:12:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\database\migrations\20201217090425-init-members.js
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('members', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('members', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      truename: STRING,
      recommendname: STRING,
      phone: STRING,
      recommendmemberid: INTEGER,
      recommendmembername: {
        type: STRING,
        comment: '推荐人真实姓名'
      },
      recommendname: {
        type: STRING,
        comment: '推荐人'
      },
      checkstatus: {
        type: INTEGER,
        comment: '1待审核 2审核通过 3审核拒绝'
      },
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
     * await queryInterface.dropTable('members');
     */
    await queryInterface.dropTable('members');
  }
};
