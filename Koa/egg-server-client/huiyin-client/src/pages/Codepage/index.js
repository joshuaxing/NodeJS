/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-13 19:19:02
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
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class CodePage extends React.Component {

  state = {
    url: ''
  }
  componentDidMount() {
    const user = this.props.user;
    const url = `http://weixin.hy-pls.cn/api/qcode/recommend?memberid=${user.userId}`
    this.setState({
      url: url
    })
  }
  componentWillUnmount () {}
  render() {
    return (
      <div className="code-page page">
        <Helmet>
          <title>我的推广码</title>
        </Helmet>
        <div className="code-box">
          <img src={this.state.url} className="code-image"/>
          <p className="code-text">长按可识别二维码或者下载分享</p>
        </div>
      </div>
    );
  }
}
export default CodePage;
