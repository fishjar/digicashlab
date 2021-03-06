'use strict';

const json2csv = require('json2csv');
const Controller = require('egg').Controller;

class TradeController extends Controller {
  async trades() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.trade.list(ctx.query);
  }

  async trades_csv() {
    const ctx = this.ctx;
    // ctx.set({
    //   'Content-Type': 'application/vnd.ms-execl',
    //   'Content-Disposition': "attachment;filename=trades.csv",
    //   'Pragma': 'no-cache',
    //   'Expires': 0
    // });
    ctx.attachment('trades.csv');
    ctx.body = await ctx.service.trade.csv(ctx.query);
  }

  async trade() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.trade.find(ctx.params.id);
  }

  async create() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // body.user_id = +ctx.params.user_id;
    const created = await ctx.service.trade.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;
  }

  async del() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    await ctx.service.trade.del(id);
    ctx.status = 200;
  }

}

module.exports = TradeController;