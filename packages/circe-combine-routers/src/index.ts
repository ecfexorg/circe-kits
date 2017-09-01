import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as compose from 'koa-compose'

export default function combineRoutes (routers: Router[], mount?: string): Koa.Middleware {
  const middlewares: Koa.Middleware[] = []

  routers.forEach((router) => {
    if (mount) {
      router.prefix(mount)
    }

    middlewares.push(router.routes())
    middlewares.push(router.allowedMethods())
  })

  return compose(middlewares)
}
