/*
 * @Author: your name
 * @Date: 2019-12-02 11:12:00
 * @LastEditTime: 2020-06-04 18:00:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\store\modules\user.js
 */

import * as api from "@/api/member";

const state = {
 
};

const mutations = {
  
};
const actions = {
  //会员列表
  List({ commit }, data) {
    return api.list(data);
  },
  //会员详情
  Detail({ commit }, data) {
    return api.detail(data);
  },
  //会员编辑
  Update({ commit }, data) {
    return api.update(data);
  },
  //会员删除
  Remove({ commit }, data) {
    return api.remove(data);
  },
  //审核拒绝
  AuditFail({ commit }, data) {
    return api.auditfail(data);
  },
  //审核通过
  Audit({ commit }, data) {
    return api.audit(data);
  },
  //会员收益
  Income({ commit }, data) {
    return api.income(data);
  },
  // 添加案子
  CaseAdd({ commit }, data) {
    return api.caseadd(data);
  },
   // 案子列表
  CaseList({ commit }, data) {
    return api.caselist(data);
  },
   // 案子修改
  CaseEdit({ commit }, data) {
    return api.caseedit(data);
  },
   // 案子删除
  CaseDelete({ commit }, data) {
    return api.casedelete(data);
  },
  //省份下拉
  Province({ commit }, data) {
    return api.province(data);
  },
  //校验会员id
  Check({ commit }, data) {
    return api.check(data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
