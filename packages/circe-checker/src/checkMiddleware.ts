import * as Koa from 'koa'

export type Validation = (ctx: Koa.Context) => any

export interface IValidationMap {
  [name: string]: Validation
}

export interface IValidationValues {
  [name: string]: any
}

export default function checkMiddleware (validations?: IValidationMap): Koa.Middleware {
  return function (ctx: Koa.Context, next) {
    const vals: IValidationValues = ctx.vals = ctx.vals || {}

    if (validations) {
      for (const key in validations) {
        const validator = validations[key](ctx)
        vals[key] = validator.value
      }
    }

    return next()
  }
}
