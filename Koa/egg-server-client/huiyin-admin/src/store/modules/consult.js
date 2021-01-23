/*
 * @Author: your name
 * @Date: 2019-12-02 11:12:00
 * @LastEditTime: 2020-05-15 19:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\store\modules\user.js
 */

import * as api from "@/api/consult";

const state = {
 
};

const mutations = {
  
};

const actions = {
  //咨询列表
  List({ commit }, data) {
    return api.list(data);
  },
  //咨询详情
  Detail({ commit }, data) {
    return api.detail(data);
  },
  //咨询删除
  Remove({ commit }, data) {
    return api.remove(data);
  },
  //咨询通过
  Audit({ commit }, data) {
    return api.audit(data);
  },
  //咨询拒绝
  Reject({ commit }, data) {
    return api.reject(data);
  },
  //咨询回复
  Reply({ commit }, data) {
    return api.reply(data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
