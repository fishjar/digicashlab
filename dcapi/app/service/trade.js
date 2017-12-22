'use strict';

const Service = require('egg').Service;

class Trade extends Service {
  async list({ offset = 0, limit = 10, order_by = 'trade_id', order = 'DESC' }={}) {
    const options = {
      offset,
      limit,
      attributes: [ 'id', 'site', 'pair', 'trade_id', 'date', 'timestamp', 'type', 'rate', 'amount', 'total', 'created_at', 'updated_at' ],
      order: [[ order_by, order.toUpperCase() ]],
    };
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
