/*
 * @Author: your name
 * @Date: 2020-03-09 11:02:31
 * @LastEditTime: 2020-04-12 11:56:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\components\Nav\index.js
 */
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';

class Nav extends Component {
  constructor (props){
    super(props)
  }
  clickNav (index) {
    switch (index) {
      case 1:
        this.props.history.push("/index");
        break;
      case 2:
        this.props.history.push("/record");
        break;
      case 3:
        this.props.history.push("/user");
        break;
        default:
    }
  }
  render() {
    const { location } = this.props;
    return (
      <div className="nav-component">
        <ul className="nav-ul border-1px">
          <li className={`nav-li ${location.pathname === '/index' ? 'nav-li-active' : ''}`} onClick={this.clickNav.bind(this, 1)}>
            <span className="nav-li-icon iconfont icon-shouye"></span>
            <span className="nav-li-text">首页</span>
          </li>
          <li className={`nav-li ${location.pathname === '/record' ? 'nav-li-active' : ''}`} onClick={this.clickNav.bind(this, 2)}>
            <span className="nav-li-icon iconfont icon-liebiao"></span>
            <span className="nav-li-text">咨询列表</span>
          </li>
          <li className={`nav-li ${location.pathname === '/user' ? 'nav-li-active' : ''}`} onClick={this.clickNav.bind(this, 3)}>
            <span className="nav-li-icon iconfont icon-wode"></span>
            <span className="nav-li-text">我的</span>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(Nav);
