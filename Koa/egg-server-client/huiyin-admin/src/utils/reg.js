/*
 * @Author: your name
 * @Date: 2019-12-09 14:37:53
 * @LastEditTime: 2020-04-02 17:13:33
 * @LastEditors: Please set LastEditors
 * @Description: 常用正则表达式
 * @FilePath: \yuanzhou-admin\src\utils\reg.js
 */
// 整数
export const integer_num = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/
// 正整数含0
export const positive_num_zero = /^([1-9]\d*|0)$/
// 正整数不含0
export const positive_num = /^([1-9][0-9]*)$/
// 0.22
export const decimals_num = /^0(\.[1-9]([0-9]){0,1})$/
//大于0
export const than_zero = /^[1-9]{1}[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$/
// 手机号
export const regphone = /^1[3456789]\d{9}$/
// 0-1
export const percentnum = /^(0)$|^(0(\.{1}\d+))$|^(1)$/
// 大于等于0
export const includezero = /^(0)$|^[1-9]{1}[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$/

