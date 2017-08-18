import * as Koa from 'koa'

type StringOrArray = string | string[]

export interface ICorsOptions {
  origin?: string,
  allowMethods?: StringOrArray,
  allowHeaders?: StringOrArray,
  exposeHeaders?: StringOrArray,
  maxAge?: string,
  credentials?: boolean
}

export default function corsMiddleware (options: ICorsOptions = {}): Koa.Middleware {

  const allowMethods = ensureString(options.allowMethods) || 'GET,HEAD,PUT,POST,PATCH,DELETE'
  const allowHeaders = ensureString(options.allowHeaders)
  const exposeHeaders = ensureString(options.exposeHeaders)
  const maxAge = options.maxAge
  const credentials = !!options.credentials

  return function (ctx, next) {
    const requestOrigin = ctx.get('Origin')
    ctx.vary('Origin')

    if (!requestOrigin) {
      return next()
    }

    const origin = options.origin || requestOrigin

    if (ctx.method === 'OPTIONS') {
      if (!ctx.get('Access-Control-Request-Method')) {
        return next()
      }

      ctx.set('Access-Control-Allow-Origin', origin)

      if (allowMethods) {
        ctx.set('Access-Control-Allow-Methods', allowMethods)
      }

      if (maxAge) {
        ctx.set('Access-Control-Max-Age', maxAge)
      }

      if (credentials) {
        ctx.set('Access-Control-Allow-Credentials', 'true')
      }

      const _allowHeaders = allowHeaders || ctx.get('Access-Control-Request-Headers')

      if (_allowHeaders) {
        ctx.set('Access-Control-Allow-Headers', _allowHeaders)
      }

      ctx.status = 204
    } else {
      ctx.set('Access-Control-Allow-Origin', origin)

      if (credentials) {
        ctx.set('Access-Control-Allow-Credentials', 'true')
      }

      if (exposeHeaders) {
        ctx.set('Access-Control-Expose-Headers', exposeHeaders)
      }

      return next()
    }
  }
}

function ensureArray (value?: StringOrArray): string[] | undefined {
  return (Array.isArray(value) || value === undefined) ? value : []
}

function ensureString (value?: StringOrArray): string | undefined {
  return Array.isArray(value) ? value.join(',') : value
}
