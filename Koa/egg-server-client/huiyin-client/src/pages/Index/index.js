/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-26 19:26:15
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
import { Toast, Modal} from "antd-mobile";
import http from "@/fetch";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import relly from "./relly.jpg";
import slogan from "./slogan.jpg";
import favicon from "./favicon.png";
import jiantou from "./jiantou.png";
@connect(
  (state) => state.reducer,
  (dispatch) => bindActionCreators(actions, dispatch)
)
class Index extends React.Component {
  state = {
    bannerdata: [
      {
        id: 1,
        path: relly,
      },
      {
        id: 2,
        path: slogan,
      }
    ],
    note: ''
  };

  componentDidMount() {
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
    this.handleNote()
  }
  handleNote() {
    const param = {}
    http("/income/note", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        let note = '';
        if (data && data.length > 0) {
          note = data.join('；')
        }
        this.setState({
          note: note
        })
      } else {
        Toast.info(result.msg);
      }
    });
  }
  handleNav(value) {
    const user = this.props.user;
    switch (value) {
      case 1:
        // 咨询律师
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
      case 2:
        // 推广赚佣金
        //this.props.history.push({ pathname : `/regist`, state: { id: this.props.user.userId} })
        //this.props.history.push(`/regist/${this.props.user.userId}`);
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
        // 项目介绍
        this.props.history.push("/introduce");
        break;
      default:
    }
  }
  render() {
    const { bannerdata, note} = this.state;
    return (
      <div className="index-page page">
        <Helmet>
          <title>汇银私律</title>
        </Helmet>
        <div className="index-banner">
          <div className="swiper-container" ref="swipercontainer">
            <div className="swiper-wrapper">
              {bannerdata.map((item) => (
                <div className="swiper-slide" key={item.id}>
                  <img src={item.path} className="swiper-slide-image" />
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
        <div className="marquee">
          <span className="noc-icon"></span>
          <div className="marquee-content">
            <marquee loop="infinite">{note}</marquee>
          </div>
          {/* <span className="close-icon"></span> */}
        </div>
        <div className="toolbar">
          <ul className="toolbar-ul">
            <li className="toolbar-li" onClick={this.handleNav.bind(this, 1)}>
              <div className="toolbar-li-content">
                <p className="toolbar-li-title">法律咨询</p>
                {/* <p className="toolbar-li-text">16.25万次+</p> */}
              </div>
              <span className="toolbar-li-icon">
                <span className="icon-font iconfont icon-zixun"></span>
              </span>
            </li>
            <li className="toolbar-li" onClick={this.handleNav.bind(this, 2)}>
              <div className="toolbar-li-content">
                <p className="toolbar-li-title">推荐会员</p>
                {/* <p className="toolbar-li-text">￥5.00</p> */}
              </div>
              <span className="toolbar-li-icon">
                <span className="icon-font iconfont icon-tuisong-copy"></span>
              </span>
            </li>
          </ul>
        </div>
        <div className="page-space"></div>

        {/* <div className="order-container-bg">
          <div className="order-container">
            <div className="order-title">最新咨询</div>
            <ul className="order-ul">
              <li className="order-li">
                <div className="order-li-left">
                  <img
                    src="https://res.houselawyer.com.cn/uploadimage/2020-3-18/Acg1822034620200273637.png?x-oss-process=image/resize,m_fill,h_60,w_60"
                    className="userimage"
                  />
                  <span className="order-li-txt username">王**</span>
                  <span className="order-li-txt userphone">156********</span>
                  <span className="order-li-txt paymoney">￥5.00</span>
                  <span className="order-li-txt dothing">咨询</span>
                </div>
                <div className="order-li-right">
                  <span className="order-li-txt time">14分钟前</span>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="introduce-box">
          <div className="introduce">
            <div className="introduce-title">
              <span className="title-text">项目介绍</span>
              <span className="title-icon" onClick={this.handleNav.bind(this, 3)}>
                <img src={jiantou} className="title-icon-img"/>
              </span>
            </div>
            <div className="introduce-content">
              <img src={favicon} className="introduce-image"/>
              <div className="content-des">
                "汇银私人律师沙龙"是上海汇银律师事务所和上海麟丽文化传播有限公司联合发起的，向本市高端商务人群提供免费私人律师服务、组织商务交流平台...
              </div>
            </div>
          </div>
          <div className="introduce">
            <div className="introduce-title">
              <span className="title-text">联系我们</span>
            </div>
            <div className="contact-box">
              <div className="contact-li">
                <div className="contact-li-title">
                  <span className="contact-icon iconfont icon-dizhi"></span>
                  <span className="contact-title">地址:</span>
                </div>
                <div className="contact-li-content">
                  上海市徐汇区斜土路1077号B幢503室
                </div>
              </div>
              <div className="contact-li">
                <div className="contact-li-title">
                  <span className="contact-icon iconfont icon-dianhua"></span>
                  <div className="contact-title">电话:</div>
                </div>
                <div className="contact-li-content">
                  <a href="tel:021-54077245">021-54077245</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
