/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-26 18:26:03
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
import introduce from "./introduce.jpg";
@connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)
class Introduce extends React.Component {
  state = {
   
  };
  componentDidMount() {
   
  }
  render() {
    const {} = this.state;
    return (
      <div className="introduce-page page">
        <Helmet>
          <title>私人律师</title>
        </Helmet>
        <div className="introducepage-banner">
          <img src={introduce} className="introduce-banner"/>
        </div>
        <div className="introducepage-box">
          <div className="introducepage">
            <div className="introducepage-title">
              项目介绍
            </div>
            <div className="introducepage-content">
              <p>本程序仅供<span className="noun-color">"汇银私人律师沙龙"</span>注册会员享受服务所用，如未加入本沙龙会员的，请联系推荐人尽快办理推荐手续。</p>
              <p><span className="noun-color">"汇银私人律师沙龙"</span>是上海汇银律师事务所和上海麟丽文化传播有限公司联合发起的，向本市高端商务人群提供免费私人律师服务、组织商务交流平台。申请加入会员应当符合以下条件：</p>
              <p>(1)具有硕士以上学历；</p>
              <p>(2) 外企、中外企合资企业、民营企业业主或者股东；</p>
              <p>(3) 知名企业高管；</p>
              <p>(4) 行业协会的负责人或者主要管理者；</p>
              <p>(5)法学学者，律师、法律工作者；</p>
              <p>(6)其他会员推荐的人；</p>
            </div>
          </div>
          <div className="introducepage">
            <div className="introducepage-title">
              联系我们
            </div>
            <div className="contactpage-box">
              <div className="contactpage-li">
                <div className="contactpage-li-title">
                  <span className="contactpage-icon iconfont icon-dizhi"></span>
                  <span className="contactpage-title">地址:</span>
                </div>
                <div className="contactpage-li-content">
                  上海市徐汇区斜土路1077号B幢503室
                </div>
              </div>
              <div className="contactpage-li">
                <div className="contactpage-li-title">
                  <span className="contactpage-icon iconfont icon-dianhua"></span>
                  <div className="contactpage-title">电话:</div>
                </div>
                <div className="contactpage-li-content">
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
export default Introduce;
