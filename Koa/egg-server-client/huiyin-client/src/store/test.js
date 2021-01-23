/*
 * @Author: your name
 * @Date: 2020-03-09 10:25:28
 * @LastEditTime: 2020-03-09 10:34:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\store\test.js
 */
import * as actionTypes from './actionTypes';
const initialState = {
    testmusicList: [],
    testvalue: 6666
};


export default function test(state = initialState, action) {
  const {testmusicList} = state;
  const {type,payload} = action;
  switch (type) {
      case actionTypes.TEST_MUSIC:
        testmusicList.push(111)
        return Object.assign({}, state, {
            testmusicList
        });
      default:
          return state;
  }
}