'use strict';

// Model.findAll({
//   where: {
//     name: 'a project',
//     attr1: {
//       $gt: 50
//     },
//     $or: [
//       {id: [1, 2, 3]},
//       {
//         $and: [
//           {id: {gt: 10}},
//           {id: {lt: 100}}
//         ]
//       }
//     ]
//   }
// })

// const csv = require('csv');
const json2csv = require('json2csv');
const Service = require('egg').Service;

class Trade extends Service {
  async list({ offset = 0, limit = 10, order_by = 'trade_id', order = 'DESC', pair, filter } = {}) {
    const options = {
      offset: +offset,
      limit: +limit,
      attributes: ['id', 'site', 'pair', 'trade_id', 'date', 'timestamp', 'type', 'rate', 'amount', 'total', 'created_at', 'updated_at'],
      order: [[order_by, order.toUpperCase()]],
      where: {}
    };
    if (pair) {
      options.where = Object.assign(options.where, { pair });
    }
    if (filter) {
      options.where = Object.assign(options.where, JSON.parse(decodeURIComponent(filter)));
    }
    return this.ctx.model.Trade.findAndCountAll(options);
  }

  async csv({ order_by = 'timestamp', order = 'DESC', limit = 10000 } = {}) {
    const fields = ['id', 'site', 'pair', 'trade_id', 'date', 'type', 'rate', 'amount', 'total', 'created_at'];
    const fieldNames = ['id', '来源', '货币', '交易ID', '交易时间', '类型', '单价', '数量', '总价', '创建时间'];
    const options = {
      limit,
      attributes: fields,
      order: [[order_by, order.toUpperCase()]],
    }
    // return this.ctx.model.Trade.findAll(options);
    const res = await this.ctx.model.Trade.findAll(options);
    const data = JSON.parse(JSON.stringify(res));
    return json2csv({ data, fields, fieldNames });
  }

  async find(id) {
    const trade = await this.ctx.model.Trade.findById(id);
    if (!trade) {
      this.ctx.throw(404, 'trade not found');
    }
    return trade;
  }

  async create(trade) {
    return this.ctx.model.Trade.create(trade);
  }

  async bulkCreate(trades) {
    return this.ctx.model.Trade.bulkCreate(trades);
  }

  async del(id) {
    const trade = await this.ctx.model.Trade.findById(id);
    if (!trade) {
      this.ctx.throw(404, 'trade not found');
    }
    return trade.destroy();
  }

}

module.exports = Trade;
