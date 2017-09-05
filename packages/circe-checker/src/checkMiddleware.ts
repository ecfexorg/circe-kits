import * as Koa from 'koa'

export type Validation = (ctx: Koa.Context) => any

export interface IValidationMap {
  [name: string]: Validation
}

export interface IValidationValues {
  [name: string]: any
}

export function check (this: Koa.Context, validations?: IValidationMap) {
  const vals: IValidationValues = {}

  if (validations) {
    for (const key in validations) {
      const validator = validations[key](this)
      vals[key] = validator.value
    }
  }

  return vals
}

export default function checkMiddleware (validations: IValidationMap): Koa.Middleware {
  return function (ctx: Koa.Context, next) {
    const vals = ctx.check(validations)
    ctx.vals = Object.assign(ctx.vals || {}, vals)

    return next()
  }
}
