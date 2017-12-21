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
      site: STRING(20),
      pairs: STRING(15),
      trade_id: STRING(20),
      date: STRING(25),
      timestamp: DATE(6),
      type: STRING(15),
      rate: FLOAT,
      amount: FLOAT,
      total: FLOAT,
      created_at: DATE,
      updated_at: DATE
    });
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('trades');
  }),
};
