/*
 * @Author: your name
 * @Date: 2020-03-03 11:18:22
 * @LastEditTime: 2020-03-20 10:28:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\main.js
 */
/**
 * Created by wuming on 2017/7/11.
 */
// import '@/utils/antm-viewport.min';
import '@/assets/style/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from '@/store';
import "core-js/stable";
import "regenerator-runtime/runtime";
const store = configureStore();
store.subscribe(() => {});
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app")
);