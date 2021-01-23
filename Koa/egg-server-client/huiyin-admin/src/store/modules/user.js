/*
 * @Author: your name
 * @Date: 2019-12-02 11:12:00
 * @LastEditTime: 2020-04-19 16:06:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\store\modules\user.js
 */

import * as api from "@/api/user";

const state = {
  userinfo: {
    userid: '',
    nickname: '',
    token: ''
  },
  menuList: [],
  code: {
    modcode: ''
  }
};

const mutations = {
  gotuserInfo(state, payload) {
    state.userinfo = payload;
  },
  gotmenuList(state, payload) {
    state.menuList = payload;
  }
};

const actions = {
  // user login
  login({ commit }, data) {
    return api.login(data);
  },
  // user loginout
  loginout({ commit }, data) {
    return api.loginout(data);
  },
  //用户列表
  userList({ commit }, data) {
    return api.list(data);
  },
  //用户新增
  userAdd({ commit }, data) {
    return api.add(data);
  },
  //用户详情
  userDetail({ commit }, data) {
    return api.detail(data);
  },
  //用户编辑
  userUpdate({ commit }, data) {
    return api.update(data);
  },
  //用户修改密码
  editPassword({ commit }, data) {
    return api.editPassword(data);
  },
  //用户删除
  Remove({ commit }, data) {
    return api.remove(data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
