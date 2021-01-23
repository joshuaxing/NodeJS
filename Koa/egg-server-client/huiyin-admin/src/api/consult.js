/*
 * @Author: your name
 * @Date: 2020-04-15 17:17:55
 * @LastEditTime: 2020-04-16 18:20:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \huiyin-admin\src\api\member.js
 */

import request from "@/utils/request";
import { baseURL } from "./api";

// 咨询列表
export function list(data) {
  return request.post(`${baseURL}/api/inquiry/list`, data);
}

// 咨询回复
export function reply(data) {
  return request.post(`${baseURL}/api/inquiry/reply`, data);
}

// 咨询详情
export function detail(data) {
  return request.post(`${baseURL}/api/inquiry/detail`, data);
}

// 咨询删除
export function remove(data) {
  return request.post(`${baseURL}/api/inquiry/delete`, data);
}

// 咨询通过
export function audit(data) {
  return request.post(`${baseURL}/api/inquiry/check`, data);
}

// 咨询拒绝
export function reject(data) {
  return request.post(`${baseURL}/api/inquiry/reject`, data);
}

