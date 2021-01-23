/*
 * @Author: your name
 * @Date: 2020-03-21 22:55:19
 * @LastEditTime: 2020-03-22 20:52:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\components\NotData\index.js
 */
import React from 'react';
import './style.scss';
import notdataicon from './nodata-icon@2x.png'
export default function NoData() {
  return (
    <div className="notdata-page">
        <img src={notdataicon}  className="notdata"/>
       <div className="notdata-txt">暂无数据</div>
    </div>
  )  
}
