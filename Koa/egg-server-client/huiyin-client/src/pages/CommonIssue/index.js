/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-26 18:49:51
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

@connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)
class CommonIssue extends React.Component {

  state = {
    
  }

  componentDidMount() {
   
  }

  handleDetail (value) {
    this.props.history.push({ pathname: "/issueOne", state: { id: value } });
  }

  render() {
    return (
      <div className="issue-page page">
        <Helmet>
          <title>常见问题</title>
        </Helmet>
        <ul className="issue-content">
          <li className="issue-li" onClick={this.handleDetail.bind(this, 0)}>
            <div className="issue">
              <span className="issue-num">1、</span>
              <span className="issue-con">加入“汇银私人律师沙龙”会员，真的会有自己专属的私人律师吗？</span>
            </div>
            <span className="issue-icon"></span>
          </li>
          <li className="issue-li" onClick={this.handleDetail.bind(this, 1)}>
            <div className="issue">2. 专属私人律师可以提供哪些服务？</div>
            <span className="issue-icon"></span>
          </li>
          <li className="issue-li" onClick={this.handleDetail.bind(this, 2)}>
            <div className="issue">3、专属私人律师的服务是否会收费？</div>
            <span className="issue-icon"></span>
          </li>
          <li className="issue-li" onClick={this.handleDetail.bind(this, 3)}>
            <div className="issue">4. 项目中的“积分”有什么用？</div>
            <span className="issue-icon"></span>
          </li>
        </ul>
      </div>
      
    );
  }
}
export default CommonIssue;
