/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-04-21 12:43:35
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
import forbidshare from "@/utils/forbidshare.js";

@connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)
class Index extends React.Component {

  state = {
   
  }

  componentDidMount() {
    forbidshare()
  }
  render() {
    return (
      <div className="index-page page">
        <Helmet>
          <title></title>
        </Helmet>
      </div>
    );
  }
}
export default Index;
