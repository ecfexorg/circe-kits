import * as Koa from 'koa'

export type OnErrorHandler = (err: Error, ctx: any) => void

export default  function onErrorMiddleware (handler: OnErrorHandler): Koa.Middleware {
  return function middleware (ctx, next) {
    return next().catch((err) => {
      if (handler) {
        handler(err, ctx)
      } else {
        throw err
      }
    })
  }
}
