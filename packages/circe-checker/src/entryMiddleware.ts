import * as Koa from 'koa'
import Validator from "./Validator";
import { check } from "./checkMiddleware";

export interface IOptions {
  getQuery?: (ctx: Koa.Context) => any,
  getParams?: (ctx: Koa.Context) => any,
  getBody?: (ctx: Koa.Context) => any
}

let options: any = {
  getQuery: (ctx: any) => ctx.query,
  getParams: (ctx: any) => ctx.params,
  getBody: (ctx: any) => ctx.request.body
}

declare module 'koa' {
  // tslint:disable-next-line:no-empty-interface interface-name
  interface Context extends ICheckerContext {}
}

export interface ICheckerContext {
  vals: any,
  check: typeof check,
  checkQuery: typeof checkQuery
  checkParam: typeof checkParam
  checkBody: typeof checkBody
}

export function checkValue (this: Koa.Context, value: any, required?: boolean) {
  return new Validator('', value, required)
}

export function checkQuery (this: Koa.Context, key: string, required?: boolean) {
  return new Validator(key, options.getQuery(this)[key], required)
}

export function checkParam (this: Koa.Context, key: string, required?: boolean) {
  return new Validator(key, options.getParams(this)[key], required)
}

export function checkBody (this: Koa.Context, key: string, required?: boolean) {
  return new Validator(key, options.getBody(this)[key], required)
}

export default function entryMiddleware (_options?: IOptions): Koa.Middleware {
  if (_options) {
    options = {...options, ..._options}
  }

  return function (ctx: any, next) {
    ctx.check = check
    ctx.checkValue = checkValue
    ctx.checkQuery = checkQuery
    ctx.checkParam = checkParam
    ctx.checkBody = checkBody

    return next()
  }
}
