/*
 * @Author: your name
 * @Date: 2020-03-03 11:58:16
 * @LastEditTime: 2020-03-19 15:18:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\utils\http.js
 */
import axios from 'axios';
import qs from "qs";
import {Toast} from 'antd-mobile';
import {history} from '@/router';
import configureStore from '@/store';
const store = configureStore();
//定义全部http
let http = {};

//请求的公共参数
let arg = {};

// Content-Type: application/json
http.post = function(api, params) {
  arg.token = store.getState().reducer.user.token;
  arg.source = "";
  arg.timestamp = "";
  arg.verify = "";
  arg.version = "";
  const data = Object.assign({}, arg, params);
  return new Promise((resolve, reject) => {
    axios
      .post(api, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else if (response.status === 401) {
          // token过期
          Toast.info('您的账号已过期，请重新登录')
          const user = {
            userId: 0,
            token: ''
          }
          store.dispatch({
            type: 'Login',
            payload: user
          })
          localStorage.removeItem('_shlawyertoken2020');
          history.push('/login');
        } else {
          Toast.info(response.status)
        }

      })
      .catch(error => {
        Toast.info(error.message)
        // reject(error.message);
      });
  });
};

// Content-Type: multipart/form-data
http.file = function(api, params) {
  let data = params;
  return new Promise((resolve, reject) => {
    axios
      .post(api, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};
// Content-Type: application/x-www-form-urlencoded
http.ajax = function(api, params) {
  let data = Object.assign({}, arg, params);
  return new Promise((resolve, reject) => {
    axios
      .post(
        api,
        {
          data: qs.stringify(data)
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};
// get请求
http.get = function(api, params) {
  let data = Object.assign({}, arg, params);
  return new Promise((resolve, reject) => {
    axios
      .get(api, {
        params: data
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.message);
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

