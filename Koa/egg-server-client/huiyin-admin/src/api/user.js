/*
 * @Author: your name
 * @Date: 2019-12-02 11:12:46
 * @LastEditTime: 2020-04-18 23:19:51
 * @LastEditors: Please set LastEditors
 * @Description: 用户API
 * @FilePath: \mini-admin\src\api\user.js
 */

import request from "@/utils/request";
import { baseURL } from "./api";

// 登录
export function login(data) {
  return request.post(`${baseURL}/api/user/login`, data);
}

// 退出
export function loginout(data) {
  return request.post(`${baseURL}/api/user/loginout`, data);
}

// 用户列表
export function list(data) {
  return request.post(`${baseURL}/api/user/list`, data);
}

// 用户新增
export function add(data) {
  return request.post(`${baseURL}/api/user/add`, data);
}

// 用户编辑
export function update(data) {
  return request.post(`${baseURL}/api/user/edit`, data);
}

// 用户删除
export function remove(data) {
  return request.post(`${baseURL}/api/user/del`, data);
}

// 用户详情
export function detail(data) {
  return request.post(`${baseURL}/api/user/get`, data);
}

// 用户修改密码
export function editPassword(data) {
  return request.post(`${baseURL}/api/user/changepass`, data);
}