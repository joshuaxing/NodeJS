/*
 * @Author: your name
 * @Date: 2020-11-30 10:34:12
 * @LastEditTime: 2020-12-22 14:43:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\app\router.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  const check = app.middleware.jwt({app});
  router.get('/', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/add', check, controller.user.add);
  router.post('/api/user/list', check, controller.user.list);
  router.post('/api/user/delete', check, controller.user.delete);
  router.post('/api/member/list', check, controller.member.list);
  router.post('/api/member/register', controller.member.register);
  router.post('/api/inquiry/list', check, controller.inquiry.list);
  router.post('/api/inquiry/add', check, controller.inquiry.add);
};
