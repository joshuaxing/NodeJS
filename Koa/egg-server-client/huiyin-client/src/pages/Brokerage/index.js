/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-06-04 13:32:26
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
import http from "@/fetch";
import NotData from "@/components/NotData";
import forbidshare from "@/utils/forbidshare.js";
import { Toast } from "antd-mobile";
@connect(
  (state) => state.reducer,
  (dispatch) => bindActionCreators(actions, dispatch)
)
class Brokerage extends React.Component {
  state = {
    amount: "",
    totalpage: 0,
    page: 1,
    limit: 8,
    nodata: true,
    hasMore: false,
    result: [],
    loadfirst: 0
  };

  componentDidMount() {
    forbidshare()
    const amount = this.props.location.state ? this.props.location.state.amount : "";
    if (amount) {
      this.setState({
        amount: amount
      })
    }
    this.gotData();
  }
  gotData() {
    const user = this.props.user;
    const {page, limit} = this.state;
    const param = {
      memberid: user.userId,
      pagenum: page,
      pagesize: limit
    };
    http("/income/list", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        const total = result.total;
        const totalpage = Math.ceil(total / limit);
        let listData = data;
        let hasMore = false;
        totalpage > 1 && (hasMore = true);
        const alldata = this.state.result.concat(listData);
        const nodata = alldata.length > 0 ? true : false;
        this.setState({
          result: alldata,
          totalpage: totalpage,
          nodata: nodata,
          hasMore: hasMore
        });
      } else {
        Toast.info(result.msg);
      }
    });
  }
  loadRecommend() {
    const { totalpage, page } = this.state;
    if (page >= totalpage) {
      this.setState({
        hasMore: false,
        loadfirst: 1
      });
      return;
    }
    this.setState(
      {
        page: page + 1
      },
      () => {
        this.gotData();
      }
    );
  }
  handlePirce(value) {
    return typeof value === "number" ? value.toFixed(2) : "0.00";
  }
  render() {
    const { amount, result, nodata, hasMore, loadfirst} = this.state;
    return (
      <div className="brokerage-page page">
        <Helmet>
          <title>我的积分</title>
        </Helmet>
        <div className="brokerage-header">
          <div className="header-content">
            <div className="brokerage-text">总积分</div>
            <div className="brokerage-price">
              {amount}
            </div>
          </div>
        </div>
        <div className="brokerage-content">
          <div className="brokerage-ul-wrapper">
            <ul className="brokerage-ul">
              {
                result.map((item, index) => (
                  <li className="brokerage-li" key={String(index)}>
                    <div className="brokerage-li-left">
                      <div className="brokerage-name">{item.incomeText}</div>
                      <div className="brokerage-time">{item.createDate}</div>
                    </div>
                    <div className="brokerage-li-right">
                      <span className="price">{item.showamount}积分</span>
                    </div>
                  </li>
                ))
              }
              {/* <li className="brokerage-li">
                <div className="brokerage-li-left">
                  <div className="brokerage-name">会员推广</div>
                  <div className="brokerage-time">2019-06-29 12:40:40</div>
                </div>
                <div className="brokerage-li-right">
                  <span className="price">+¥5.00</span>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        {
          !nodata && <NotData></NotData>
        }
        {
          hasMore && <div className="more-box" onClick={this.loadRecommend.bind(this)}>查看更多</div>
        }
        {
          nodata && loadfirst === 1 && !hasMore && <div className="divider-box">没有更多了</div>
        }
      </div>
    );
  }
}
export default Brokerage;
