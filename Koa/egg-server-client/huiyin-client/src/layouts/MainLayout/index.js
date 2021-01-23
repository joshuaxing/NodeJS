/*
 * @Author: your name
 * @Date: 2020-03-03 11:46:41
 * @LastEditTime: 2020-04-21 12:50:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\layouts\MainLayout\index.js
 */
import React from "react";
import "./style.scss";
import Nav from "@/components/Nav";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@/store/actions";
// 微信禁止分享
import forbidshare from "@/utils/forbidshare.js";
@connect(
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class MainLayout extends React.Component {
  componentDidMount () {
    forbidshare()
  }
  render() {
    const {children} = this.props
    return <div className="page app-page">
        <div className="app-page-body">
            {children}
        </div>
        <Nav/>
    </div>;
  }
}
export default MainLayout;
