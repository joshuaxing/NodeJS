/*
 * @Author: your name
 * @Date: 2019-12-02 10:59:52
 * @LastEditTime: 2019-12-02 11:02:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}