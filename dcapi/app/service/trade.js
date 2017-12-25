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

const Service = require('egg').Service;

class Trade extends Service {
  async list({ offset = 0, limit = 10, order_by = 'trade_id', order = 'DESC', pair, filter }={}) {
    const options = {
      offset:+offset,
      limit:+limit,
      attributes: [ 'id', 'site', 'pair', 'trade_id', 'date', 'timestamp', 'type', 'rate', 'amount', 'total', 'created_at', 'updated_at' ],
      order: [[ order_by, order.toUpperCase() ]],
      where: {}
    };
    if (pair) {
      options.where = Object.assign(options.where,{pair});
    }
    if (filter) {
      options.where = Object.assign(options.where,JSON.parse(decodeURIComponent(filter)));
    }
    return this.ctx.model.Trade.findAndCountAll(options);
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
