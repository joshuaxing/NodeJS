/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-29 22:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\pages\Login\index.js
 */
import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";
import { Toast, Modal, Picker } from "antd-mobile";
import http from "@/fetch";
import * as actions from "@/store/actions";
const appid = "wxfe9c9c2ad747787e";
const redirect_uri = "http://weixin.hy-pls.cn/regist";

@connect(
  (state) => state.reducer,
  (dispatch) => bindActionCreators(actions, dispatch)
)
class Regist extends React.Component {
  weixinurl = "";
  state = {
    phone: "",
    phoneerror: "",
    name: "",
    nameerror: "",
    departmentValue: [],
    departmentid: "",
    departmentname: "",
    departmentnameerror: "",
    lifeprovince: [],
    lifeprovinceid: "",
    lifeprovincename: "",
    lifeprovinceerror: "",
    recommendmemberid: "",
    recommendname: "",
    recommenderror: "",
    provinceList: [],
    openid: "",
  };
  componentDidMount() {
    // openid
    const openid = this.props.location.state
      ? this.props.location.state.openid
      : "";

    if (!openid) {
      // 二维码入口注册
      // 推荐人ID
      const id = this.getQueryString("id") ? this.getQueryString("id") : "";
      // console.log(id)
      // 微信获取code重定向
      this.weixinurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${id}#wechat_redirect`;
      const urlcode = this.getQueryString("code");
      console.log(urlcode);
      if (!urlcode) {
        window.location.href = this.weixinurl;
      } else {
        console.log('state', this.getQueryString("state"))
        const recommendmemberid = this.getQueryString("state")
          ? parseInt(this.getQueryString("state"))
          : "";
        console.log(recommendmemberid);
        this.setState({
          recommendmemberid: recommendmemberid,
        });
      }
    } else {
      this.setState({
        openid: openid
      });
    }
    this.gotProvinceList();
  }
  componentWillUnmount() {}
  // 获取省份
  gotProvinceList() {
    const param = {};
    http("/member/province", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        data.map((item) => {
          item.value = item.id;
          item.label = item.provincename;
        });
        this.setState({
          provinceList: data,
        });
      } else {
        Toast.info(result.msg);
      }
    });
  }
  // 推荐人
  handleRecommendNameInput = (e) => {
    const value = e.target.value;
    this.setState({
      recommendname: value,
    });
  };
  // 真实姓名
  handleNameInput = (e) => {
    const value = e.target.value;
    this.setState({
      name: value,
    });
  };
  // 手机号
  handlePhoneInput = (e) => {
    const value = e.target.value;
    this.setState({
      phone: value,
    });
  };
  // 工作所在地
  hanldeOk = (v) => {
    const filteritem = this.state.provinceList.filter(
      (item) => item.value === v[0]
    );

    let departmentnameerror = "";
    if (filteritem.length > 0) {
      departmentnameerror = "";
    } else {
      departmentnameerror = "不能为空";
    }
    this.setState({
      departmentid: v[0],
      departmentname: filteritem[0].label,
      departmentValue: v,
      departmentnameerror: departmentnameerror,
    });
  };
  // 生活所在地
  hanldeLifeOk = (v) => {
    const filteritem = this.state.provinceList.filter(
      (item) => item.value === v[0]
    );
    let lifeprovinceerror = "";
    if (filteritem.length > 0) {
      lifeprovinceerror = "";
    } else {
      lifeprovinceerror = "不能为空";
    }
    this.setState({
      lifeprovinceid: v[0],
      lifeprovincename: filteritem[0].label,
      lifeprovince: v,
      lifeprovinceerror: lifeprovinceerror,
    });
  };
  handleBlur(value) {
    window.scrollTo(0, 0);
    switch (value) {
      case 1:
        // 手机号
        setTimeout(() => {
          if (!this.state.phone) {
            this.setState({
              phoneerror: "不能为空",
            });
          } else {
            if (!/^1[23456789]\d{9}$/.test(this.state.phone)) {
              this.setState({
                phoneerror: "手机号码不合法",
              });
            } else {
              this.setState({
                phoneerror: "",
              });
            }
          }
        });
        break;
      case 2:
        //真实姓名
        setTimeout(() => {
          if (!this.state.name) {
            this.setState({
              nameerror: "不能为空",
            });
          } else {
            this.setState({
              nameerror: "",
            });
          }
        });
        break;
      case 3:
        //工作所在地
        setTimeout(() => {
          if (!this.state.departmentname) {
            this.setState({
              departmentnameerror: "不能为空",
            });
          } else {
            this.setState({
              departmentnameerror: "",
            });
          }
        });
        break;
      case 4:
        //生活所在地
        setTimeout(() => {
          if (!this.state.lifeprovincename) {
            this.setState({
              lifeprovinceerror: "不能为空",
            });
          } else {
            this.setState({
              lifeprovinceerror: "",
            });
          }
        });
        break;
      case 5:
        //推荐人姓名
        // setTimeout(() => {
        //   if (!this.state.recommendname) {
        //     this.setState({
        //       recommenderror: "不能为空",
        //     });
        //   } else {
        //     this.setState({
        //       recommenderror: "",
        //     });
        //   }
        // });
        break;
    }
  }
  clearFromValue(value) {
    switch (value) {
      case 1:
        this.setState({
          phone: "",
          phoneerror: "不能为空",
        });
        break;
      case 2:
        this.setState({
          name: "",
          nameerror: "不能为空",
        });
        break;
      case 3:
        this.setState({
          departmentid: "",
          departmentValue: [],
          departmentname: "",
          departmentnameerror: "不能为空",
        });
        break;
      case 4:
        this.setState({
          lifeprovinceid: "",
          lifeprovince: [],
          lifeprovincename: "",
          lifeprovinceerror: "不能为空",
        });
        break;
      case 5:
        // this.setState({
        //   recommendname: "",
        //   recommenderror: "不能为空",
        // });
        break;
    }
  }
  submitLogin() {
    this.submitCodeLogin();
  }
  // 注册提交
  submitCodeLogin() {
    const {
      phone,
      name,
      departmentid,
      lifeprovinceid,
      recommendname,
      recommendmemberid,
      openid,
    } = this.state;
    let urlcode = ''
    if(!openid) {

      urlcode = this.getQueryString("code");
      
      if (!urlcode) {
        window.location.href = this.weixinurl;
        return;
      }
    }

    if (!name) {
      this.setState({
        nameerror: "不能为空",
      });
    } else if (!/^1\d{10}$/.test(phone)) {
      this.setState({
        phoneerror: "手机号码不合法",
      });
    } else if (!departmentid) {
      this.setState({
        departmentnameerror: "不能为空",
      });
    } else if (!lifeprovinceid) {
      this.setState({
        lifeprovinceerror: "不能为空",
      });
    } else {
      this.setState({
        nameerror: "",
        phoneerror: "",
        departmentnameerror: "",
        lifeprovinceerror: "",
        recommenderror: "",
      });
      const recommendmemberidvalue = recommendmemberid ? recommendmemberid : 0;
      const paramdata = {
        phone: phone,
        code: urlcode,
        truename: name,
        workprovince: departmentid,
        lifeprovince: lifeprovinceid,
        recommendname: recommendname,
        recommendmemberid: recommendmemberidvalue,
        openid: openid,
      };
      http("/member/register", {
        data: paramdata,
      }).then((result) => {
        if (result.code === 0) {
          // Toast.info("恭喜您，注册成功，等待管理审核登陆吧");

          // Modal.alert('注册成功', '恭喜您，注册成功，等待管理审核后登陆吧', [
          //   { text: '确定', onPress: () => this.props.history.push("/login") },
          // ])

          const data = result.data;
          const value = {
            userId: data.id,
            token: data.token,
            checkstatus: data.checkstauts ? data.checkstauts : 0,
          };
          localStorage.setItem("_shlawyertoken2020", JSON.stringify(value));
          this.props.Login(value);
          if (!recommendmemberidvalue) {
            this.props.history.push("/user");
          } else {
            this.props.history.push("/attention");
          }
        } else {
          Toast.info(result.msg);
        }
      });
    }
  }
  getQueryString(name) {
    //encodeURI decodeURI encodeURIComponent decodeURIComponent
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return r[2];
    } else {
      return null;
    }
  }
  render() {
    const {
      phone,
      name,
      departmentValue,
      departmentname,
      lifeprovince,
      lifeprovincename,
      recommendmemberid,
      recommendname,
      nameerror,
      phoneerror,
      lifeprovinceerror,
      recommenderror,
      departmentnameerror,
    } = this.state;

    return (
      <div className="apply-page page">
        <Helmet>
          <title>私人律师会员注册</title>
        </Helmet>
        <div className="user-name">会员注册</div>
        <div className="form-ul">
          <div className="form-ul-item">
            <div className="form-li-label">
              <span className="required-icon">*</span>真实姓名
            </div>
            <div className="form-li border-1px">
              <span className="form-li-icon iconfont icon-person_grey"></span>
              <input
                type="text"
                className="form-li-input"
                placeholder="请输入真实姓名"
                onChange={this.handleNameInput}
                value={name}
                onBlur={this.handleBlur.bind(this, 2)}
              />
              {name ? (
                <span
                  className="form-li-icon close-icon"
                  onClick={this.clearFromValue.bind(this, 2)}
                ></span>
              ) : null}
            </div>
            {nameerror && <div className="form-li-error">{nameerror}</div>}
          </div>
          <div className="form-ul-item">
            <div className="form-li-label">
              <span className="required-icon">*</span>手机号
            </div>
            <div className="form-li border-1px">
              <span className="form-li-icon iconfont icon-shouji3"></span>
              <input
                type="number"
                className="form-li-input"
                placeholder="请输入手机号码"
                onChange={this.handlePhoneInput}
                maxLength={11}
                value={phone}
                onBlur={this.handleBlur.bind(this, 1)}
              />
              {phone ? (
                <span
                  className="form-li-icon close-icon"
                  onClick={this.clearFromValue.bind(this, 1)}
                ></span>
              ) : null}
            </div>
            {phoneerror && <div className="form-li-error">{phoneerror}</div>}
          </div>
          <div className="form-ul-item">
            <div className="form-li-label">
              <span className="required-icon">*</span>工作所在地
            </div>
            <Picker
              data={this.state.provinceList}
              cols={1}
              onOk={(v) => {
                this.hanldeOk(v);
              }}
              onDismiss={() => {
                this.handleBlur(3);
              }}
              value={departmentValue}
            >
              <div className="form-li border-1px">
                <span className="form-li-icon iconfont icon-dizhi1"></span>
                <input
                  type="text"
                  className="form-li-input"
                  placeholder="请选择工作所在地"
                  value={departmentname}
                  readOnly
                />
                {departmentname ? (
                  <span
                    className="form-li-icon close-icon"
                    onClick={this.clearFromValue.bind(this, 3)}
                  ></span>
                ) : null}
              </div>
            </Picker>
            {departmentnameerror && (
              <div className="form-li-error">{departmentnameerror}</div>
            )}
          </div>

          <div className="form-ul-item">
            <div className="form-li-label">
              <span className="required-icon">*</span>生活所在地
            </div>
            <Picker
              data={this.state.provinceList}
              cols={1}
              onOk={(v) => {
                this.hanldeLifeOk(v);
              }}
              onDismiss={() => {
                this.handleBlur(4);
              }}
              value={lifeprovince}
            >
              <div className="form-li border-1px">
                <span className="form-li-icon iconfont icon-dizhi1"></span>
                <input
                  type="text"
                  className="form-li-input"
                  placeholder="请选择生活所在地"
                  value={lifeprovincename}
                  readOnly
                />
                {lifeprovincename ? (
                  <span
                    className="form-li-icon close-icon"
                    onClick={this.clearFromValue.bind(this, 4)}
                  ></span>
                ) : null}
              </div>
            </Picker>
            {lifeprovinceerror && (
              <div className="form-li-error">{lifeprovinceerror}</div>
            )}
          </div>
          {recommendmemberid && (
            <div className="form-ul-item">
              <div className="form-li-label">
                推荐人姓名
              </div>
              <div className="form-li border-1px">
                <span className="form-li-icon iconfont icon-person_grey"></span>
                <input
                  type="text"
                  className="form-li-input"
                  placeholder="请输入推荐人姓名"
                  onChange={this.handleRecommendNameInput}
                  value={recommendname}
                  onBlur={this.handleBlur.bind(this, 5)}
                />
                {recommendname ? (
                  <span
                    className="form-li-icon close-icon"
                    onClick={this.clearFromValue.bind(this, 5)}
                  ></span>
                ) : null}
              </div>
              {recommenderror && (
                <div className="form-li-error">{recommenderror}</div>
              )}
            </div>
          )}

          <div className="submit-btn" onClick={this.submitLogin.bind(this)}>
            注 册
          </div>
        </div>
      </div>
    );
  }
}
export default Regist;
