'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    const { INTEGER, DATE, STRING, FLOAT } = Sequelize;

    yield db.createTable('trades', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pairs: STRING(15),
      tradeID: STRING(15),
      date: DATE,
      timestamp: INTEGER,
      type: STRING(15),
      rate: FLOAT,
      amount: FLOAT,
      total: FLOAT,
      created_at: DATE,
    });
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('trades');
  }),
};
