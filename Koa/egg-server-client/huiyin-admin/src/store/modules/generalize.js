/*
 * @Author: your name
 * @Date: 2019-12-02 11:12:00
 * @LastEditTime: 2020-06-04 15:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\store\modules\user.js
 */

import * as api from "@/api/generalize";

const state = {
 
};

const mutations = {
  
};

const actions = {
  //收益列表
  List({ commit }, data) {
    return api.list(data);
  },
  //付款详细
  PayDetail({ commit }, data) {
    return api.paydetail(data);
  },
  //付款操作
  Pay({ commit }, data) {
    return api.pay(data);
  },
  Detail({ commit }, data) {
    return api.detail(data);
  },
  Remove({ commit }, data) {
    return api.remove(data);
  },
  Edit({ commit }, data) {
    return api.edit(data);
  },
  Add({ commit }, data) {
    return api.add(data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
