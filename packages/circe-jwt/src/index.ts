import * as JWT from 'jsonwebtoken'
import * as Koa from 'koa'
import unless from 'circe-unless'

export type Payload = string | object | Buffer

export const signAsync = function (payload: Payload, secret: JWT.Secret, options: JWT.SignOptions = {}) {
  return new Promise((resolve, reject) => {
    JWT.sign(payload, secret, options, function (err, token) {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

export const verifyAsync = function (accessToken: string, secret: string | Buffer, options: JWT.VerifyOptions = {}) {
  return new Promise((resolve, reject) => {
    JWT.verify(accessToken, secret, options, function (err, decodedToken) {
      if (err) {
        reject(err)
      } else {
        resolve(decodedToken)
      }
    })
  })
}

export interface IJWTOptions {
  secret: string,
  key?: string
}

export interface IUnlessable {
  unless: typeof unless
}

export default function jwtMiddleware (options: IJWTOptions): Koa.Middleware & IUnlessable {
  const secret = options.secret
  const key = options.key || 'user'

  if (!secret) {
    throw new Error('missing secret')
  }

  const middleware: any = function (ctx: any, next: any) {
    return resolveHeader(ctx).then((accessToken: string) => {
      ctx.state = ctx.state || {}
      ctx.state.jwtToken = accessToken
      return verifyAsync(accessToken, secret)
    }).then((decodedToken) => {
      ctx.state[key] = decodedToken
      return next()
    }, (err) => {
      ctx.status = 401
      ctx.body = `Invalid token - ${err.message}`
    })
  }

  middleware.unless = unless
  return middleware
}

function resolveHeader (ctx: any) {
  return new Promise((resolve, reject) => {
    if (!ctx.header || !ctx.header.authorization) {
      reject(new Error('can\'t find authorization header'))
    } else {
      const parts = ctx.header.authorization.split(' ')
      if (parts.length === 2) {
        const [scheme, credentials] = parts
        if (/^Bearer$/i.test(scheme)) {
          resolve(credentials)
        } else {
          reject(new Error('Authorization header format is "Authorization: Bearer token"'))
        }
      } else {
        reject(new Error('Authorization header format is "Authorization: Bearer token"'))
      }
    }
  })
}

export const sign = JWT.sign
export const verify = JWT.verify
export const decode = JWT.decode
