/*
 * @Author: your name
 * @Date: 2020-03-03 11:19:50
 * @LastEditTime: 2020-03-20 11:01:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\store\actions.js
 */

//登录
export const Login = (data,callback)=> async(dispatch, getState) => {
  dispatch({
    type: 'Login',
    payload: data
  });
  callback && callback();
}