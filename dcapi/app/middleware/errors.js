// async function errors(ctx, next) {
//   try {
//     await next();
//   } catch (err) {
//     ctx.logger.error(err);
//     ctx.status = err.status || 500;
//     ctx.body = JSON.stringify({
//       errcode: `001`,
//       errmsg: `${err}`,
//     });
//   }
// }

module.exports = options => {
  return async function errors(ctx, next) {
    try {
      await next();
      ctx.logger.info('ok');
    } catch (err) {
      ctx.logger.error(err);
      ctx.status = err.status || 500;
      ctx.body = JSON.stringify({
        errcode: `001`,
        errmsg: `${err}`,
      });
    }
  }
};
