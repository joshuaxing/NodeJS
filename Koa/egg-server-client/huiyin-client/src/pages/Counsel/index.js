/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-17 11:32:06
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
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class Counsel extends React.Component {

  state = {
    title: '',
    errortitle: '',
    content: '',
    errorcontent: ''
  }
  componentDidMount() {
    forbidshare()
  }

  componentWillUnmount () {}

  handleSubmit() {
    const user = this.props.user;
    const {title, content} = this.state;
    if (!title) {
      this.setState({
        errortitle: '咨询主题不能为空'
      })
    } else if (!content) {
      this.setState({
        errorcontent: '咨询内容不能为空'
      })
    } else {
      this.setState({
        errortitle: '',
        errorcontent: ''
      })
      // 清除特殊字符
      let regtitle = this.isEmojiCharacter(title);
      let regcontent = this.isEmojiCharacter(content)
      const param = {
        memberid: user.userId,
        title: regtitle,
        content: regcontent
      };
      http("/inquiry/add", {
        data: param
      }).then(result => {
        if (result.code === 0) {
          Toast.success('提交成功', 1);
          setTimeout(() => {
            this.props.history.push("/user");
          }, 1000)
        } else {
          Toast.info(result.msg);
        }
      });
    }
  }
  isEmojiCharacter (str) {
    const regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    let value = str;
    if (regStr.test(str)) {
      value = str.replace(regStr, '')
    }
    return value
  }
  handleTitle = (e) => {
    const value = e.target.value;
    this.setState({
      title: value
    })
  }
  handleTitleBlur = () => {
    this.handleBlur()
    if (!this.state.title) {
      this.setState({
        errortitle: '咨询主题不能为空'
      })
    } else {
      this.setState({
        errortitle: ''
      })
    }
  }
  handleContent = (e) => {
    const value = e.target.value;
    this.setState({
      content: value
    })
  }
  handleContentBlur = () =>{
    this.handleBlur()
    if (!this.state.content) {
      this.setState({
        errorcontent: '咨询内容不能为空'
      })
    } else {
      this.setState({
        errorcontent: ''
      })
    }
  }
  handleBlur () {
    window.scrollTo(0,0)
  }
  render() {
    const {errortitle, errorcontent} = this.state;
    return (
      <div className="counsel-page page">
        <Helmet>
          <title>填写咨询内容</title>
        </Helmet>
        <div className="counsel-title">填写咨询内容</div>
        <div className="counsel-form">
          <div className="form-item">
            <div className="form-item-lable"><span className="required-icon">*</span>咨询主题</div>
            <div className="form-item-ipt">
              <textarea className="ipt" placeholder="请输入主题" rows="3" onChange={this.handleTitle} onBlur={this.handleTitleBlur}></textarea>
            </div>
            {
              errortitle && (<div className="form-item-error">{errortitle}</div>)
            }
          </div>
          <div className="form-item">
            <div className="form-item-lable"><span className="required-icon">*</span>咨询内容</div>
            <div className="form-item-ipt">
              <textarea className="ipt" placeholder="请输入内容" rows="8" onChange={this.handleContent} onBlur={this.handleContentBlur}></textarea>
            </div>
            {
              errorcontent && (<div className="form-item-error">{errorcontent}</div>)
            }   
          </div>
        </div>
        <div className="back-btn-box">
          <div className="back-btn" onClick={this.handleSubmit.bind(this)}>提交</div>
        </div>
      </div>
    );
  }
}
export default Counsel;
