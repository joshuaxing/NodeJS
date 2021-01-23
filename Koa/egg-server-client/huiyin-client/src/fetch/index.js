/*
 * @Author: your name
 * @Date: 2020-03-03 11:52:46
 * @LastEditTime: 2020-04-13 15:50:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\api\index.js
 */
console.log(process.env.NODE_ENV);
import http from '@/utils/http'
let baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/api';
/**
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
export default (api, params) => {
  let url = baseURL + api;
  return http.post(url, params)
}