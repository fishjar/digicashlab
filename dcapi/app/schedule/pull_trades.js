module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'worker', // 任意 worker 执行
  },
  async task(ctx) {
    const pairs = 'btc_usdt';
    const site = 'gate.io';
    const API_HOST = 'http://data.gate.io/api2/1';
    let API_PATH = `/tradeHistory/${pairs}`;

    let last_trades = await ctx.service.trade.list();
    last_trades = JSON.parse(JSON.stringify(last_trades));
    let last_tid;
    last_trades.rows.length > 0 && (last_tid = last_trades.rows[0]['trade_id']);
    console.log('last_tid', last_tid);
    if (last_tid) {
      API_PATH = `${API_PATH}/${last_tid}`;
    }

    const res = await ctx.curl(`${API_HOST}${API_PATH}`,{
      dataType: 'json',
    });
    // console.log('res', res);
    console.log('get trades: ',res.data.data.length);

    if (res.data.result === 'true') {
      const trades = res.data.data.map(item => {
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
      const createRes = await ctx.service.trade.bulkCreate(trades);
      console.log('saved!!!');
    }
  },
};