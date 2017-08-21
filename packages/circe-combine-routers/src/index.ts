import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as compose from 'koa-compose'

export default function combineRoutes (routers: Router[], mounted?: string): Koa.Middleware {
  const middlewares: Koa.Middleware[] = []

  routers.forEach((router) => {
    if (mounted) {
      router.prefix(mounted)
    }

    middlewares.push(router.routes())
    middlewares.push(router.allowedMethods())
  })

  return compose(middlewares)
}
