/*
 * @Author: your name
 * @Date: 2019-12-09 14:28:15
 * @LastEditTime: 2019-12-09 14:49:59
 * @LastEditors: Please set LastEditors
 * @Description: 全局Vue.filter
 * @FilePath: \yuanzhou-admin\src\utils\filters.js
 */

import {positive_num_zero, positive_num} from './reg.js'

function positiveNumZero (value) {
   if (positive_num_zero.test(value)) {
     return value
   } else {
    return ''
   }
}
function positiveNum (num) {
   
}
export default {positiveNumZero, positiveNum}