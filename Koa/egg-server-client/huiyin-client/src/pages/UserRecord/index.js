/*
 * @Author: your name
 * @Date: 2020-03-05 10:00:10
 * @LastEditTime: 2020-05-17 10:38:15
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
import NotData from "@/components/NotData";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);

@connect(
  (state) => state.reducer,
  (dispatch) => bindActionCreators(actions, dispatch)
)
class MyRecord extends React.Component {
  scroll = null;
  state = {
    totalpage: 0,
    page: 1,
    limit: 8,
    nodata: true,
    hasMore: true,
    result: [],
  };

  componentDidMount() {
    this.initScroll();
    this.gotData();
  }

  gotData() {
    const user = this.props.user;
    const { page, limit } = this.state;
    const param = {
      memberid: user.userId,
      pagenum: page,
      pagesize: limit,
    };
    http("/inquiry/mylist", {
      data: param,
    }).then((result) => {
      if (result.code === 0) {
        const data = result.data;
        const total = result.total;
        const totalpage = Math.ceil(total / limit);
        let listData = data;
        const alldata = this.state.result.concat(listData);
        const nodata = alldata.length > 0 ? true : false;
        this.setState(
          {
            result: alldata,
            totalpage: totalpage,
            nodata: nodata
          },
          () => {
            this.scroll.refresh();
            this.scroll.finishPullUp()
          }
        );
      } else {
        Toast.info(result.msg);
      }
    });
  }
  loadRecommend = () => {
    const { totalpage, page } = this.state;
    console.log(page)
    if (page >= totalpage) {
      this.setState({
        hasMore: false,
      });
      return;
    }
    this.setState(
      {
        page: page + 1,
      },
      () => {
        this.gotData();
      }
    );
  }
  initScroll() {
    this.scroll = new BScroll(this.refs.recordwrapper, {
      click: true,
      pullUpLoad: true
    });
    this.scroll.on('pullingUp', this.loadRecommend)
  }
  computedHeight(vheight = 0) {
    const pageheight = document.body.clientHeight;
    return pageheight - vheight + "px";
  }
  handleDetail = (item) => {
    this.props.history.push({ pathname: "/userRecordDetail", state: { id: item.id } });
  };
  render() {
    const { result, nodata, hasMore } = this.state;
    return (
      <div className="myrecord-page page">
        <Helmet>
          <title>我的咨询</title>
        </Helmet>
        <div className="myrecord-content">
          <div
            className="myrecord-ul-wrapper"
            ref="recordwrapper"
            style={{ height: this.computedHeight() }}
          >
            <ul className="myrecord-ul">
              {result.map((item, index) => (
                <li
                  className="myrecord-li"
                  key={String(index)}
                  onClick={this.handleDetail.bind(this, item)}
                >
                  <div className="myrecord-item myrecord-issue">
                    {
                      item.checkstatus === 1 && (<div className="mypeople-info" >
                      <div className="name"><span className={`span-defalt ${item.checkstatus === 2 ? 'span-suc' : ''}`}>{item.checkstatus=== 1 ? '审核中' : item.checkstatus=== 2 ? '' : item.checkstatus=== 3 ? '审核拒绝' : ''}</span></div>
                    </div>)
                    }
                    <div className="people-title">
                      主题：{item.title ? item.title : ""}
                    </div>
                    <div className="people-content">
                      内容：{item.content ? item.content : ""}
                    </div>
                    <div className="mypeople-other"><span className="people-other-span">咨询时间：</span>{item.createtime}</div>
                  </div>
                </li>
              ))}
              {
                !nodata && <NotData></NotData>
              }
              {
                !hasMore && <div className="divider-box">没有更多了</div>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default MyRecord;
