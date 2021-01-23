/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-22 18:07:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\pages\Login\index.js
 */
import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";
import { Toast, Modal} from "antd-mobile";
import http from "@/fetch";
import * as actions from "@/store/actions";
const appid = 'wxfe9c9c2ad747787e';
const redirect_uri = 'http://weixin.hy-pls.cn/login';
let weixinurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

// 微信禁止分享
import forbidshare from "@/utils/forbidshare.js";

@connect(
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class Login extends React.Component {
  state = {
    
  };
  componentDidMount() {
    // 微信获取code重定向
    const urlcode = this.getQueryString('code')
    if (!urlcode) {
      window.location.href = weixinurl;
    }
    
  }
  submitLogin() {
    this.submitCodeLogin();
  }
  submitCodeLogin() {
    // 微信code
    const urlcode = this.getQueryString('code');
    if (!urlcode) {
      window.location.href = weixinurl;
    } else {
      this.submitReq(urlcode)
    }
  }
  submitReq (urlcode) {
    const paramdata = {
      code: urlcode
    };
    http("/member/login", {
      data: paramdata
    }).then(result => {
      if (result.code === 0) {
        Toast.info("您好，欢迎登陆");
        const data = result.data;
        const value = {
          userId: data.id,
          token: data.token,
          checkstatus: data.checkstauts ?  data.checkstauts : 0
        }
        localStorage.setItem('_shlawyertoken2020', JSON.stringify(value));
        //登陆
        this.props.Login(value)
        this.props.history.push("/user");
      } else if (result.code === 100){
        // 用户未注册
         const openid = result.data.openid
         Modal.alert('提示', '抱歉，您还没有注册会员, 快去注册吧', [
            { text: '确定', onPress: () => this.props.history.push({ pathname:'/regist', state:{openid:  openid} }) },
          ])
      } else {
        Toast.info(result.msg);
      }
    });
  }
  getQueryString(name) {
    //encodeURI decodeURI encodeURIComponent decodeURIComponent
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
      return r[2];
    } else{
      return null;
    }
  }
  render() {
    const {} = this.state;
    return (
      <div className="login-page page">
        <Helmet>
          <title>微信登录</title>
        </Helmet>
        <div className="weixin-box">
          <div className="weixin-image">
            <span className="weixin-icon iconfont icon-weixin"></span>
          </div>
          <div className="weixin-text">微信一键登录，轻松法律咨询</div>
          <div className="submit-btn" onClick={this.submitLogin.bind(this)}>微信一键登录</div>
        </div>
      </div>
    );
  }
}
export default Login;
