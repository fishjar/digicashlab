module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'worker', // 任意 worker 执行
  },
  async task(ctx) {
    const pairs = 'btc_usdt';
    const site = 'gate.io';
    const API_HOST = 'http://data.gate.io/api2/1';
    const API_PATH = `/trade/${pairs}`;

    const last_trades = await ctx.service.trade.list();
    console.log('last_trades', last_trades);
    let last_tid;
    last_trades.length > 0 && (last_tid = last_trades[0]['trade_id']);

    if (last_tid) {
      API_PATH = `${API_PATH}/${last_tid}`;
    }

    const res = await ctx.curl(`${API_HOST}${API_PATH}`, {
      dataType: 'json',
    });
    console.log('res', res);

    if (res.result === 'true') {
      const trades = res.data.map(item => {
        const trade = {
          trade_id: item.tradeID,
          date: item.date,
          timestamp: +item.timestamp,
          type: item.type,
          rate: item.rate,
          amount: item.amount,
          total: item.total
        }
        return Object.assign(trade, { site, pairs })
      });
      await ctx.service.trade.bulkCreate(trades);
    }
  },
};