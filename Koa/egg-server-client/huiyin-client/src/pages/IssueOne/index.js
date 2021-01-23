/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-26 18:47:40
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
import data from "./data.js";
@connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)
class IssueOne extends React.Component {

  state = {
    result: {}
  }

  componentDidMount() {
    forbidshare();
    const id = this.props.location.state ? this.props.location.state.id : 4;
    const index = parseInt(id)
    const result = data[index]
    this.setState({
      result: result
    })
  }
  render() {
    const { result } = this.state
    return (
      <div className="issueDetail-page page">
        <Helmet>
          <title>常见问题</title>
        </Helmet>
        <div className="issueDetail-content">
          <div className="issueDetail-header">{result.title}</div>
          <div className="issueDetail-con">{result.content}</div>
        </div>
      </div>
    );
  }
}
export default IssueOne;
