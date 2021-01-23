/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-22 09:57:38
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
import nofoud from "./nofoud.png";
@connect(
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class NOMATCH extends React.Component {

  state = {
    
  }
  componentDidMount() {}

  componentWillUnmount () {}

  handleBack () {
    this.props.history.push('/')
  }
  render() {

    return (
      <div className="nofound-page page">
        <Helmet>
          <title>页面404</title>
        </Helmet>
        <div className="nofound-content">
          <img src={nofoud} className="nofound-icon"/>
          <div className="nofound-txt">您没有访问权限，请登录或者没有此页面</div>
          <div className="nofound-btn" onClick={this.handleBack.bind(this)}>返回首页</div>
        </div>
      </div>
    );
  }
}
export default NOMATCH;
