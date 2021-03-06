'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513754579243_7269';

  // add your config here
  // config.middleware = [];
  config.middleware = ['errors'];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'digicash',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456'
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => isInnerIp(ctx.ip),
      enable: false,
    },
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET'
  };

  return config;
};
