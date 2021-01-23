/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-17 12:08:12
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
import { Toast } from "antd-mobile";
import http from "@/fetch";
import forbidshare from "@/utils/forbidshare.js";
@connect(
  (state) => state.reducer,
  (dispatch) => bindActionCreators(actions, dispatch)
)
class RecordDetail extends React.Component {
  state = {
    result: {
      title: "",
      content: "",
    },
  };

  componentDidMount() {
    forbidshare();
    const id = this.props.location.state ? this.props.location.state.id : "";
    if (id) {
      this.gotData(id);
    }
  }

  gotData(id) {
    const param = {
      id: id,
    };
    http("/inquiry/info", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        this.setState({
          result: data,
        });
      } else {
        Toast.info(result.msg);
      }
    });
  }
  handleString(value) {
    return value.substring(0, 1) + "**";
  }
  render() {
    const { result } = this.state;
    return (
      <div className="recorddetail-page page">
        <Helmet>
          <title>咨询详情</title>
        </Helmet>
        <div className="recorddetail-content">
          <div className="recorddetail-title">
            咨询主题：{result.title}
          </div>
          <div className="issue-content">
           咨询内容：{result.content}
          </div>
          <div className="info-detail">
            <span className="name">咨询时间：</span>
            <span className="time">{result.createtime}</span>
          </div>
          {
            result.replystatus === 1 && (<div className="issue-content issue-content-bottom">
              您的咨询正在回复中...
           </div>)
          }
          {
            result.replystatus === 2 && (<div className="issue-content issue-content-bottom">
            回复内容：{result.replycontent}
           </div>)
          }
          {
            result.replystatus === 2 && ( <div className="info-detail">
            <span className="name">来自 {result.offlinename}的回复</span>
            <span className="time">{result.updatetime}</span>
          </div>)
          }
         
        </div>
      </div>
    );
  }
}
export default RecordDetail;
