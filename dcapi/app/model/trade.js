'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;

  const Trade = app.model.define('trade', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    site: STRING(20),
    pair: STRING(15),
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

  return Trade;
};
