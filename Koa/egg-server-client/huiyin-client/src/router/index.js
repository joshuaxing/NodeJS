/*
 * @Author: your name
 * @Date: 2020-03-03 11:22:48
 * @LastEditTime: 2020-05-29 21:51:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\router\index.js
 */
import Loadable from 'react-loadable';
import { createBrowserHistory } from 'history';
import MainLayout from '@/layouts/MainLayout';
import Loading from '@/components/Loading';
//createHashHistory
const Index = Loadable({loader: () => import('@/pages/Index'),loading: Loading});

const User = Loadable({loader: () => import('@/pages/User'),loading: Loading});
// 咨询
const Record = Loadable({loader: () => import('@/pages/Record'),loading: Loading});
// 咨询详情
const RecordDetail = Loadable({loader: () => import('@/pages/RecordDetail'),loading: Loading});
// 我的佣金
const Brokerage = Loadable({loader: () => import('@/pages/Brokerage'),loading: Loading});
// 常见问题
const CommonIssue = Loadable({loader: () => import('@/pages/CommonIssue'),loading: Loading});
// 常见详情
const IssueOne = Loadable({loader: () => import('@/pages/IssueOne'),loading: Loading});
// 页面404
const NotFound = Loadable({loader: () => import("@/pages/NotFound"),loading: Loading});
// 我的咨询
const UserRecord = Loadable({loader: () => import("@/pages/UserRecord"),loading: Loading});
// 我的设置
const UserSet = Loadable({loader: () => import("@/pages/UserSet"), loading: Loading});
// 填写咨询内容
const Counsel = Loadable({loader: () => import("@/pages/Counsel"), loading: Loading});
// 我的咨询详情
const UserRecordDetail  = Loadable({loader: () => import("@/pages/UserRecordDetail"), loading: Loading});
// 我的推广码
const Codepage  = Loadable({loader: () => import("@/pages/Codepage"), loading: Loading});

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

// 关注公众号
const Attention = Loadable({
  loader: () => import("@/pages/Attention"),
  loading: Loading
});

export const history = createBrowserHistory();
export const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/index',
    layout: MainLayout,
    component: Index
  },
  {
    path:'/user',
    layout: MainLayout,
    component: User
  },
  {
    path:'/record',
    layout: MainLayout,
    component: Record
  },
  {
    path:'/recordDetail',
    component: RecordDetail
  },
  {
    path:'/userRecord',
    component: UserRecord,
    requiresAuth: true
  },
  {
    path:'/userRecordDetail',
    component: UserRecordDetail,
    requiresAuth: true
  },
  {
    path:'/brokerage',
    component: Brokerage,
    requiresAuth: true
  },
  {
    path:'/commonIssue',
    component: CommonIssue
  },
  {
    path:'/issueOne',
    component: IssueOne
  },
  {
    path:'/userset',
    component: UserSet,
    requiresAuth: true
  },
  {
    path:'/counsel',
    component: Counsel,
    requiresAuth: true
  },
  {
    path:'/codepage',
    component: Codepage,
    requiresAuth: true
  },
  {
    path:'/attention',
    component: Attention
  },
  {
    path:'/regist',
    component: Regist
  },
  {
    path:'/login',
    component: LoginPage
  },
  {
    path:'/introduce',
    component: Introduce
  },
  {
    path:'*',
    component: NotFound
  }
]