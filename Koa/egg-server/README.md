<!--
 * @Author: your name
 * @Date: 2020-11-30 10:34:12
 * @LastEditTime: 2020-12-23 09:22:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-server\README.md
-->
# egg-server



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### sequelize-auto

### sequelize-cli
// 安装
npm install --save-dev sequelize-cli
// 初始化
npx sequelize init:config
npx sequelize init:migrations
// 初始化生成表
npx sequelize migration:generate --name=init-users
// 升级
npx sequelize db:migrate
// 查看状态 
npx sequelize db:migrate:status
// 回退一个变更
npx sequelize db:migrate:undo --name
// 回退一个变更
npx sequelize db:migrate:undo
// 回退到初始状态 
npx sequelize db:migrate:undo:all

queryInterface.addColumn("users", "deletedAt", Sequelize.DATE);

queryInterface.removeColumn("users", "deletedAt", Sequelize.DATE);

### koa-json-error


### morgan


### 单词
foreign //外国的
associate //联系
cascade // cascade在计算机mysql数据库当中是：从父表删除或更新且自动删除或更新子表中匹配的行，命令