/*
 * @Author: your name
 * @Date: 2020-04-19 11:09:05
 * @LastEditTime: 2020-06-04 17:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \huiyin-admin\src\api\generalize.js
 */

import request from "@/utils/request";
import { baseURL } from "./api";

// 收益列表
export function list(data) {
  return request.post(`${baseURL}/api/income/list`, data);
}

// 付款操作
export function pay(data) {
  return request.post(`${baseURL}/api/income/pay`, data);
}

// 付款详细
export function paydetail(data) {
  return request.post(`${baseURL}/api/income/paydetail`, data);
}

// 收益详细
export function detail(data) {
  return request.post(`${baseURL}/api/income/detail`, data);
}

// 收益删除
export function remove(data) {
  return request.post(`${baseURL}/api/income/delete`, data);
}

// 收益修改
export function edit(data) {
  return request.post(`${baseURL}/api/income/edit`, data);
}

//新增兑换
export function add(data) {
  return request.post(`${baseURL}/api/income/add`, data);
}
