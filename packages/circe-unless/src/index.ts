import {parse} from 'url'
import * as Koa from 'koa'

type Pattern = string | RegExp

export interface IUnlessOptions {
  paths?: Pattern[],
  methods?: string[]
}

export default function unlessMiddleware (this: Koa.Middleware, options: IUnlessOptions = {}): Koa.Middleware {
  const parent = this
  const {paths, methods} = options

  return function (ctx, next) {
    const url = parse(ctx.url, true)
    let skip = false

    if (paths && url.pathname) {
      skip = skip || matchPath(url.pathname, paths)
    }

    if (methods) {
      skip = skip || matchMethod(ctx.method, methods)
    }

    return skip ? next() : parent(ctx, next)
  }
}

function matchPath (target: string, paths: Pattern[]) {
  return paths.some((p) => (
    p instanceof RegExp && p.test(target) || p === target
  ))
}

function matchMethod(target: string, methods: string[]) {
  return methods.indexOf(target) > -1
}
