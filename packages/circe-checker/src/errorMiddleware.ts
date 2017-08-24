import * as Koa from 'koa'
import ValidationError from "./ValidationError";

export type ErrorHandler = (err: ValidationError, ctx: Koa.Context) => void

export default function errorMiddleware (handler: ErrorHandler): Koa.Middleware {
  return function (ctx: Koa.Context, next) {
    return next().catch((err) => {
      if (err instanceof ValidationError) {
        handler(err, ctx)
      } else {
        throw err
      }
    })
  }
}
