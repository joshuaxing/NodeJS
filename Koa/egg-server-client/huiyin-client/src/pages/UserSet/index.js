/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-17 11:48:42
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
import headicon from "./head-icon@2x.png";
import forbidshare from "@/utils/forbidshare.js";
@connect(
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class Set extends React.Component {

  state = {
    result: {
      lifeprovincename: "",
      workprovincename: "",
      provinceList: [],
      result: {}
    }
  }
  componentDidMount() {
    forbidshare()
    this.gotData();
  }
  
  componentWillUnmount () {}

  gotData() {
    const user = this.props.user;
    const param = {
      id: user.userId
    };
    http("/member/info", {
      data: param
    }).then(result => {
      if (result.code === 0) {
        const data = result.data;
        this.setState({
          result: data,
          lifeprovincename: data.lifeprovincename,
          workprovincename: data.workprovincename
        });
      } else {
        Toast.info(result.msg);
      }
    });
  }

  handleLoginOut () {
    const user = this.props.user;
    const param = {
      id: user.userId
    };
    http("/member/loginout", {
      data: param
    }).then(result => {
      if (result.code === 0) {
        this.handleBack()
      } else {
        Toast.info(result.msg);
      }
    });
  }
  handleBack () {
    this.props.history.push('/login')
    localStorage.removeItem("_shlawyertoken2020");
    const user = {
      userId: 0,
      token: "",
      checkstatus: ""
    };
    //退出登陆
    this.props.Login(user)
  }

   // 获取省份
  gotProvinceList() {
    const param = {};
    http("/member/province", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        this.setState({
          provinceList: data,
        });
      } else {
        Toast.info(result.msg);
      }
    });
  }

  render() {
    const {result, lifeprovincename, workprovincename} = this.state;
    return (
      <div className="set-page page">
        <Helmet>
          <title>我的设置</title>
        </Helmet>
        <ul className="table-ul">
          <li className="table-li table-li">
            <span className="table-li-title">头像</span>
            <span className="table-li-content">
              <img src={result.logourl ? result.logourl : headicon} className="table-li-icon"/>
            </span>
          </li>
          <li className="table-li">
            <span className="table-li-title">真实姓名</span>
            <span className="table-li-content">{result.truename ? result.truename : ''}</span>
          </li>
          <li className="table-li">
            <span className="table-li-title">微信昵称</span>
            <span className="table-li-content">{result.nickname ? result.nickname : ''}</span>
          </li>
          <li className="table-li">
            <span className="table-li-title">手机号</span>
            <span className="table-li-content">{result.phone ? result.phone: ''}</span>
          </li>
          <li className="table-li">
            <span className="table-li-title">工作地点</span>
            <span className="table-li-content">{lifeprovincename ? lifeprovincename: ''}</span>
          </li>
          <li className="table-li">
            <span className="table-li-title">生活地点</span>
            <span className="table-li-content">{workprovincename ? workprovincename: ''}</span>
          </li>
          {/* <li className="table-li">
            <span className="table-li-title">推荐人</span>
            <span className="table-li-content">{result.workprovincename ? result.workprovincename: ''}</span>
          </li> */}
        </ul>
        <div className="back-btn-box">
          <div className="back-btn" onClick={this.handleLoginOut.bind(this)}>退出登陆</div>
        </div>
      </div>
    );
  }
}
export default Set;
