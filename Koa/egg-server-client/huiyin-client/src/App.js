/*
 * @Author: your name
 * @Date: 2020-03-03 11:18:22
 * @LastEditTime: 2020-05-26 18:03:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\App.js
 */
import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import { history, routes } from "@/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "@/store/actions";
import Loadable from "react-loadable";
import Loading from "@/components/Loading";

// 登录
const LoginPage = Loadable({
  loader: () => import("@/pages/Login"),
  loading: Loading
});

// 注册
const Regist = Loadable({
  loader: () => import("@/pages/Regist"),
  loading: Loading
});

// 项目介绍
const Introduce = Loadable({
  loader: () => import("@/pages/Introduce"),
  loading: Loading
});

function getRouterByRoutes(routes) {
  let exportRoutesList = [];
  let renderedRoutesList = [];
  let renderedRoutesListRequires = [];
  // 登录
  const renderRoutes = (routes, parentPath) => {
    Array.isArray(routes) &&
      routes.forEach(route => {
        const { path, redirect, children, layout, component, requiresAuth} = route;
        // console.log(requiresAuth)
        if (requiresAuth) {
          // 需要登陆权限
          if (redirect) {
            renderedRoutesListRequires.push(
              <Redirect
                key={`${parentPath}${path}`}
                exact
                from={path}
                to={`${parentPath}${redirect}`}
              />
            );
          }
          if (component) {
            renderedRoutesListRequires.push(
              layout ? (
                <Route
                  key={`${parentPath}${path}`}
                  exact
                  path={`${parentPath}${path}`}
                  render={props =>
                    React.createElement(
                      layout,
                      props,
                      React.createElement(component, props)
                    )
                  }
                />
              ) : (
                <Route
                  key={`${parentPath}${path}`}
                  exact
                  path={`${parentPath}${path}`}
                  component={component}
                />
              )
            );
          }
        } else {
          //不需要登陆权限
          if (redirect) {
            renderedRoutesList.push(
              <Redirect
                key={`${parentPath}${path}`}
                exact
                from={path}
                to={`${parentPath}${redirect}`}
              />
            );
          }
          if (component) {
            renderedRoutesList.push(
              layout ? (
                <Route
                  key={`${parentPath}${path}`}
                  exact
                  path={`${parentPath}${path}`}
                  render={props =>
                    React.createElement(
                      layout,
                      props,
                      React.createElement(component, props)
                    )
                  }
                />
              ) : (
                <Route
                  key={`${parentPath}${path}`}
                  exact
                  path={`${parentPath}${path}`}
                  component={component}
                />
              )
            );
          }
        }

        if (Array.isArray(children) && children.length > 0) {
          renderRoutes(children, path);
        }
      });
  };
  //未登录
  function renderLogin() {
    renderedRoutesList.push(
      <Redirect
        key="/login"
        exact
        to={{
          pathname: "/login"
        }}
      />
    );
  }
  renderRoutes(routes, "");
  if (localStorage.getItem('_shlawyertoken2020')) {
    //判断登陆登陆
    // console.log('登录')
    exportRoutesList = renderedRoutesListRequires.concat(renderedRoutesList)
  } else {
    // console.log('未登录')
    exportRoutesList = renderedRoutesList;
  }
  // console.log(exportRoutesList)
  return exportRoutesList
}

@connect(
  state => state.reducer,
  dispatch => bindActionCreators(actions, dispatch)
)
class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('_shlawyertoken2020')) {
      const value = JSON.parse(localStorage.getItem('_shlawyertoken2020'));
      this.props.Login(value)
    }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          {getRouterByRoutes(routes)}
        </Switch>
      </Router>
    );
  }
}
export default App;
