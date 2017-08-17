import * as Koa from 'koa'

// tslint:disable-next-line:no-shadowed-variable
function packBody (success: boolean, data: any) {
  let body: any = {success}

  if (typeof data === 'string') {
    body.msg = data
  } else if (typeof data === 'object') {
    body = Object.assign(body, data)
  }

  return body
}

export function success (this: Koa.Context, data: string): any
export function success (this: Koa.Context, data: any): any {
  return this.response.body = (packBody(true, data))
}

export function fail (this: Koa.Context, data: string): any
export function fail (this: Koa.Context, data: any): any {
  return this.response.body = (packBody(false, data))
}

export function error (this: Koa.Context, status: number = 404): void {
  this.status = status
}
