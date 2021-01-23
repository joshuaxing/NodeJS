/*
 * @Author: your name
 * @Date: 2019-11-29 10:35:50
 * @LastEditTime: 2019-12-03 08:56:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\store\modules\settings.js
 */
import types from "@/constant/type";
const state = {
  collapse: false,
  tagsList: []
}
const getters = {
  
}
const mutations = {
  [types.TAGS] (state, data) {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
      data[i].name && arr.push(data[i].name);
    }
    state.tagsList = arr;
  },
  [types.ISCOLLAPSE] (state, data) {
    state.collapse = !state.collapse
  }
}

const actions = {
  test ({ state, commit, rootState }) {
    
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}