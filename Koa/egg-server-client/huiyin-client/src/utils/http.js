/*
 * @Author: your name
 * @Date: 2020-03-03 11:58:16
 * @LastEditTime: 2020-05-22 09:34:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\utils\http.js
 */
import axios from "axios";
import { Toast } from "antd-mobile";
import { history } from "@/router";
import configureStore from "@/store";
const store = configureStore();
//请求的公共参数
let arg = {};
//定义全部http
let http = {};

// Content-Type: application/json
http.post = function (api, params) {
  if (localStorage.getItem("_shlawyertoken2020")) {
    arg.token = JSON.parse(localStorage.getItem("_shlawyertoken2020")).token;
    //arg.token = "wannengmima"
  } else {
    arg.token = "";
  }
  arg.source = "";
  arg.timestamp = "";
  arg.verify = "";
  arg.version = "";
  const data = Object.assign({}, arg, params);

  Toast.loading("数据加载中...");
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: api,
      data: data,
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        Toast.hide();
        if (response.status === 200) {
          if (response.data.code === 401) {
            // token过期
            Toast.info("您的账号已过期，请重新登录");
            const user = {
              userId: 0,
              token: "",
              checkstatus: ""
            };
            store.dispatch({
              type: "Login",
              payload: user,
            });
            localStorage.removeItem("_shlawyertoken2020");
            history.push("/login");
          } else {
            resolve(response.data);
          }
        } else {
          Toast.info(response.status);
        }
      })
      .catch((error) => {
        Toast.hide();
        Toast.info(error.msg);
        reject(error.msg);
      });
  });
};

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      if (error.response.status !== 401) {
        switch (error.response.status) {
          case 400:
            error.message = "请求错误(400)";
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
        return Promise.reject(error);
      } else {
        // token过期
        return Promise.resolve(error.response);
      }
    } else {
      error.message = "网络出错, 请稍后重试";
      return Promise.reject(error);
    }
  }
);

export default http;
