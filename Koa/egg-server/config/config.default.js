/*
 * @Author: your name
 * @Date: 2020-11-30 10:34:12
 * @LastEditTime: 2020-12-19 11:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1606703618058_5654";



  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     // console.log('all');
  //     ctx.body = "error";
  //     ctx.status = 500;
  //   },
  // };



  // add your middleware config here
  config.middleware = ["errorHandler"];

  // error
  // config.error = {
  //   // 这里使用appInfo.env来判断环境，仅仅在非生产环境下打开堆栈信息，用于调试
  //   postFormat: (e, { stack, ...rest}) => appInfo.env === 'prod' ? rest: { stack, ...rest}
  // }

  // config.errorHandler = {
  //   match: '/api'
  // }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret:'xingshaohua@123'
  }

  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "lawyer",
    user: "root",
    password: "root",
    timezone: "+08:00",
    define: {
      timestamps: true,
      paranoid: true,
      underscored: false,
    },
    dialectOptions: {
      // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  };

  config.bcrypt = {
    saltRounds: 5,
  };

  return {
    ...config,
    ...userConfig,
  };
};
