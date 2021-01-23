/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-28 16:27:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\pages\Login\index.js
 */
import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";
import * as actions from "@/store/actions";
import { Toast, Modal } from "antd-mobile";
import http from "@/fetch";
import headicon from "./head-icon@2x.png";
@connect(
  (state) => state.reducer,
  (dispatch) => bindActionCreators(actions, dispatch)
)
class User extends React.Component {
  state = {
    result: {
      truename: "",
      nickname: "",
      showamount: "--",
      logourl: "",
      checkstatus: 0,
    },
  };
  componentDidMount() {
    const user = this.props.user;
    if (user.userId) {
      this.gotData();
    }
  }
  gotData() {
    const user = this.props.user;
    const param = {
      id: user.userId,
    };
    http("/member/info", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        this.setState({
          result: data
        });
        //更新用户状态
        const uservalue = {
          userId: data.id,
          token: user.token,
          checkstatus: data.checkstatus
        };
        this.props.Login(uservalue)
        localStorage.setItem('_shlawyertoken2020', JSON.stringify(uservalue));
      } else {
        Toast.info(result.msg);
      }
    });
  }

  handleNav(value) {
    const user = this.props.user;

    switch (value) {
      case 1:
        // 我的咨询
        if (user.userId && user.checkstatus === 2) {
          this.props.history.push("/userRecord");
        } else if (user.checkstatus === 1) {
          Modal.alert('资料审核中', '抱歉，您的资料正在审核中，审核通过后才能使用此功能', [
            { text: '确定'}
          ])
        } else if (user.checkstatus === 3) {
          Modal.alert('资料被拒绝', '抱歉，您的资料被拒绝，请联系平台或者重新注册', [
            { text: '取消', style: 'default' },
            { text: '去注册', onPress: () => this.props.history.push("/regist")}
          ])
        } else {
          Modal.alert('未登录', '抱歉，您还没有登录，快去登录吧', [
            { text: '取消', style: 'default' },
            { text: '去登录', onPress: () => this.props.history.push("/login")}
          ])
        }
        break;
      case 2:
        //我的推广码
        if (user.userId && user.checkstatus === 2) {
          this.props.history.push(`/codepage`);
        } else if (user.checkstatus === 1) {
          Modal.alert('资料审核中', '抱歉，您的资料正在审核中，审核通过后才能使用此功能', [
            { text: '确定'}
          ])
        } else if (user.checkstatus === 3) {
          Modal.alert('资料被拒绝', '抱歉，您的资料被拒绝，请联系平台或者重新注册', [
            { text: '取消', style: 'default' },
            { text: '去注册', onPress: () => this.props.history.push("/regist")}
          ])
        } else {
          Modal.alert('未登录', '抱歉，您还没有登录，快去登录吧', [
            { text: '取消', style: 'default' },
            { text: '去登录', onPress: () => this.props.history.push("/login")}
          ])
        }
        break;
      case 3:
        //我的积分
        if (user.userId && user.checkstatus === 2) {
          const { showamount } = this.state.result;
          this.props.history.push({
            pathname: "/brokerage",
            state: { amount: showamount },
          });
        } else if (user.checkstatus === 1) {
          Modal.alert('资料审核中', '抱歉，您的资料正在审核中，审核通过后才能使用此功能', [
            { text: '确定'}
          ])
        } else if (user.checkstatus === 3) {
          Modal.alert('资料被拒绝', '抱歉，您的资料被拒绝，请联系平台或者重新注册', [
            { text: '取消', style: 'default' },
            { text: '去注册', onPress: () => this.props.history.push("/regist")}
          ])
        } else {
          Modal.alert('未登录', '抱歉，您还没有登录，快去登录吧', [
            { text: '取消', style: 'default' },
            { text: '去登录', onPress: () => this.props.history.push("/login")}
          ])
        }
        break;
      case 4:
        //咨询律师
        if (user.userId && user.checkstatus === 2) {
          this.props.history.push("/counsel");
        } else if (user.checkstatus === 1) {
          Modal.alert('资料审核中', '抱歉，您的资料正在审核中，审核通过后才能使用此功能', [
            { text: '确定'}
          ])
        } else if (user.checkstatus === 3) {
          Modal.alert('资料被拒绝', '抱歉，您的资料被拒绝，请联系平台或者重新注册', [
            { text: '取消', style: 'default' },
            { text: '去注册', onPress: () => this.props.history.push("/regist")}
          ])
        } else {
          Modal.alert('未登录', '抱歉，您还没有登录，快去登录吧', [
            { text: '取消', style: 'default' },
            { text: '去登录', onPress: () => this.props.history.push("/login")}
          ])
        }
        break;
      case 5:
        //我的设置
        if (user.userId) {
          this.props.history.push("/userset");
        }  else {
          Modal.alert('未登录', '抱歉，您还没有登录，快去登录吧', [
            { text: '取消', style: 'default' },
            { text: '去登录', onPress: () => this.props.history.push("/login")}
          ])
        }
        break;
      case 6:
        //常见问题
        this.props.history.push("/commonIssue");
        break;
      default:
    }
  }
  handlePirce(value) {
    return typeof value === "number" ? value.toFixed(2) : "0.00";
  }
  render() {
    const { result } = this.state;
    return (
      <div className="user-page page">
        <Helmet>
          <title>我的私律</title>
        </Helmet>
        <div className="user-header">
          <div className="header-content">
            <img
              src={result.logourl ? result.logourl : headicon}
              className="header-image"
            />
            <div className="header-other">
              <div className="header-name">
                <span className="header-name-span">
                  {result.truename ? result.truename : "未登录"}
                </span>
                {result.checkstatus === 1 && (
                  <span className="header-name-label">审核中</span>
                )}
              </div>
              {result.nickname && (
                <span className="header-name nickname">
                  微信昵称：{result.nickname}
                </span>
              )}
            </div>
          </div>
          <div className="money-card">
            <div className="card-item" onClick={this.handleNav.bind(this, 3)}>
              <div className="card-des">总积分</div>
              <div className="card-num">{result.showamount}</div>
            </div>
          </div>
        </div>
        <div className="user-content">
          <ul className="userlist-ul">
            <li
              className="userlist-item"
              onClick={this.handleNav.bind(this, 2)}
            >
              <span className="userlist-item-icon iconfont icon-tuisong-copy"></span>
              <span className="userlist-item-text">分享推广</span>
            </li>
            <li
              className="userlist-item"
              onClick={this.handleNav.bind(this, 3)}
            >
              <span className="userlist-item-icon iconfont icon-shouyi"></span>
              <span className="userlist-item-text">我的积分</span>
            </li>
            <li
              className="userlist-item"
              onClick={this.handleNav.bind(this, 5)}
            >
              <span className="userlist-item-icon iconfont icon-shezhi"></span>
              <span className="userlist-item-text">我的设置</span>
            </li>
            <li
              className="userlist-item"
              onClick={this.handleNav.bind(this, 4)}
            >
              <span className="userlist-item-icon iconfont icon-zixun"></span>
              <span className="userlist-item-text">咨询律师</span>
            </li>
            <li
              className="userlist-item"
              onClick={this.handleNav.bind(this, 1)}
            >
              <span className="userlist-item-icon iconfont icon-xiangmujieshao"></span>
              <span className="userlist-item-text">我的咨询</span>
            </li>
            <li
              className="userlist-item"
              onClick={this.handleNav.bind(this, 6)}
            >
              <span className="userlist-item-icon iconfont icon-wenti"></span>
              <span className="userlist-item-text">常见问题</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default User;
