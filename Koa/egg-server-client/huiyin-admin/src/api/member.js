/*
 * @Author: your name
 * @Date: 2020-04-15 17:17:55
 * @LastEditTime: 2020-06-04 17:59:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \huiyin-admin\src\api\member.js
 */

import request from "@/utils/request";
import { baseURL } from "./api";

// 会员列表
export function list(data) {
  return request.post(`${baseURL}/api/member/list`, data);
}

// 会员编辑
export function update(data) {
  return request.post(`${baseURL}/api/member/edit`, data);
}

// 会员详情
export function detail(data) {
  return request.post(`${baseURL}/api/member/detail`, data);
}

// 会员删除
export function remove(data) {
  return request.post(`${baseURL}/api/member/delete`, data);
}

// 审核通过
export function audit(data) {
  return request.post(`${baseURL}/api/member/audit`, data);
}

// 审核拒绝
export function auditfail(data) {
  return request.post(`${baseURL}/api/member/auditfail`, data);
}

// 会员收益
export function income(data) {
  return request.post(`${baseURL}/api/income/list`, data);
}

// 添加案子
export function caseadd(data) {
  return request.post(`${baseURL}/api/lowcase/add`, data);
}

// 案子列表
export function caselist(data) {
  return request.post(`${baseURL}/api/lowcase/memberlist`, data);
}

// 案子修改
export function caseedit(data) {
  return request.post(`${baseURL}/api/lowcase/edit`, data);
}

// 案子删除
export function casedelete(data) {
  return request.post(`${baseURL}/api/lowcase/delete`, data);
}

// 省份下拉
export function province(data) {
  return request.post(`${baseURL}/api/member/province`, data);
}

//校验会员id
export function check(data) {
  return request.post(`${baseURL}/api/member/check`, data);
}
