module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'worker', // 指定 worker 执行
  },
  async task(ctx) {
    const pairs = 'btc_usdt';
    const API_HOST = 'http://data.gate.io/api2/1';
    const API_URL = `${API_HOST}/trade/${pairs}`;

    const last_trades = await ctx.service.trade.list();
    console.log('last_trades',last_trades);
    let last_tid;
    last_trades.length>0 && (last_tid = last_trades[0]['tradeID']);

    if(last_tid){
      API_URL = `${API_URL}/${last_tid}`;
    }
    
    const res = await ctx.curl(API_URL, {
      dataType: 'json',
    });
    console.log('res',res);

    await ctx.service.trade.bulkCreate(res.data.map(item=>Object.assign(item,{pairs})));
  },
};