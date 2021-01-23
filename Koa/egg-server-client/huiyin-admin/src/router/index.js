/*
 * @Author: your name
 * @Date: 2019-11-26 15:27:02
 * @LastEditTime: 2020-06-04 17:13:49
 * @LastEditTime : 2020-01-10 10:27:00
 * @LastEditTime : 2020-01-03 10:37:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/",
    component: () => import("../views/layout/index.vue"),
    name: "index",
    children: [
      {
        path: "/member",
        name: "member",
        component: () => import("../views/member/index.vue"),
        meta: {
          title: "会员管理",
          requiresAuth: true
        }
      },
      {
        path: "/generalize",
        name: "generalize",
        component: () => import("../views/generalize/index.vue"),
        meta: {
          title: "收益管理",
          requiresAuth: true
        }
      },
      {
        path: "/consult",
        name: "consult",
        component: () => import("../views/consult/index.vue"),
        meta: {
          title: "咨询管理",
          requiresAuth: true
        }
      },
      {
        path: "/employee",
        name: "employee",
        component: () => import("../views/employee/index.vue"),
        meta: {
          title: "后台用户",
          requiresAuth: true
        }
      }
    ]
  }
];

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("_huiyininfo")) {
    const value = localStorage.getItem("_huiyininfo");
    const userinfo = JSON.parse(value);
    store.commit("user/gotuserInfo", userinfo);
    const powerlist = localStorage.getItem("_huiyinmenu");
    const menuList = JSON.parse(powerlist);
    store.commit("user/gotmenuList", menuList);
  } else {
    const userinfo = {
      userid: "",
      nickname: "",
      token: ""
    };
    store.commit("user/gotuserInfo", userinfo);
    const menuList = [];
    store.commit("user/gotmenuList", menuList);
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let data = store.state.user.userinfo;
    if (data.userid) {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default router;
