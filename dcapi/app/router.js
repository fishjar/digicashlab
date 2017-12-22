'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, del } = app;
  router.get('/trades', controller.trade.trades);
  // router.get('/trades/:id', controller.trade.trade);
  // router.post('/trades', controller.trade.create);
  // router.del('/trades/:id', controller.trade.del);
};
