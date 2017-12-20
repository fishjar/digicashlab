'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;

  const Trade = app.model.define('trade', {
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

  return Trade;
};
