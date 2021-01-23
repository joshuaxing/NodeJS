import axios from "axios";
import qs from "qs";
import { Message } from 'element-ui'
import store from "../store/index.js";
import router from "../router/index.js";
//定义全部http
let http = {};

//请求的公共参数
let arg = {};

// Content-Type: application/json
http.post = function(api, params) {
  arg.token = store.state.user.userinfo.token;
  arg.modcode = store.state.user.code.modcode;
  let data = Object.assign({}, arg, params);
  return new Promise((resolve, reject) => {
    axios
      .post(api, data)
      .then(response => {
        // console.log(response)
        if (response.status === 200) {
          if (response.data.code === 401) {
            //没有权限
            Message.error("您的账号已过期，请重新登录")
            localStorage.removeItem("_huiyininfo");
            localStorage.removeItem("_huiyinmenu");
            sessionStorage.removeItem("_huiyinlink");
            router.push('/login');
          }
          resolve(response.data);
        } else {
          Message.error(response.status)
        }
      })
      .catch(error => {
        Message.error(error.msg)
        reject(error.msg);
      });
  });
};
// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误(400)";
          break;
        case 401:
          error.message = "(401)";
          break;
        case 403:
          error.message = "拒绝访问(403)";
          break;
        case 404:
          error.message = "请求出错(404)";
          break;
        case 408:
          error.message = "请求超时(408)";
          break;
        case 500:
          error.message = "服务器错误(500)";
          break;
        case 501:
          error.message = "服务未实现(501)";
          break;
        case 502:
          error.message = "网络错误(502)";
          break;
        case 503:
          error.message = "服务不可用(503)";
          break;
        case 504:
          error.message = "网络超时(504)";
          break;
        case 505:
          error.message = "HTTP版本不受支持(505)";
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = "网络不稳定,请稍后重试";
    }
    return Promise.reject(error);
  }
);

export default http;

