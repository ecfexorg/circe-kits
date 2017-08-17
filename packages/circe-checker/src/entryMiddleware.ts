import * as Koa from 'koa'
import Validator from "./Validator";

export interface IOptions {
  getQuery?: (ctx: any) => any,
  getParams?: (ctx: any) => any,
  getBody?: (ctx: any) => any
}

let options: any = {
  getQuery: (ctx: any) => ctx.query,
  getParams: (ctx: any) => ctx.params,
  getBody: (ctx: any) => ctx.request.body
}

function checkValue (this: Koa.Context, value: any, required?: boolean) {
  return new Validator('', value, required)
}

function checkQuery (this: Koa.Context, key: string, value: any, required?: boolean) {
  return new Validator(key, options.getQuery(this)[key], required)
}

function checkParam (this: Koa.Context, key: string, value: any, required?: boolean) {
  return new Validator(key, options.getParams(this)[key], required)
}

function checkBody (this: Koa.Context, key: string, value: any, required?: boolean) {
  return new Validator(key, options.getBody(this)[key], required)
}

export default function entryMiddleware (_options?: IOptions): Koa.Middleware {
  if (_options) {
    options = {...options, ..._options}
  }

  return function (ctx: any, next) {
    ctx.checkValue = checkValue
    ctx.checkQuery = checkQuery
    ctx.checkParam = checkParam
    ctx.checkBody = checkBody

    return next()
  }
}
