import * as Koa from 'koa'

// tslint:disable-next-line:no-shadowed-variable
function packBody (success: boolean, data?: any) {
  let body: any = {success}

  if (typeof data === 'string') {
    body.msg = data
  } else if (typeof data === 'object') {
    body = Object.assign(body, data)
  }

  return body
}

export interface IData {
  [name: string]: any
}

export function success (this: Koa.Context, data?: string | IData): any {
  this.status = 200
  return this.response.body = packBody(true, data)
}

export function fail (this: Koa.Context, data?: string | IData): any {
  this.status = 200
  return this.response.body = packBody(false, data)
}

export function error (this: Koa.Context, status: number = 404): void {
  this.status = status
}

export interface IAttachToOptions {
  success?: string
  fail?: string
  error?: string
}

export interface IResponseApiContext {
  success: typeof success
  fail: typeof fail
  error: typeof error
}

const defaultOptions: IAttachToOptions = {
  success: 'success',
  fail: 'fail',
  error: 'error'
}

export default function attachTo (ctx: Koa.BaseContext | Koa.Context, options: IAttachToOptions = defaultOptions) {
  if (options.success) {
    (ctx as any)[options.success] = success
  }

  if (options.fail) {
    (ctx as any)[options.fail] = fail
  }

  if (options.error) {
    (ctx as any)[options.error] = error
  }
}
