/*
 * @Author: your name
 * @Date: 2020-03-03 11:19:50
 * @LastEditTime: 2020-05-16 22:33:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\store\reducer.js
 */
const initialState = {
  user: {
    userId: '',
    token: '',
    checkstatus: ''
  }
};

export default function login(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'Login':
      return {
        ...state,
        user: payload
      }
    case 'Test':
      return state;
    default:
      return state;
  }
}
