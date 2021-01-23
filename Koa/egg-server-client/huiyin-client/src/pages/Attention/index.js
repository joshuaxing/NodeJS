/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-29 22:08:44
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
import code from './lscode.jpg'
@connect(
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class Attention extends React.Component {

  state = {
    
  }
  componentDidMount() {}

  componentWillUnmount () {}

  handleBack () {
    this.props.history.push('/user')
  }
  render() {
    //80px
    return (
      <div className="attention-page page">
        <Helmet>
          <title>关注公众号</title>
        </Helmet>
        <div className="attention-content">
          <img src={code} className="attention-icon"/>
          <div className="attention-txt">提示：请长按识别二维码关注公众号，完成注册的最后一步</div>
          {/* <div className="attention-btn" onClick={this.handleBack.bind(this)}>我的私律</div> */}
        </div>
      </div>
    );
  }
}
export default Attention;
